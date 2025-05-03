function Walls({ dimensions }) {
    const wallColor = '#575656';
    return(
        <>
            {/* Long walls */}
            <mesh rotation-y={Math.PI / 2} position={[- dimensions.width / 2, dimensions.height / 2, 0]}>
                <planeGeometry args={[dimensions.length, dimensions.height]} />
                <meshStandardMaterial color={wallColor} />
            </mesh>
            <mesh rotation-y={- Math.PI / 2} position={[dimensions.width / 2, dimensions.height / 2, 0]}>
                <planeGeometry args={[dimensions.length, dimensions.height]} />
                <meshStandardMaterial color={wallColor} />
            </mesh>

            {/* Short walls */}
            <mesh position={[0, dimensions.height / 2, - dimensions.length / 2]}>
                <planeGeometry args={[dimensions.width, dimensions.height]} />
                <meshStandardMaterial color={wallColor} />
            </mesh>
            <mesh rotation-y={Math.PI} position={[0, dimensions.height / 2, dimensions.length / 2]}>
                <planeGeometry args={[dimensions.width, dimensions.height]} />
                <meshStandardMaterial color={wallColor} />
            </mesh>
        </>
    );
}

export default Walls;