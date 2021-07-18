import * as THREE from "three";
import {GUI} from "dat.gui";
import {Line, Material, Mesh, MeshBasicMaterial, MeshPhongMaterial, PlaneGeometry} from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {LineGeometry} from "three/examples/jsm/lines/LineGeometry";

let canvas = document.querySelector("#c") as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({canvas});
const gui = new GUI();
const camera = new THREE.PerspectiveCamera( 40, 2, 0.1, 1000);
const controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(0, 5, 0);
controls.update();


camera.position.set(0,20,200);
camera.lookAt(0,0,0)

const scene = new THREE.Scene();

const plane = new THREE.Mesh(new PlaneGeometry(100,100,256,256),new MeshBasicMaterial({color:0x449900, wireframe: true}));
scene.add(plane);

{
const planePositions = plane.geometry.getAttribute("position");
planePositions.setXYZ(1,10,30,40);

plane.geometry.attributes.position.needsUpdate = true;
}
{

    let light = new THREE.DirectionalLight("0xFFFFFF",1);
    scene.add(light);
}



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


function render() {


    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
}

requestAnimationFrame(render);


