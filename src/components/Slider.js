import * as THREE from "three";
import { SliderTooltip } from "./SliderTooltip";

export class Slider {
  constructor(scene, camera, images, spacing = 2) {
    this.scene = scene;
    this.camera = camera;
    this.spacing = spacing;

    this.textures = [];
    this.planes = [];
    this.titles = [];
    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.tooltip = new SliderTooltip();

    this.loadTextures(images);
    this.addMouseEvents();
    this.startAnimationLoop();
  }

  loadTextures(images) {
    const loader = new THREE.TextureLoader();
    const totalSlides = images.length;
    this.textures = images.map((img) => loader.load(img));

    this.init(totalSlides);
  }

  init(totalSlides) {
    this.textures.forEach((texture, i) => {
      const geometry = new THREE.PlaneGeometry(10.5, 7);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const plane = new THREE.Mesh(geometry, material);

      plane.position.x = (i - Math.floor(totalSlides / 2)) * this.spacing;
      this.scene.add(plane);
      this.planes.push(plane);

      const title = document.createElement("div");
      title.className = "slider-title";
      title.innerText = `TITLE ${i}`;
      document.body.appendChild(title);
      this.titles.push(title);
    });
  }

  updateVisibility() {
    this.planes.forEach((plane, index) => {
      const position = plane.position.clone();
      position.project(this.camera);

      const screenX = (position.x * 0.5 + 0.5) * window.innerWidth;
      const screenY = (1 - position.y * 0.5) * window.innerHeight;
      const isVisible = position.z < 1 && position.z > -1;

      if (isVisible && Math.abs(position.x) < 0.4) {
        this.titles[index].classList.add("visible");
        this.titles[index].style.left = `${screenX - 100}px`;
        this.titles[index].style.top = `${screenY - 150}px`;
      } else {
        this.titles[index].classList.remove("visible");
      }
    });
  }

  addMouseEvents() {
    window.addEventListener("mousemove", (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(this.planes);

      if (intersects.length > 0) {
        this.tooltip.show(event.clientX, event.clientY, "MORE INFO");
      } else {
        this.tooltip.hide();
      }
    });
  }

  startAnimationLoop() {
    const animate = () => {
      this.updateVisibility();
      requestAnimationFrame(animate);
    };
    animate();
  }
}
