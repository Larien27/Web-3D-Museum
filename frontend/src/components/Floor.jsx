import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

function Floor({ dimensions }) {
    const colorTexture = useLoader(THREE.TextureLoader, './wood_floor_1k/wood_floor_diff_1k.webp');
    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;
    colorTexture.repeat.set(5, 10);

    const armTexture = useLoader(THREE.TextureLoader, './wood_floor_1k/wood_floor_arm_1k.webp');
    armTexture.wrapS = THREE.RepeatWrapping;
    armTexture.wrapT = THREE.RepeatWrapping;
    armTexture.repeat.set(5, 10);

    const displacementTexture = useLoader(THREE.TextureLoader, './wood_floor_1k/wood_floor_disp_1k.webp');
    displacementTexture.wrapS = THREE.RepeatWrapping;
    displacementTexture.wrapT = THREE.RepeatWrapping;
    displacementTexture.repeat.set(5, 10);

    const normalTexture = useLoader(THREE.TextureLoader, './wood_floor_1k/wood_floor_nor_gl_1k.webp');
    normalTexture.wrapS = THREE.RepeatWrapping;
    normalTexture.wrapT = THREE.RepeatWrapping;
    normalTexture.repeat.set(5, 10);

    return(
        <mesh rotation-x={- Math.PI / 2}>
            <planeGeometry args={[dimensions.width, dimensions.length]} />
            console.log(dimensions);
            console.log(dimensions.width);
            console.log(dimensions.height);
            <meshStandardMaterial
                map={colorTexture}
                aoMap={armTexture}
                roughnessMap={armTexture}
                displacementMap={displacementTexture}
                displacementScale={0.3}
                displacementBias={0}
                normalMap={normalTexture}
            />
        </mesh>
    );
}

export default Floor;