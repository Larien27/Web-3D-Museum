import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './Exhibition.scss';
import Lights from './Lights';
import Floor from './Floor';
import Walls from './Walls';
import Model from './Model';

function Exhibition() {
    const { exhibitionId } = useParams();
    const [models, setModels] = useState([]);
    const [selectedModelId, setSelectedModelId] = useState(null);

    useEffect(() => {
        async function fetchModels() {
            try {
                const response = await axios.get(`/api/artefacts/${exhibitionId}/artefacts/3d`);
                setModels(response.data);
            } catch (err) {
                console.error('Failed to load 3D models.');
            }
        }

        if (exhibitionId) {
            fetchModels();
        }
    }, [exhibitionId]);

    const handleSelectModel = (modelId) => {
        const prevId = selectedModelId;
        setSelectedModelId(prevId === modelId ? null : modelId);
    }

    const roomDimensions = {
        width: 12,
        length: 15,
        height: 5
    }

    return(
        <Canvas
            camera={{
                position: [3, 2, 5],
                fov: 75,
                near: 1,
                far: 100
            }}
        >
            <Lights />
            <Floor dimensions={roomDimensions} />
            <Walls dimensions={roomDimensions} />

            {models.map((model) => (
                <Model key={model.id} url={model.modelFileUrl} isSelected={selectedModelId === model.id} onSelect={() => handleSelectModel(model.id)} />
            ))}

            <OrbitControls />
        </Canvas>
    );
}

export default Exhibition;