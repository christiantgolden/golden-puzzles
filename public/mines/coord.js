class Coord {
  isFlagged;
  hasMine;
  minesNearby;
  x;
  y;
  constructor(hasMine = false) {
    this.hasMine = hasMine;
    this.minesNearby = 0;
  }
  incrementMinesNearby() {
    this.minesNearby++;
  }
  setHasMine(hasMine) {
    this.hasMine = hasMine;
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
