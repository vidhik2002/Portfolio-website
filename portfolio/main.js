import gsap from "https://cdn.skypack.dev/gsap";
import * as THREE from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
import * as dat from "https://cdn.skypack.dev/dat.gui";

// var controls = new OrbitControls(camera, renderer.domElement);
// console.log(controls)

// const gui = new dat.GUI();
const world = {
  plane: {
    width: 16,
    height: 18,
    widthSegments: 18,
    heightSegments: 17,
  },
};

// gui.add(world.plane, "width", 1, 20).onChange(generatePlane);

// gui.add(world.plane, "height", 1, 20).onChange(generatePlane);

// gui.add(world.plane, "widthSegments", 1, 20).onChange(generatePlane);

// gui.add(world.plane, "heightSegments", 1, 20).onChange(generatePlane);

//modularizing
function generatePlane() {
  planemesh.geometry.dispose();
  planemesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  );

  const { array } = planemesh.geometry.attributes.position;
  for (let i = 0; i < array.length; i++) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];

    array[i + 2] = z + Math.random();
  }
  const colors = [];
  for (let i = 0; i < planemesh.geometry.attributes.position.count; i++) {
    colors.push(0, 0.19, 0.4);
  }

  planemesh.geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(new Float32Array(colors), 3) //grouping of three
  );
}

//Scene,
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  innerWidth / innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

//injecting renderer using js
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);
new OrbitControls(camera, renderer.domElement);

//components of box mesh
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xf5f5f5 });
const mesh = new THREE.Mesh(boxGeometry, material);
// scene.add(mesh)

camera.position.z = 3;

//PLane Flatlighting
const planeGeometry = new THREE.PlaneGeometry(18, 17, 16, 18);
const planematerial = new THREE.MeshPhongMaterial({
  // color: 0x006994,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true,
});
console.log(planematerial);

const planemesh = new THREE.Mesh(planeGeometry, planematerial);
scene.add(planemesh);

const { array } = planemesh.geometry.attributes.position;
for (let i = 0; i < array.length; i++) {
  const x = array[i];
  const y = array[i + 1];
  const z = array[i + 2];

  array[i + 2] = z + Math.random();
}

const colors = [];
for (let i = 0; i < planemesh.geometry.attributes.position.count; i++) {
  colors.push(0, 0.19, 0.4);
}

planemesh.geometry.setAttribute(
  "color",
  new THREE.BufferAttribute(new Float32Array(colors), 3) //grouping of three
);

//Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 10);
scene.add(light);
const backlight = new THREE.DirectionalLight(0xffffff, 1);
backlight.position.set(0, 0, -10);
scene.add(backlight);

const raycaster = new THREE.Raycaster();
const mouse = {
  x: undefined,
  y: undefined,
};
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(planemesh);
  if (intersects.length > 0) {
    console.log("intersects");
    const { color } = intersects[0].object.geometry.attributes;
    color.setX(intersects[0].face.a, 1);
    color.setY(intersects[0].face.a, 1);
    color.setY(intersects[0].face.b, 1);
    color.setZ(intersects[0].face.c, 1);
    // color.setZ(intersects[0].face.a,1)
    // color.setX(intersects[0].face.b,1)
    // color.setZ(intersects[0].face.b,1)
    // color.setX(intersects[0].face.c,1)
    // color.setY(intersects[0].face.c,1)
    color.needsUpdate = true;

    const initialColor = {
      r: 0,
      g: 0.19,
      b: 0.4,
    };
    const hoverColor = {
      r: 0,
      g: 0,
      b: 0.9,
    };
    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      onUpdate: () => {
        color.setX(intersects[0].face.a, hoverColor.r);
        color.setY(intersects[0].face.a, hoverColor.r);
        color.setY(intersects[0].face.b, hoverColor.g);
        color.setZ(intersects[0].face.c, hoverColor.b);
      },
    });
  }
  // mesh.rotation.x += 0.1
  // mesh.rotation.y += 0.1
  // planemesh.rotation.x += 0.01
  // planemesh.rotation.y += 0.01
}
animate();

addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -((event.clientY / innerHeight) * 2 - 1);
  console.log(mouse);
});



