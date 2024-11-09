import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './Museum.scss';
import Lights from './Lights';
import Floor from './Floor';
import Walls from './Walls';
import TestCube from './TestCube';

function Museum() {

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
            <TestCube />
            <OrbitControls />
        </Canvas>
    );
}

export default Museum;