import * as THREE from "three";
import {Mesh} from "three";


let canvas = document.querySelector("#c") as HTMLCanvasElement;



const renderer = new THREE.WebGLRenderer({canvas});

const camera = new THREE.PerspectiveCamera( 40, 2, 0.1, 1000);
camera.position.set(0,50,0);
camera.up.set(0,0,1);
camera.lookAt(0,0,0);

const scene = new THREE.Scene();

{

    let light = new THREE.PointLight("0xFFFFFF",3);
    scene.add(light);
}

const objects : Mesh[] =[];

const sphereGeometry = new THREE.SphereGeometry(1,6,6);


const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMesh = new THREE.Mesh(sphereGeometry,sunMaterial);
sunMesh.scale.set(5,5,5);
scene.add(sunMesh);
objects.push(sunMesh);

const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthMesh.position.x = 10;
scene.add(earthMesh);
objects.push(earthMesh);


function resizeRendererToDisplaySize(renderer:THREE.Renderer){
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !==height;
    if (needResize){
        renderer.setSize(width,height,false);
    }

    return needResize;
}


function render(time:number) {
    time *= 0.001;

    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
        obj.rotation.y = time;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);


