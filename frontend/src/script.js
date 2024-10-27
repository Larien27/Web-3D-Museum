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

// Object
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial()
);

scene.add(cube);

// Cube Debug
const cubeDebug = gui.addFolder('Cube');
cubeDebug
    .add(cube, 'visible');
cubeDebug
    .add(cube.material, 'wireframe');


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