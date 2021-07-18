import * as THREE from "three";
import {GUI} from "dat.gui";
import {Material, Mesh} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

let canvas = document.querySelector("#c") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({canvas});
const gui = new GUI();
const camera = new THREE.PerspectiveCamera( 40, 2, 0.1, 1000);
const controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();


camera.position.set(0,50,0);
camera.up.set(0,0,1);
camera.lookAt(0,0,0);

const scene = new THREE.Scene();

{

    let light = new THREE.PointLight("0xFFFFFF",3);
    scene.add(light);
}

const objects : THREE.Object3D[] =[];

const sphereGeometry = new THREE.SphereGeometry(1,6,6);
const solarSystem = new THREE.Object3D();
scene.add(solarSystem)
objects.push(solarSystem);

const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMesh = new THREE.Mesh(sphereGeometry,sunMaterial);
sunMesh.scale.set(5,5,5);
solarSystem.add(sunMesh);
objects.push(sunMesh);

const earthOrbit = new THREE.Object3D();
earthOrbit.position.x=10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthOrbit.add(earthMesh);
objects.push(earthMesh);


const moonOrbit = new THREE.Object3D();
moonOrbit.position.x= 2;
earthOrbit.add(moonOrbit);
objects.push(moonOrbit);

const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});

const moonMesh = new THREE.Mesh(sphereGeometry,moonMaterial);
moonMesh.scale.set(0.5,0.5,0.5)
moonOrbit.add(moonMesh);
objects.push(moonMesh);



class AxisGridHelper{
    private grid: THREE.GridHelper;
    private axes: THREE.AxesHelper;
    private _visible: boolean;

    constructor(node: THREE.Object3D, units: number | undefined) {
        const axes = new THREE.AxesHelper();
        const axesMaterial = axes.material as THREE.Material;
        axesMaterial.depthTest = false;
        axes.renderOrder = 2;
        node.add(axes);

        const grid = new THREE.GridHelper(units,units);
        const gridMaterial = grid.material as THREE.Material;
        gridMaterial.depthTest = false;
        grid.renderOrder = 1;
        node.add(grid);

        this.grid = grid;
        this.axes = axes;
        this._visible = this.grid.visible;
    }

    get visible() : boolean{
        return this._visible;
    }

    set visible(v:boolean){
      this._visible = v;
      this.grid.visible = v;
      this.axes.visible = v;
    }


}


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


function makeAxisGrid(node :THREE.Object3D, label: string, units?: number) {
    const helper = new AxisGridHelper(node, units);
    gui.add(helper, 'visible').name(label);
}

makeAxisGrid(solarSystem, 'solarSystem', 25);
makeAxisGrid(sunMesh, 'sunMesh');
makeAxisGrid(earthOrbit, 'earthOrbit');
makeAxisGrid(earthMesh, 'earthMesh');
makeAxisGrid(moonOrbit, 'moonOrbit');
makeAxisGrid(moonMesh, 'moonMesh');

function render() {


    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
        obj.rotation.y += .01;
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);


