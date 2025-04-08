import { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';

function SimpleModel({ url }) {

    const [model, setModel] = useState(null);
    
    useEffect(() => {
        if (!url) return;

        const cleanUrl = url.split('?')[0];
        const fileExtension = cleanUrl.split('.').pop().toLowerCase();

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

                // Center the model
                const box = new THREE.Box3().setFromObject(loadedModel);
                const center = new THREE.Vector3();
                box.getCenter(center);

                loadedModel.position.y -= center.y;

            } catch (error) {
                console.error("Failed to load model", error);
            }
        }

        loadModel();
    }, [url]);

    if (!model) return null;

    return <primitive object={model} />;
}

export default SimpleModel;