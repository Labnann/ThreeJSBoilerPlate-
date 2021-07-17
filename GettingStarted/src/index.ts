import * as THREE from "three";


let canvas = document.querySelector("#c") as HTMLCanvasElement;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, 2, 0.1, 5);

const renderer = new THREE.WebGLRenderer({canvas});

function makeCube(x:number,y:number,z:number) {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhysicalMaterial({color: 0x44aa88});
    let cube = new THREE.Mesh(geometry, material);
    setMeshPosition(cube,x,y,z);
    return cube;
}







function  setMeshPosition(mesh: THREE.Mesh, x:number,y:number,z:number){
    mesh.position.x = x;
    mesh.position.y = y;
    mesh.position.z = z;
}

const cube1 = makeCube(3,1,1);
const cube2 = makeCube(1,1,3);
cube2.material.color.setHex(0xFF0000);

const cube3 = makeCube(1,3,1);
cube3.material.color.setHex(0x00FF00)

scene.add( cube1,cube2,cube3 );
let light = new THREE.DirectionalLight("0xFFFFFF",1);

scene.add(light);
camera.position.z = 5;
camera.position.x = 2;
camera.position.y = 1.5;


light.position.set(camera.position.x,camera.position.y,camera.position.z);

function animate() {
	requestAnimationFrame( animate );

    cube1.rotation.x += .01;
    cube1.rotation.y -= .04;

    cube2.rotation.x -= .09;
    cube2.rotation.y += .01;

    cube3.rotation.x -= .03;
    cube3.rotation.y += .01;


	renderer.render( scene, camera );
}





animate();


