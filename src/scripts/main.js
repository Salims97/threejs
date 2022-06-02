import * as THREE from 'three';
import { Mesh, MeshBasicMaterial } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";



const scene = new THREE.Scene();
///// x y z 
scene.add(new THREE.AxesHelper(500));
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(3, 3, 3);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
// camera.lookAt()


camera.position.z = 15;

// mini window and the program still appears correctly
window.addEventListener('resize', function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix;
});



// to control the camera        
// var controls = new THREE.OrbitControls(camera, renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
// controls.keys = {
//   LEFT: 'ArrowLeft', //left arrow
//   UP: 'ArrowUp', // up arrow
//   RIGHT: 'ArrowRight', // right arrow
//   BOTTOM: 'ArrowDown' // down arrow
// };
controls.update();

function creatEarth() {
    const geometry = new THREE.SphereGeometry(998, 64, 32);
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xf0f000 }));
    scene.add(line);

    // const geometry1 = new THREE.SphereGeometry(250, 64, 32);
    // const material1 = new THREE.MeshBasicMaterial({ color: 0x000000 });
    // var line1 = new THREE.Mesh(geometry1, material1);
    // scene.add(line1);




    //ةعدل هون عمسار الصور
    const sky = new THREE.TextureLoader().load('assets/textures/sky.jpeg');

    const sphereColor = new THREE.TextureLoader().load('assets/textures/earth.jpeg'
        //,function(texture){
        //  scene.background = texture;
        // }
    );
    const geometryS = new THREE.SphereGeometry(1000, 64, 32);
    const materialS = new THREE.MeshBasicMaterial({ map: sphereColor });

    var earth = new THREE.Mesh(geometryS, materialS);

    // earth.material.side = THREE.DoubleSide;
    const materialS1 = new THREE.MeshBasicMaterial({ map: sky });
    var earth1 = new THREE.Mesh(geometryS, materialS1);
    earth1.material.side = THREE.BackSide;
    scene.add(earth1);
    scene.add(earth);
}


function creatPlane() {

    const geometry = new THREE.PlaneGeometry(20, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotateX(Math.PI / 2);
    //    rotation 
    plane.position.set(0, -10, 0);
    // plane.rotateZ(180);
    scene.add(plane);
}


// adding the rocket
// function createRocketModel() {

//     var loader = new OBJLoader();
 
//     loader.load('assets/models/rocket/rocket.obj',
//         (loader) => {
//             scene.add(loader.scene);
//         }
//     );




// }


        // adding the rocket
        function createRocketModel() {
            const loader = new OBJLoader();
            var color =  new THREE.Color(0xff0000);
            // load a resource
            loader.load(
                // resource URL
                'assets/models/rocket/rocket.obj',
                // called when resource is loaded
                function ( object ) {
                    object.traverse(function () {
                        MeshBasicMaterial.color = color;
                    });
                    scene.add( object );
                    
                },
                // called when loading is in progresses
                function ( xhr ) {
            
                    console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            
                },
                // called when loading has errors
                function ( error ) {
            
                    console.log( 'An error happened' );
            
                }

            );

            
            
            
        }

function animate() {
    requestAnimationFrame(animate);

    // sphere.rotation.x += 0.01;   
    // sphere.rotation.y += 0.01;

    renderer.render(scene, camera);

}

createRocketModel();
creatPlane();
animate();
creatEarth();