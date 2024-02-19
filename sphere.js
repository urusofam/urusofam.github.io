import * as THREE from './build/three.module.js';
import { STLLoader } from './build/STLLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 6, 21);
camera.rotation.set(0,0,0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const axesHelper = new THREE.AxesHelper(40);
scene.add(axesHelper);

const material = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    metalness: 1,
    roughness: 1,
    opacity: 1,
    transparent: false,
    transmission: 0.99,
    clearcoat: 1.0,
    clearcoatRoughness: 0.25,
    emissive: 0xff0000
})

let mesh;

const loader = new STLLoader();
loader.load('./models/model.stl', function (geometry){
    geometry.scale(0.2,0.2,0.2)
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh.rotation.x = -Math.PI / 2;
});

let mouseDown = false;
let mousewheel = false;
let prevMousePos = { x: 0, y: 0 };

document.addEventListener('mousedown', event => {
    if (event.button === 0) {
        mouseDown = true;
    }
    else if (event.button === 1) {
        mousewheel = true;
    }
});

document.addEventListener('mouseup', event => {
    if (event.button === 0) {
        mouseDown = false;
    }
    else if (event.button === 1) {
        mousewheel = false;
    }
});

document.addEventListener('mousemove', event => {
    const deltaMove = {
        x: event.offsetX - prevMousePos.x,
        y: event.offsetY - prevMousePos.y
    };

    if (mouseDown) {
        mesh.position.x += deltaMove.x * 0.03;
        mesh.position.z += deltaMove.y * 0.03;
    }

    else if (mousewheel) {
        mesh.rotation.z -= (deltaMove.x * 0.03) * -1;
        mesh.rotation.y -= (deltaMove.y * 0.03) * -1;
    }
    prevMousePos = { x: event.offsetX, y: event.offsetY };
});

// Функция анимации
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();