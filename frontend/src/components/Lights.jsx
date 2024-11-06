import React from 'react';
import { useControls } from 'leva';

function Lights() {
    const { ambientIntensity, ambientColor } = useControls('Ambient Light', {
        ambientIntensity: { value: 1, min: 0, max: 5 },
        ambientColor: '#ffffff'
    }, { collapsed: true });
    
    const { directionalIntensity, directionalColor } = useControls('Directional Light', {
        directionalIntensity: { value: 2, min: 0, max: 5 },
        directionalColor: '#ffffff'
    }, { collapsed: true });

    return(
        <>
            <ambientLight intensity={ambientIntensity} color={ambientColor} />
            <directionalLight position={[3, 2, 1]} intensity={directionalIntensity} color={directionalColor} />
        </>
    );
}

export default Lights;