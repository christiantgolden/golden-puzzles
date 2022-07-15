class StarBoard {
  stars;
  cells;
  constructor() {
    this.stars = [];
    this.cells = [];
  }
  generateBlankBoard() {
    for (let i = 0; i < 16; i++) {
      this.stars.push(new Star(i));
    }
  }
}
