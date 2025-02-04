import { useState } from 'react';
import { Outlines } from '@react-three/drei';
import DetailPanel from './DetailPanel';

function TestCube() {

    // Set state for the outline
    const [clicked, setClicked] = useState(false);

    return(
        <>
            <mesh
                position-y={1}
                onClick={() => setClicked(!clicked)}        // Set state on click to toggle outline
                onPointerDown={(e) => e.stopPropagation()}  // Stop controls problems when the outline is on
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={'red'} />

                {/* Set outline on click */}
                {clicked && (
                    <Outlines thickness={5} color={'white'} />
                )}
            </mesh>

            {clicked && <DetailPanel />}
        </>
    );
}

export default TestCube;
