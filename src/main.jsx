// eslint-disable-next-line no-unused-vars
import * as THREE from "three" 
import "../css/index.css"
// eslint-disable-next-line no-unused-vars
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import gsap from "gsap";

// eslint-disable-next-line no-unused-vars
const scene = new THREE.Scene()

// eslint-disable-next-line no-unused-vars
const geometry = new THREE.SphereGeometry(3,64,64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.5,
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh);


// eslint-disable-next-line no-unused-vars
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}


// eslint-disable-next-line no-unused-vars
const light =  new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0,10,10);
light.intensity=1.25
scene.add(light);



// eslint-disable-next-line no-unused-vars
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);


// eslint-disable-next-line no-unused-vars
const canvas = document.querySelector(".webgl");
// eslint-disable-next-line no-unused-vars
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);


// eslint-disable-next-line no-unused-vars
const controls = new OrbitControls(camera, canvas);
controls.enableDamping=true;
controls.enablePan=false;
controls.enableZoom=false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;


window.addEventListener('resize', () =>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height);
})

const loop = () =>{
  controls.update()
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop()


const t1 = gsap.timeline({defaults: { duration: 1 } })
t1.fromTo(mesh.scale, {z:0,x:0,y:0},{z:1, x:1, y:1})
t1.fromTo('nav', {y: "-100%"}, {y:"0%"})
t1.fromTo(".title", {opacity:0},{opacity:1})



// eslint-disable-next-line no-unused-vars
let mouseDown = false
// eslint-disable-next-line no-unused-vars
let rgb = []
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", ()=>(mouseDown=false))

// eslint-disable-next-line no-unused-vars
window.addEventListener('mousemove', (e)=>{
  if(mouseDown){
    rgb=[
      Math.round((e.pageX / sizes.width)*255),
      Math.round((e.pageY / sizes.height)*255),
      150,
    ]
    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    })
  }
});