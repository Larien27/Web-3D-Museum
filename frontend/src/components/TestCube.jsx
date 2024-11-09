function TestCube() {
    return(
        <mesh position-y={1}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'red'} />
        </mesh>
    );
}

export default TestCube;