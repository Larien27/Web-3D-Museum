import React from 'react';

function Lights() {
    return(
        <>
        <ambientLight intensity={1}/>
        <directionalLight position={[3, 2, 1]} intensity={2}/>
        </>
    );
}

export default Lights;