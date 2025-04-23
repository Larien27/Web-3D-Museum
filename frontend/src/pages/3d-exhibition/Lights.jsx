function Lights() {
    return(
        <>
            <ambientLight intensity={1} color='#ffffff' />
            <directionalLight position={[3, 2, 1]} intensity={2} color='#ffffff' />
        </>
    );
}

export default Lights;