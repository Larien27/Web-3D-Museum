import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SimpleModel from './SimpleModel';

function Artefact({ artefactUrl }) {
    return(
        <Canvas
            camera={{
                position: [-2, 3, 3],
                fov: 75
            }}
        >        
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[0, 5, 0]} intensity={1} />

            <SimpleModel url={artefactUrl} />
            <OrbitControls />
        </Canvas>
    );
}

export default Artefact;