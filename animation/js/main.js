
import * as THREE from 'three';



// ~~~~~~~~~~~~~~~~ Initialize Scene in init() ~~~~~~~~~~~~~~~~


    // ~~~~~~Set up scene, camera, + renderer ~~~~~~

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ 
        canvas: document.querySelector('#bg'), 
    })

    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.position.z = 50;

    renderer.render(scene, camera);

    const geometry = new THREE.TorusGeometry(10,3,16,100);
    const texture = new THREE.TextureLoader().load('textures/checkers.jpg');
    const material = THREE.MeshBasicMaterial({map: texture});

    const torus = new THREE.Mesh(geometry, material); 

    scene.add(torus);
    torus.position.z = -55;
    torus.position.x = -10;

    function moveCamera() {
        const t = document.body.getBoundingClientRect().top;

        camera.position.z = t * 0.1; 
        camera.position.x = t * 0.01; 
    }

    document.body.onscroll = moveCamera; 
    
    moveCamera();

    function animate() {
        requestAnimationFrame(animate);
        torus.rotation.z += 0.01;
        renderer.render(scene,camera);
    }

    animate()


    // ~~~~~~ Add Lights ~~~~~~
    // Add helpers to debug the lights' position - COMMENT OUT WHEN DONE placing the light! https://threejs.org/docs/#api/en/helpers/DirectionalLightHelper

    // ~~ add directional light 
    //const lightRight = new THREE.DirectionalLight(0xffffff, 3);
    //lightRight.position.set(3, 4, 5);
    //scene.add(lightRight);

    //const helperRight = new THREE.DirectionalLightHelper(lightRight, 5);
   // scene.add(helperRight); // comment out when done placing light


    // ~~ add directional light 
    //const lightLeft = new THREE.DirectionalLight(0xff00000, 3);
    //lightLeft.position.set(-3, 4, 5);
    //scene.add(lightLeft);

    //const helperLeft = new THREE.DirectionalLightHelper(lightLeft, 5);
    //scene.add(helperLeft); // comment out when done placing light






    // ~~~~~~ Initiate add-ons ~~~~~~

    //const controls = new OrbitControls(camera, renderer.domElement);
    //const loader = new GLTFLoader(); // to load 3d models






    // ~~~~~~Position Camera~~~~~~
   // camera.position.z = 5;






// ~~~~~~~~~~~~~~~~ Animation Loop ~~~~~~~~~~~~~~~~
// (similar to draw loop in p5.js, updates every frame)




