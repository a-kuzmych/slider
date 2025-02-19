import { Scene } from "./components/Scene.js";
import { Slider } from "./components/Slider.js";
import { Scroll } from "./components/Scroll.js";

const scene = new Scene();
const images = [
  "./slide1.jpg",
  "./slide2.jpg",
  "./slide3.jpg",
  "./slide4.jpg",
  "./slide5.jpg",
  "./slide1.jpg",
  "./slide2.jpg",
  "./slide3.jpg",
  "./slide4.jpg",
  "./slide5.jpg",
];
const slider = new Slider(scene.scene, scene.camera, images);
new Scroll(slider);

function animate() {
  requestAnimationFrame(animate);
  scene.render();
}
animate();
