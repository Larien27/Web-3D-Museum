import * as THREE from 'three';
import { useEffect, useMemo, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
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
                let scene;

                if (fileExtension === 'glb' || fileExtension === 'gltf') {
                    const loader = new GLTFLoader();
                    const dracoLoader = new DRACOLoader();
                    dracoLoader.setDecoderPath('/draco/');
                    loader.setDRACOLoader(dracoLoader);

                    const gltf = await loader.loadAsync(url);
                    scene = gltf.scene;

                    scene.traverse((child) => {
                        if (child.isMesh && child.material) {
                            child.material = child.material.clone();
                            child.material.side = THREE.FrontSide;
                            child.material.depthWrite = true;
                            child.material.depthTest = true;
                            child.material.transparent = true;
                            child.material.needsUpdate = true;
                        }
                    });

                    setModel(scene);
                } else if (fileExtension === 'obj') {
                    const obj = await new OBJLoader().loadAsync(url);
                    setModel(obj);
                } else {
                    showToast('error', `Unsupported file type: ${fileExtension}`);
                }
            } catch (err) {
                console.error('Error loading model:', err);
                showToast('error', 'Failed to load model');
            }
        }

        loadModel();
    }, [url]);

    if (!model) return null;

    const meshes = [];
    model.traverse((child) => {
        if (child.isMesh) {
            meshes.push(child);
        }
    });

    return (
        <group
            onClick={onSelect}
            onPointerDown={(e) => e.stopPropagation()}
        >
            {meshes.map((mesh, i) => (
                <mesh
                    key={i}
                    geometry={mesh.geometry}
                    material={mesh.material}
                    position={mesh.position}
                    rotation={mesh.rotation}
                    scale={mesh.scale}
                    onPointerDown={(e) => e.stopPropagation()}
                >
                    {isSelected && <Outlines thickness={5} color="blue" />}
                </mesh>
            ))}
        </group>
    );
}

export default Model;