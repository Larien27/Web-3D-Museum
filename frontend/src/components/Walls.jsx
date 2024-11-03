import React from 'react';

function Walls({ dimensions }) {
    return(
        <>
            {/* Long walls */}
            <mesh rotation-y={Math.PI / 2} position={[- dimensions.width / 2, dimensions.height / 2, 0]}>
                <planeGeometry args={[dimensions.length, dimensions.height]} />
                <meshStandardMaterial />
            </mesh>
            <mesh rotation-y={- Math.PI / 2} position={[dimensions.width / 2, dimensions.height / 2, 0]}>
                <planeGeometry args={[dimensions.length, dimensions.height]} />
                <meshStandardMaterial />
            </mesh>

            {/* Short walls */}
            <mesh position={[0, dimensions.height / 2, - dimensions.length / 2]}>
                <planeGeometry args={[dimensions.width, dimensions.height]} />
                <meshStandardMaterial />
            </mesh>
            <mesh rotation-y={Math.PI} position={[0, dimensions.height / 2, dimensions.length / 2]}>
                <planeGeometry args={[dimensions.width, dimensions.height]} />
                <meshStandardMaterial />
            </mesh>
        </>
    );
}

export default Walls;