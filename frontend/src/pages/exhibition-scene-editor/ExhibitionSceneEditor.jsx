import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import SceneContent from './SceneContent';


function ExhibitionSceneEditor() {
    const { showToast } = useToast();
    const { exhibitionId } = useParams();
    const [models, setModels] = useState([]);
    const [selectedModelId, setSelectedModelId] = useState(null);
    const modelRefs = useRef({});

    useEffect(() => {
        async function fetchModels() {
            try {
                const response = await axios.get(`/api/artefacts/${exhibitionId}/artefacts/3d`);
                setModels(response.data);
            } catch (err) {
                showToast('error', 'Failed to load 3D models.');
            }
        }

        if (exhibitionId) {
            fetchModels();
        }
    }, [exhibitionId]);

    const handleSave = async () => {
        const sceneData = models.map((model) => {
            const ref = modelRefs.current[model.id];
            if (!ref) return null;
            return {
                id: model.id,
                position: ref.position.toArray(),
                rotation: ref.rotation.toArray(),
                scale: ref.scale.toArray(),
            };
        }).filter(Boolean);

        try {
            for (const modelData of sceneData) {
                await axios.put(`/api/artefacts/${modelData.id}/save-transformations`, {
                    position: modelData.position,
                    rotation: modelData.rotation,
                    scale: modelData.scale,
                });
            }
            showToast('success', 'Scene saved successfully!');
        } catch (err) {
            showToast('error', 'Error saving the scene.');
        }
    };

    return (
        <div>
            <p>To switch between changing the position, rotation and scale of the artefact, press Arrow Down.</p>
            <Canvas camera={{ position: [3, 2, 5], fov: 75 }}>
                <SceneContent
                    models={models}
                    selectedModelId={selectedModelId}
                    setSelectedModelId={setSelectedModelId}
                    modelRefs={modelRefs}
                />
            </Canvas>
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default ExhibitionSceneEditor;