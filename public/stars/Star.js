class Star {
  collectedNumbers;
  connectedCells;
  x;
  y;
  num;
  remainingNumbers;
  constructor(num) {
    this.collectedNumbers = [];
    this.remainingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.num = num; //should be number 0-15
    switch (num) {
      case 0:
        this.x = 1;
        this.y = 1;
        break;
      case 1:
        this.x = 3;
        this.y = 1;
        break;
      case 2:
        this.x = 5;
        this.y = 1;
        break;
      case 3:
        this.x = 7;
        this.y = 1;
        break;
      case 4:
        this.x = 1;
        this.y = 3;
        break;
      case 5:
        this.x = 3;
        this.y = 3;
        break;
      case 6:
        this.x = 5;
        this.y = 3;
        break;
      case 7:
        this.x = 7;
        this.y = 3;
        break;
      case 8:
        this.x = 1;
        this.y = 5;
        break;
      case 9:
        this.x = 3;
        this.y = 5;
        break;
      case 10:
        this.x = 5;
        this.y = 5;
        break;
      case 11:
        this.x = 7;
        this.y = 5;
        break;
      case 12:
        this.x = 1;
        this.y = 7;
        break;
      case 13:
        this.x = 3;
        this.y = 7;
        break;
      case 14:
        this.x = 5;
        this.y = 7;
        break;
      case 15:
        this.x = 7;
        this.y = 7;
        break;
    }
    this.connectedCells = [
      { x: this.x - 1, y: this.y - 1, designatedNumber: 0 }, //topleft
      { x: this.x - 1, y: this.y, designatedNumber: 0 }, //left
      { x: this.x - 1, y: this.y + 1, designatedNumber: 0 }, //downleft
      { x: this.x, y: this.y + 1, designatedNumber: 0 }, //down
      { x: this.x + 1, y: this.y + 1, designatedNumber: 0 }, //downright
      { x: this.x + 1, y: this.y, designatedNumber: 0 }, //right
      { x: this.x + 1, y: this.y - 1, designatedNumber: 0 }, //upright
      { x: this.x, y: this.y - 1, designatedNumber: 0 }, //up
    ];
    for (let i = 0; i < this.connectedCells.length; i++) {
      if (this.connectedCells[i].designatedNumber > 0) {
        this.addCollectedNumber(this.connectedCells[i].designatedNumber);
        this.removeRemainingNumber(this.connectedCells[i].designatedNumber);
      }
    }
  }
  removeRemainingNumber(n) {
    this.remainingNumbers.splice(this.remainingNumbers.indexOf(n), 1);
  }
  addCollectedNumber(n) {
    this.collectedNumbers.push(n);
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
