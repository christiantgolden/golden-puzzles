class Coord {
  isFlagged;
  hasBomb;
  bombsNearby;
  x;
  y;
  constructor(hasBomb = false) {
    this.hasBomb = hasBomb;
    this.bombsNearby = 0;
  }
  incrementBombsNearby() {
    this.bombsNearby++;
  }
  setHasBomb(hasBomb) {
    this.hasBomb = hasBomb;
  }
  setX(x) {
    this.x = x;
  }
  setY(y) {
    this.y = y;
  }
  setFlag(isFlagged) {
    this.isFlagged = isFlagged;
  }
}
