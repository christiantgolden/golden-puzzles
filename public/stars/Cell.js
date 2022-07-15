class Cell {
  x;
  y;
  availableNumbers;
  connectedStars;
  designatedNumber;
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8];
    this.connectedStars = [];
    for (let i = 0; i < this.connectedStars.length; i++) {
      for (let j = 0; j < this.connectedStars[i].collectedNumbers.length; j++) {
        this.availableNumbers.splice(
          this.connectedStars[i].collectedNumbers[j],
          1
        );
      }
    }
  }
  designateRandomNumber() {
    this.designatedNumber =
      this.availableNumbers[
        Math.floor(Math.random() * this.availableNumbers.length)
      ];
  }
  designateNumber(n) {
    this.designatedNumber = n;
  }
  addConnectedStar(star) {
    /*TODO: the Star object should pass itself into the Cell's addConnectedStar method */
    this.connectedStars.push(star);
  }
  removeAvailableNumber(n) {
    this.availableNumbers.splice(this.availableNumbers.indexOf(n), 1);
  }
  setX(x) {
    this.x = x;
  }
  setY(y) {
    this.y = y;
  }
  setXY(x, y) {
    this.x = x;
    this.y = y;
  }
}
