import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

// Debug Menu
const gui = new GUI({
    title: 'Debug Menu'
});

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
// const textureLoader = new THREE.TextureLoader();

// Floor
// const floorColorTexture = textureLoader.load('./wood_floor_1k/wood_floor_diff_1k.jpg');
// floorColorTexture.colorSpace = THREE.SRGBColorSpace;
// const floorARMTexture = textureLoader.load('./wood_floor_1k/wood_floor_arm_1k.jpg');
// const floorDisplacementTexture = textureLoader.load('./wood_floor_1k/wood_floor_disp_1k.jpg');
// const floorNormalTexture = textureLoader.load('./wood_floor_1k/wood_floor_nor_gl_1k.jpg');

// floorColorTexture.repeat.set(5, 10);
// floorARMTexture.repeat.set(5, 10);
// floorDisplacementTexture.repeat.set(5, 10);
// floorNormalTexture.repeat.set(5, 10);

// floorColorTexture.wrapS = THREE.RepeatWrapping;
// floorARMTexture.wrapS = THREE.RepeatWrapping;
// floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
// floorNormalTexture.wrapS = THREE.RepeatWrapping;
// floorColorTexture.wrapT = THREE.RepeatWrapping;
// floorARMTexture.wrapT = THREE.RepeatWrapping;
// floorDisplacementTexture.wrapT = THREE.RepeatWrapping;
// floorNormalTexture.wrapT = THREE.RepeatWrapping;

/**
 * Museum
 */
// const roomDimensions = {
//     width: 12,
//     length: 15,
//     height: 5
// }

// Floor
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(roomDimensions.width, roomDimensions.length, 1),
//     new THREE.MeshStandardMaterial({
//         map: floorColorTexture,
//         aoMap: floorARMTexture,
//         roughnessMap: floorARMTexture,
//         displacementMap: floorDisplacementTexture,
//         displacementScale: 0.3,
//         displacementBias: -0.1,
//         normalMap: floorNormalTexture
//     })
// );
// floor.rotation.x = - Math.PI / 2;
// scene.add(floor);

// Walls
// const longerWallGeometry = new THREE.PlaneGeometry(roomDimensions.length, roomDimensions.height);
// const shorterWallGeometry = new THREE.PlaneGeometry(roomDimensions.width, roomDimensions.height);
// const wallMaterial = new THREE.MeshStandardMaterial();

// const longWall1 = new THREE.Mesh(longerWallGeometry, wallMaterial);
// const longWall2 = new THREE.Mesh(longerWallGeometry, wallMaterial);
// const shortWall1 = new THREE.Mesh(shorterWallGeometry, wallMaterial);
// const shortWall2 = new THREE.Mesh(shorterWallGeometry, wallMaterial);

// longWall1.rotation.y = Math.PI / 2;
// longWall1.position.x = - roomDimensions.width / 2;
// longWall1.position.y = roomDimensions.height / 2;

// longWall2.rotation.y = - Math.PI / 2;
// longWall2.position.x = roomDimensions.width / 2;
// longWall2.position.y = roomDimensions.height / 2;

// shortWall1.position.z = - roomDimensions.length / 2;
// shortWall1.position.y = roomDimensions.height / 2;

// shortWall2.rotation.y = Math.PI;
// shortWall2.position.z = roomDimensions.length / 2;
// shortWall2.position.y = roomDimensions.height / 2;

// scene.add(longWall1, longWall2, shortWall1, shortWall2);

// Example Object - TODO: DELETE LATER
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial()
);

scene.add(cube);

// Cube Debug
const cubeDebug = gui.addFolder('Cube');
cubeDebug
    .add(cube, 'visible');
cubeDebug
    .add(cube.material, 'wireframe');

// Lights
// const ambientLight = new THREE.AmbientLight('#ffffff', 1);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight('#ffffff', 2);
// directionalLight.position.x = 3;
// directionalLight.position.y = 2;
// directionalLight.position.z = 1;
// scene.add(directionalLight);

// Window size
const windowSizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// On window resize
window.addEventListener('resize', () => {
    
    // Update inner sizes
    windowSizes.width = window.innerWidth;
    windowSizes.height = window.innerHeight;

    // Update camera
    camera.aspect = windowSizes.width / windowSizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(windowSizes.width, windowSizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


// Camera
// const camera = new THREE.PerspectiveCamera(75, windowSizes.width / windowSizes.height, 1, 1000);
// camera.position.x = 3;
// camera.position.y = 2;
// camera.position.z = 5;
// scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(windowSizes.width, windowSizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

function animate() {
    // Render
    renderer.render(scene, camera);

    controls.update();

    requestAnimationFrame(animate);
}

animate();