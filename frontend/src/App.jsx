import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Lights from './components/Lights';
import Floor from './components/Floor';
import Walls from './components/Walls';

function App() {
    const roomDimensions = {
        width: 12,
        length: 15,
        height: 5
    }

    return(
        <Canvas>
            <Lights />
            <Floor dimensions={roomDimensions} />
            <Walls dimensions={roomDimensions} />
            <OrbitControls />
        </Canvas>
    );
}

export default App;