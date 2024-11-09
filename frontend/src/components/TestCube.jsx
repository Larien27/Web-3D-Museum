import { useState } from 'react';
import { Outlines } from '@react-three/drei';

function TestCube() {
    const [clicked, setClicked] = useState(false);

    return(
        <mesh
            position-y={1}
            onClick={() => setClicked(!clicked)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'red'} />

            {clicked && (
                <Outlines thickness={5} color={'white'} />
            )}
        </mesh>
    );
}

export default TestCube;