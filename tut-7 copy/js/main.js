
//import addons
import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models


// GLOBAL VARIABLES
let scene, camera, renderer, circle, capsule;
let sceneContainer = document.querySelector("#scene-container");

function init(){
    // SCENE 
    scene = new THREE.Scene();

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(1,1,5);
    


    scene.add(light);

  

    camera = new THREE.PerspectiveCamera( 75, sceneContainer.clientWidth / sceneContainer.clientHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( sceneContainer.clientWidth, sceneContainer.clientHeight );
    renderer.setAnimationLoop( animate );
    sceneContainer.appendChild( renderer.domElement );

    // initiate addons 
    const controls = new OrbitControls(camera, renderer.domElement); 
    const loader = new GLTFLoader(); // to load 3d models

    loader.load('assets/spaceship.gltf', function (gltf){
        const spaceship = gltf.scene;
        scene.add(spaceship);
        spaceship.scale.set(0.5,0.5,0.5);
        spaceship.translateY(1);
    })

    //Geometry

         const geometry_1 = new THREE.CircleGeometry( 5, 32 );
         const texture_1 = new THREE.TextureLoader().load('texture/ice.jpg');
         const material_1 = new THREE.MeshStandardMaterial({ map: texture_1 });
         circle = new THREE.Mesh( geometry_1, material_1 );

         const geometry_2 = new THREE.CapsuleGeometry(2, 2, 4, 8 );
         const texture_2 = new THREE.TextureLoader().load('texture/checkers.jpg');
         const material_2 = new THREE.MeshStandardMaterial({ map: texture_2 });
         capsule = new THREE.Mesh( geometry_2, material_2 );

         scene.add(circle);
         scene.add(capsule);
        

    // CAMERA
    camera.position.z = 5;

}

// ANIAMTION
 function animate() {
    
     circle.rotation.x += 0.002;
     circle.rotation.y += 0.002;

     capsule.rotation.x -= 0.01;
     capsule.rotation.y -= 0.01;
     

     renderer.render( scene, camera );
 }



function onWindowResize() {
    camera.aspect = sceneContainer.clientWidth / sceneContainer.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( sceneContainer.clientWidth, sceneContainer.clientHeight );
}
window.addEventListener('resize', onWindowResize, false);

init();
animate();