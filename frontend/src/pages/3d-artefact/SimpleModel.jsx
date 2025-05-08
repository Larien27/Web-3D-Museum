import { useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { useToast } from '../../context/ToastContext';
import * as THREE from 'three';

function SimpleModel({ url }) {
    const { showToast } = useToast();
    const [model, setModel] = useState(null);

    useEffect(() => {
        if (!url) return;

        const cleanUrl = url.split('?')[0];
        const fileExtension = cleanUrl.split('.').pop().toLowerCase();

        async function loadModel() {
            try {
                let objectToRender;

                if (fileExtension === 'glb' || fileExtension === 'gltf') {
                    const loader = new GLTFLoader();
                    const dracoLoader = new DRACOLoader();
                    dracoLoader.setDecoderPath('/draco/');
                    loader.setDRACOLoader(dracoLoader);

                    const gltf = await loader.loadAsync(url);
                    objectToRender = gltf.scene;
                } else if (fileExtension === 'obj') {
                    objectToRender = await new OBJLoader().loadAsync(url);
                } else {
                    showToast('error', `Unsupported file type: ${fileExtension}`);
                    return;
                }

                // Center the model
                const box = new THREE.Box3().setFromObject(objectToRender);
                const center = new THREE.Vector3();
                box.getCenter(center);
                objectToRender.position.y -= center.y;

                setModel(objectToRender);
            } catch (err) {
                showToast('error', 'Failed to load model');
            }
        }

        loadModel();
    }, [url]);

    if (!model) return null;

    return <primitive object={model} />;
}

export default SimpleModel;