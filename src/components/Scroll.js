import VirtualScroll from "virtual-scroll";

export class Scroll {
  constructor(slider, spacing = 11) {
    this.slider = slider;
    this.scroll = new VirtualScroll();
    this.scrollSpeed = 0;
    this.spacing = spacing;
    this.easing = 2;
    this.currentOffset = 0;

    this.scroll.on((event) => {
      this.scrollSpeed = Math.max(
        -5,
        Math.min(5, this.scrollSpeed + event.deltaY * 0.005)
      );
    });

    this.update();
  }

  update() {
    requestAnimationFrame(() => this.update());

    this.currentOffset += this.scrollSpeed;
    this.scrollSpeed *= 0.9;

    let totalWidth = this.spacing * this.slider.planes.length;

    this.slider.planes.forEach((plane, i) => {
      plane.position.x =
        ((((i * this.spacing + this.currentOffset) % totalWidth) + totalWidth) %
          totalWidth) -
        totalWidth / 2;
    });
  }
}
