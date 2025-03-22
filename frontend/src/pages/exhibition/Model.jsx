import { useEffect, useMemo, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { Outlines } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, isSelected, onSelect }) {
    const cleanUrl = useMemo(() => url.split('?')[0], [url]);
    const fileExtension = useMemo(() => cleanUrl.split('.').pop().toLowerCase(), [cleanUrl]);
    const [model, setModel] = useState(null);
    const [position, setPosition] = useState([0, 0, 0]);
    
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
                    console.error(`Unsupported file type: ${fileExtension}`);
                    return;
                }

                // Move the model above ground
                const box = new THREE.Box3().setFromObject(loadedModel.scene || loadedModel);
                const size = new THREE.Vector3();
                box.getSize(size);
                const height = size.y;

                setPosition([0, height / 2, Math.random() * 8 - 4]);

            } catch (error) {
                console.error("Failed to load model", error);
            }
        }

        loadModel();
    }, [url]);

    if (!model) return null;

    return (
        <group position={position} onClick={onSelect} onPointerDown={(e) => e.stopPropagation()}>
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