/* 
glTF import:
- glTF loader imported + enabled
-Global variable added to store dog gltf
-Two directional lights added to view glTF
- Added HELPERS to debug light position (disable after you place them)
-glTF imported from blender (not it is an *embedded* .glTF file, not .glb)
-Changed material on cube from BASIC to STANDARD so that the geometry catches light
*/


//~~~~~~~Import Three.js (also linked to as an import map in the HTML)~~~~~~
import * as THREE from 'three';


// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models



// ~~~~~~~~~~~~~~~~ Declare Global Variables~~~~~~~~~~~~~~~~
let sphere, spaceship;




const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ 
    canvas: document.querySelector('#bg')
});

  // ~~~~~~Position Camera~~~~~~
  camera.position.set(0, 0, 50); 
  camera.lookAt(0, 0, 0);



// ~~~~~~~~~~~~~~~~ Initialize Scene in init() ~~~~~~~~~~~~~~~~
function init() {

    // ~~~~~~Set up scene, camera, + renderer ~~~~~~


    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);


    // ~~~~~~ Add Lights ~~~~~~
    // Add helpers to debug the lights' position - COMMENT OUT WHEN DONE placing the light! https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper

    // ~~ add directional light 
    const lightRight = new THREE.DirectionalLight(0xffffff, 3);
    lightRight.position.set(3, 4, 5);
    scene.add(lightRight);

    const helperRight = new THREE.DirectionalLightHelper(lightRight, 5);
    scene.add(helperRight); // comment out when done placing light


    // ~~ add directional light 
    const lightLeft = new THREE.DirectionalLight(0xff00000, 3);
    lightLeft.position.set(-3, 4, 5);
    scene.add(lightLeft);

    const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5);
    scene.add(helperLeft); // comment out when done placing light






    // ~~~~~~ Initiate add-ons ~~~~~~

    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader(); // to load 3d models



    // ~~~~~~ Create Geometry ~~~~~~


    const geometry = new THREE.SphereGeometry( 2, 8, 4);

    const texture = new THREE.TextureLoader().load('textures/ice.jpg');

    const material = new THREE.MeshStandardMaterial( { map: texture } ); 

    sphere = new THREE.Mesh(geometry, material);
    sphere.position.set(0, 0, 0);
    scene.add(sphere);


    // --> Load glTF

    loader.load('assets/spaceship.gltf', function (gltf) {
        spaceship = gltf.scene;
        spaceship.position.set(0, 0, 0); 
        spaceship.scale.set(0.3, 0.3, 0.3); // scale your model
        scene.add(spaceship);
    });




  


}

function moveCamera() {
    const scrollY = window.scrollY;

    // Adjust camera based on scrollY
    camera.position.z = scrollY * 0.05; // Adjust multiplier to control speed
    camera.position.x = scrollY * 0.01;
    camera.position.y = -scrollY * 0.01;

    sphere.rotation.y += 0.01;
    if (spaceship) {
        spaceship.rotation.y += 0.01;
    }
}

window.addEventListener('scroll', moveCamera);


// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)

function animate() {
    requestAnimationFrame(animate); // start loop by with frame update

    // →→→→→→ add your animation here ↓↓↓↓

    sphere.rotation.x += 0.007;
    sphere.rotation.y += 0.007;

    sphere.position.z = Math.sin(Date.now()/4000 * 2);
    sphere.position.x = Math.sin(Date.now()/5000 * 2);
    sphere.position.y = Math.sin(Date.now()/3000 * 2);

    if (spaceship) {
        
        //spaceship.rotation.y += 0.007;
        spaceship.rotation.y = Math.sin(Date.now()/2000 * 0.5);
        //spaceship.position.z = 1;
    }


    // always end animation loop with renderer
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

}

window.addEventListener('resize', onWindowResize, false);

init(); // execute initialize function
animate(); // execute animation function
moveCamera ();
