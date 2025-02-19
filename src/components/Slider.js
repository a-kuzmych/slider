import * as THREE from 'three';
import { SliderTooltip } from './SliderTooltip';

export class Slider {
  constructor(scene, camera, images, spacing = 2) {
    this.scene = scene;
    this.camera = camera;
    this.spacing = spacing;

    this.textures = [];
    this.planes = [];
    this.pointer = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.tooltip = new SliderTooltip();

    this.loadTextures(images);
    this.addMouseEvents();
  }

  loadTextures(images) {
    const loader = new THREE.TextureLoader();
    const totalSlides = images.length;
    this.textures = images.map(img => loader.load(img));

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
    });
  }

  addMouseEvents() {
    window.addEventListener('mousemove', (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.pointer, this.camera);
      const intersects = this.raycaster.intersectObjects(this.planes);

      if (intersects.length > 0) {
        this.tooltip.show(event.clientX, event.clientY, 'MORE INFO');
      } else {
        this.tooltip.hide();
      }
    });
  }
}
