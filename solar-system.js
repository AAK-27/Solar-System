import * as THREE from 'three';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import Stats from 'three/addons/libs/stats.module.js';

const DISTANCESCALE = 300; // The positions are saved in AU; the scale ignores the units, chaning AU -> m
const SIZESCALE = 0.01 // Sizes are saved in km; the scale is a conversion factor to meters
// Planets are scaled differently in the JSON to prevent overlap with the scaled distances

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 5000 );
          
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const stats = new Stats();
document.body.appendChild( stats.dom );

const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 20;
controls.rollSpeed = Math.PI / 4;
controls.autoForward = false;
controls.dragToLook = true;

camera.position.z = 1000;

// const light = new THREE.DirectionalLight( 0xffffff, 1);
// const light = new THREE.PointLight(0xffffff, 1, 10000)
// light.position.set(0, 0, 0);
// light.castShadow = true;
// scene.add( light );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add( ambientLight );

// const redLineMaterial = new THREE.LineBasicMaterial( { color: 0xff0000 } );
// const greenLineMaterial = new THREE.LineBasicMaterial( { color: 0x00ff00 } );
// const blueLineMaterial = new THREE.LineBasicMaterial( { color: 0x0000ff } );

// const xAxisPoints = [];
// xAxisPoints.push( new THREE.Vector3( 10, 0, 0 ) );
// xAxisPoints.push( new THREE.Vector3( 0, 0, 0 ) );
// const xAxisGeometry = new THREE.BufferGeometry().setFromPoints( xAxisPoints );
// const xAxis = new THREE.Line( xAxisGeometry, redLineMaterial );
// scene.add( xAxis );

// const yAxisPoints = [];
// yAxisPoints.push( new THREE.Vector3( 0, 10, 0 ) );
// yAxisPoints.push( new THREE.Vector3( 0, 0, 0 ) );
// const yAxisGeometry = new THREE.BufferGeometry().setFromPoints( yAxisPoints );
// const yAxis = new THREE.Line( yAxisGeometry, greenLineMaterial );
// scene.add( yAxis );

// const zAxisPoints = [];
// zAxisPoints.push( new THREE.Vector3( 0, 0, 10 ) );
// zAxisPoints.push( new THREE.Vector3( 0, 0, 0 ) );
// const zAxisGeometry = new THREE.BufferGeometry().setFromPoints( zAxisPoints );
// const zAxis = new THREE.Line( zAxisGeometry, blueLineMaterial );
// scene.add( zAxis );

fetch('all_bodies.json')
    .then(response => response.json())
    .then(data => {
        const planets = ['199', '299', '399', '499', '599', '699', '799', '899'];
        for (let keys in data){
            if (keys == '10') {
                const diameter = data[keys].diameter;
                const position = data[keys].position;
                const bodyGeometry = new THREE.SphereGeometry( diameter * SIZESCALE );
                const color = data[keys].color;
                console.log(color);
                const threeColor = new THREE.Color();
                threeColor.setRGB(color[0], color[1], color[2])
                const material = new THREE.MeshStandardMaterial({ 
                    color: threeColor,
                    emissive: threeColor,
                    emissiveIntensity: 1,
                });
                const body = new THREE.Mesh( bodyGeometry, material );
                body.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
                scene.add( body );
                continue;
            }
            else if (planets.includes(keys)){
                const diameter = data[keys].diameter;
                const position = data[keys].position;
                const bodyGeometry = new THREE.SphereGeometry( diameter * SIZESCALE );
                const color = data[keys].color;
                console.log(color);
                const threeColor = new THREE.Color();
                threeColor.setRGB(color[0], color[1], color[2])
                const material = new THREE.MeshStandardMaterial({ color: threeColor });
                const body = new THREE.Mesh( bodyGeometry, material );
                body.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
                scene.add( body );
                continue;
            }
            // console.log(data[keys].position);
            const diameter = data[keys].diameter;
            // const color = data[keys]["color"];
            const position = data[keys].position;
            const bodyGeometry = new THREE.SphereGeometry( diameter * SIZESCALE );
            const material = new THREE.MeshStandardMaterial();
            const body = new THREE.Mesh( bodyGeometry, material );
            body.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
            scene.add( body );
        }
    });

function animate() {
    controls.update(0.01);
    stats.update();
    renderer.render( scene, camera );
}

document.addEventListener('keydown', function(event){
    if (event.shiftKey) {
        controls.movementSpeed = 100;
    }
});

document.addEventListener('keyup', function(event){
    if (!event.shiftKey) {
        controls.movementSpeed = 20;
    }
})

renderer.setAnimationLoop( animate );