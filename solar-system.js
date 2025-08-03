import * as THREE from 'three';
import { FlyControls } from 'three/addons/controls/FlyControls.js';
import Stats from 'three/addons/libs/stats.module.js';

const DISTANCESCALE = 300; // The positions are saved in AU; the scale ignores the units, chaning AU -> m
const SIZESCALE = 0.01 // Sizes are saved in km; the scale is a conversion factor to meters
// Planets are scaled differently in the JSON to prevent overlap with the scaled distances

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 10000 );
          
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const stats = new Stats();
document.body.appendChild( stats.dom );

const controls = new FlyControls(camera, renderer.domElement);
controls.movementSpeed = 100;
controls.rollSpeed = Math.PI / 4;
controls.autoForward = false;
controls.dragToLook = true;

camera.position.z = 1000;

// const light = new THREE.DirectionalLight( 0xffffff, 1);
// const light = new THREE.PointLight(0xffffff, 1, 10000)
// light.position.set(0, 0, 0);
// light.castShadow = true;
// scene.add( light );

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add( ambientLight );

// Add the sun
var diameter = 8000;
const sunGeometry = new THREE.SphereGeometry( diameter * SIZESCALE );
const sunTexture = new THREE.TextureLoader().load('assets/8k_sun.jpg');
sunTexture.colorSpace = THREE.SRGBColorSpace; // Ensure three.js uses the right colorspace so textures don't look washed-out
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh( sunGeometry, sunMaterial );
sun.position.set(0, 0, 0);
scene.add( sun );

// Add mercury
diameter = 1000;
var position = [0.1641797716569808, 0.2634520014233632, 0.006470952883686341];
const mercuryGeometry = new THREE.SphereGeometry( diameter * SIZESCALE );
const mercuryTexture = new THREE.TextureLoader().load('assets/8k_mercury.jpg');
mercuryTexture.colorSpace = THREE.SRGBColorSpace; // Ensure three.js uses the right colorspace so textures don't look washed-out
const mercuryMaterial = new THREE.MeshBasicMaterial({ map: mercuryTexture });
const mercury = new THREE.Mesh( mercuryGeometry, mercuryMaterial );
mercury.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
scene.add( mercury );

// Add Venus
diameter = 3000;
var position = [-0.6040652826661133, 0.3872022730654806, 0.040172416999277];
const venusGeometry = new THREE.SphereGeometry( diameter * SIZESCALE );
const venusTexture = new THREE.TextureLoader().load('assets/8k_venus_surface.jpg');
venusTexture.colorSpace = THREE.SRGBColorSpace; // Ensure three.js uses the right colorspace so textures don't look washed-out
const venusMaterial = new THREE.MeshBasicMaterial({ map: venusTexture });
const venus = new THREE.Mesh( venusGeometry, venusMaterial );
venus.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
scene.add( venus );
// Add Venus's atmosphere
const venusAtmosphereGeometry = new THREE.SphereGeometry( (diameter+50) * SIZESCALE);
const venusAtmosphereTexture = new THREE.TextureLoader().load('assets/4k_venus_atmosphere.jpg');
venusAtmosphereTexture.colorSpace = THREE.SRGBColorSpace;
const venusAtmosphereMaterial = new THREE.MeshBasicMaterial({ map: venusAtmosphereTexture, transparent: true, opacity: 0.5 });
const venusAtmosphere = new THREE.Mesh(venusAtmosphereGeometry, venusAtmosphereMaterial);
venusAtmosphere.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
scene.add( venusAtmosphere );

// Add Earth
diameter = 3200;
var position = [-0.9358538582543061, 0.3258369879724334, -1.33715970328223e-05];
const earthGeometry = new THREE.SphereGeometry( diameter * SIZESCALE );
const earthTexture = new THREE.TextureLoader().load('assets/8k_earth_daymap.jpg');
earthTexture.colorSpace = THREE.SRGBColorSpace; // Ensure three.js uses the right colorspace so textures don't look washed-out
const earthMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const earth = new THREE.Mesh( earthGeometry, earthMaterial );
earth.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
scene.add( earth );
// Add Earth's atmosphere
const earthAtmosphereGeometry = new THREE.SphereGeometry( (diameter+50) * SIZESCALE);
const earthAtmosphereTexture = new THREE.TextureLoader().load('assets/8k_earth_clouds.jpg');
const earthAtmosphereMaterial = new THREE.MeshBasicMaterial({ transparent: true, alphaMap: earthAtmosphereTexture });
const earthAtmosphere = new THREE.Mesh(earthAtmosphereGeometry, earthAtmosphereMaterial);
earthAtmosphere.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
scene.add( earthAtmosphere );

// Add Mars
diameter = 2000;
var position = [-1.186340953248194, 1.153311470639685, 0.05326125215252044];
const marsGeometry = new THREE.SphereGeometry( diameter * SIZESCALE );
const marsTexture = new THREE.TextureLoader().load('assets/8k_mars.jpg');
marsTexture.colorSpace = THREE.SRGBColorSpace; // Ensure three.js uses the right colorspace so textures don't look washed-out
const marsMaterial = new THREE.MeshBasicMaterial({ map: marsTexture });
const mars = new THREE.Mesh( marsGeometry, marsMaterial );
mars.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
scene.add( mars );

// Add Jupiter
diameter = 7000;
var position = [0.6076042138714324, 5.066044525795209, -0.03463819961053206];
const jupiterGeometry = new THREE.SphereGeometry( diameter * SIZESCALE );
const jupiterTexture = new THREE.TextureLoader().load('assets/8k_jupiter.jpg');
jupiterTexture.colorSpace = THREE.SRGBColorSpace; // Ensure three.js uses the right colorspace so textures don't look washed-out
const jupiterMaterial = new THREE.MeshBasicMaterial({ map: jupiterTexture });
const jupiter = new THREE.Mesh( jupiterGeometry, jupiterMaterial );
jupiter.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
scene.add( jupiter );

// Add Saturn
diameter = 6500;
var position = [9.497686525484314, -1.437850733044135, -0.3530243447550175];
const saturnGeometry = new THREE.SphereGeometry( diameter * SIZESCALE );
saturnGeometry.rotateX(Math.PI / 180 * 26.7);
const saturnTexture = new THREE.TextureLoader().load('assets/8k_saturn.jpg');
saturnTexture.colorSpace = THREE.SRGBColorSpace; // Ensure three.js uses the right colorspace so textures don't look washed-out
const saturnMaterial = new THREE.MeshBasicMaterial({ map: saturnTexture });
const saturn = new THREE.Mesh( saturnGeometry, saturnMaterial );
saturn.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
scene.add( saturn );
// Add Saturn's rings
const saturnRingGeometry = new THREE.TorusGeometry( 10000 * SIZESCALE, 3000 * SIZESCALE, 8, 64);
saturnRingGeometry.scale(1, 1, 0.01);
saturnRingGeometry.rotateX(Math.PI / 180 * (26.7 + 90));
const saturnRingTexture = new THREE.TextureLoader().load('assets/8k_saturn_ring_alpha.png');
saturnRingTexture.rotation = Math.PI / 2;
saturnRingTexture.wrapS = THREE.MirroredRepeatWrapping;
saturnRingTexture.repeat.set(2, 1);
const saturnRingMaterial = new THREE.MeshBasicMaterial({
    map: saturnRingTexture,
    side: THREE.DoubleSide,
    transparent: true
});
const saturnRing = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial);
saturnRing.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
scene.add(saturnRing);

// Add Uranus
diameter = 6000;
var position = [10.90806190918147, 16.21551322237325, -0.08121429610559158];
const uranusGeometry = new THREE.SphereGeometry( diameter * SIZESCALE );
const uranusTexture = new THREE.TextureLoader().load('assets/2k_uranus.jpg');
uranusTexture.colorSpace = THREE.SRGBColorSpace; // Ensure three.js uses the right colorspace so textures don't look washed-out
const uranusMaterial = new THREE.MeshBasicMaterial({ map: uranusTexture });
const uranus = new THREE.Mesh( uranusGeometry, uranusMaterial );
uranus.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
scene.add( uranus );

// Add Neptune
diameter = 5500;
var position = [29.88167225596445, -0.4461375316323678, -0.6794114826854919];
const neptuneGeometry = new THREE.SphereGeometry( diameter * SIZESCALE );
const neptuneTexture = new THREE.TextureLoader().load('assets/2k_neptune.jpg');
neptuneTexture.colorSpace = THREE.SRGBColorSpace; // Ensure three.js uses the right colorspace so textures don't look washed-out
const neptuneMaterial = new THREE.MeshBasicMaterial({ map: neptuneTexture });
const neptune = new THREE.Mesh( neptuneGeometry, neptuneMaterial );
neptune.position.set(position[0]*DISTANCESCALE, position[2]*DISTANCESCALE, position[1]*DISTANCESCALE);
scene.add( neptune );

fetch('all_bodies.json')
    .then(response => response.json())
    .then(data => {
        for (let keys in data){
            const diameter = data[keys].diameter;
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
        controls.movementSpeed = 500;
    }
});

document.addEventListener('keyup', function(event){
    if (!event.shiftKey) {
        controls.movementSpeed = 100;
    }
});

renderer.setAnimationLoop( animate );