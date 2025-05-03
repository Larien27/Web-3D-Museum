import { useRef, useState, useEffect } from 'react';
import { OrbitControls, TransformControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import Model from '../3d-exhibition/Model';

function SceneContent({ models, selectedModelId, setSelectedModelId, modelRefs }) {
    const transformRef = useRef();
    const [transformMode, setTransformMode] = useState('translate');
    const initializedModels = useRef(new Set());

    useFrame(() => {
        if (transformRef.current && selectedModelId) {
            const target = modelRefs.current[selectedModelId];
            if (target) transformRef.current.attach(target);
        }
    });

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowDown') {
                setTransformMode((prevMode) => {
                    if (prevMode === 'translate') return 'rotate';
                    if (prevMode === 'rotate') return 'scale';
                    return 'translate';
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        models.forEach((model) => {
            const ref = modelRefs.current[model.id];
            if (ref && !initializedModels.current.has(model.id)) {
                ref.position.set(...(model.position ?? [0, 0, 0]));
                ref.rotation.set(...(model.rotation ?? [0, 0, 0]));
                ref.scale.set(...(model.scale ?? [1, 1, 1]));
                initializedModels.current.add(model.id);
            }
        });
    }, [models]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, -5, -5]} intensity={0.8} />
            <gridHelper args={[100, 100]} />
            <OrbitControls makeDefault />
            <TransformControls ref={transformRef} mode={transformMode} />

            {models.map((model) => (
                <group
                    key={model.id}
                    ref={(el) => {
                        if (el) modelRefs.current[model.id] = el;
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedModelId(model.id);
                    }}
                >
                    <Model
                        url={model.modelFileUrl}
                        position={model.position ?? [0, 0, 0]}
                        rotation={model.rotation ?? [0, 0, 0]}
                        scale={model.scale ?? [1, 1, 1]}
                        isSelected={selectedModelId === model.id}
                        onSelect={() => setSelectedModelId(model.id)}
                    />
                </group>
            ))}
        </>
    );
}

export default SceneContent;