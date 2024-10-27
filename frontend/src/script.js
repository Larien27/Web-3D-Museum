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
 * Museum
 */
const roomDimensions = {
    width: 12,
    length: 15,
    height: 5
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(roomDimensions.width, roomDimensions.length, 1),
    new THREE.MeshStandardMaterial()
);
floor.rotation.x = - Math.PI / 2;
scene.add(floor);

// Walls
const longerWallGeometry = new THREE.PlaneGeometry(roomDimensions.length, roomDimensions.height);
const shorterWallGeometry = new THREE.PlaneGeometry(roomDimensions.width, roomDimensions.height);
const wallMaterial = new THREE.MeshStandardMaterial();

const longWall1 = new THREE.Mesh(longerWallGeometry, wallMaterial);
const longWall2 = new THREE.Mesh(longerWallGeometry, wallMaterial);
const shortWall1 = new THREE.Mesh(shorterWallGeometry, wallMaterial);
const shortWall2 = new THREE.Mesh(shorterWallGeometry, wallMaterial);

longWall1.rotation.y = Math.PI / 2;
longWall1.position.x = - roomDimensions.width / 2;
longWall1.position.y = roomDimensions.height / 2;

longWall2.rotation.y = - Math.PI / 2;
longWall2.position.x = roomDimensions.width / 2;
longWall2.position.y = roomDimensions.height / 2;

shortWall1.position.z = - roomDimensions.length / 2;
shortWall1.position.y = roomDimensions.height / 2;

shortWall2.rotation.y = Math.PI;
shortWall2.position.z = roomDimensions.length / 2;
shortWall2.position.y = roomDimensions.height / 2;

scene.add(longWall1, longWall2, shortWall1, shortWall2);

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
const ambientLight = new THREE.AmbientLight('#ffffff', 1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight('#0000ff', 2);
directionalLight.position.x = 3;
directionalLight.position.y = 2;
directionalLight.position.z = 1;
scene.add(directionalLight);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.x = 3;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(window.innerWidth, window.innerHeight);

function animate() {
    // Render
    renderer.render(scene, camera);

    controls.update();

    requestAnimationFrame(animate);
}

animate();