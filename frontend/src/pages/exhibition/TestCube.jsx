import { useState } from 'react';
import { Outlines } from '@react-three/drei';

function TestCube() {
    const [clicked, setClicked] = useState(false);

    return(
        <mesh
            position-y={1}
            onClick={() => setClicked(!clicked)}        // Set state on click to toggle outline
            onPointerDown={(e) => e.stopPropagation()}  // Stop controlls problems when the outline is on
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'red'} />

            {/* Set outline on click */}
            {clicked && (
                <Outlines thickness={5} color={'white'} />
            )}
        </mesh>
    );
}

export default TestCube;
