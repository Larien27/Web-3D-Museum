import { useEffect, useMemo, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Outlines } from '@react-three/drei';
import { useToast } from '../../context/ToastContext';

function Model({ url, isSelected, onSelect }) {
    const { showToast } = useToast();
    const cleanUrl = useMemo(() => url.split('?')[0], [url]);
    const fileExtension = useMemo(() => cleanUrl.split('.').pop().toLowerCase(), [cleanUrl]);
    const [model, setModel] = useState(null);
    
    useEffect(() => {
        async function loadModel() {
            try {
                let loadedModel;

                if (fileExtension === 'glb' || fileExtension === 'gltf') {
                    loadedModel = await new GLTFLoader().loadAsync(url);
                    setModel(loadedModel.scene);
                } else if (fileExtension === 'obj') {
                    loadedModel = await new OBJLoader().loadAsync(url);
                    setModel(loadedModel);
                } else if (fileExtension === 'fbx') {
                    loadedModel = await new FBXLoader().loadAsync(url);
                    setModel(loadedModel);
                } else {
                    showToast('error', `Unsupported file type: ${fileExtension}`);
                    return;
                }
            } catch (err) {
                showToast('error', 'Failed to load model');
            }
        }

        loadModel();
    }, [url]);

    if (!model) return null;

    return (
        <group
            onClick={onSelect}
            onPointerDown={(e) => e.stopPropagation()}
        >
            {model.children.map((child, index) => (
                child.isMesh ? (
                    <mesh key={index} geometry={child.geometry} material={child.material} onPointerDown={(e) => e.stopPropagation()}>
                        {isSelected && <Outlines thickness={5} color={'blue'} />}
                    </mesh>
                ) : (
                    <primitive key={index} object={child} />
                )
            ))}
        </group>
    );
}

export default Model;