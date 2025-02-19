import * as THREE from 'three';

export class Scene {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.camera.position.z = 6;
    
    this.targetX = 0;
    this.targetY = 0;
    this.smoothFactor = 0.1;

    this.mouseX = 0;
    this.mouseY = 0;

    this.setupEventListeners();
    this.render();
  }

  setupEventListeners() {
    window.addEventListener("mousemove", (event) => {
      let newX = (event.clientX / window.innerWidth - 0.5) * 2;
      let newY = (event.clientY / window.innerHeight - 0.5) * 2;

      this.mouseX = THREE.MathUtils.lerp(this.mouseX, newX, 0.05);
      this.mouseY = THREE.MathUtils.lerp(this.mouseY, newY, 0.05);
    });

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      }, 100);
    });
  }

  render() {
    this.targetX = THREE.MathUtils.lerp(this.targetX, this.mouseX * 2, this.smoothFactor);
    this.targetY = THREE.MathUtils.lerp(this.targetY, -this.mouseY * 2, this.smoothFactor);

    this.camera.position.x = this.targetX;
    this.camera.position.y = this.targetY;

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
  }
}
