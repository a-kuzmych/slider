export class SliderTooltip {
  constructor() {
    this.textElement = document.createElement("div");
    Object.assign(this.textElement.style, {
      position: "absolute",
      background: "rgba(0, 0, 0, 0)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "5px",
      display: "none",
      pointerEvents: "none",
    });
    document.body.appendChild(this.textElement);
  }

  show(x, y, text) {
    this.textElement.style.left = `${x + 10}px`;
    this.textElement.style.top = `${y + 10}px`;
    this.textElement.innerText = text;
    this.textElement.style.display = "block";
  }

  hide() {
    this.textElement.style.display = "none";
  }
}
