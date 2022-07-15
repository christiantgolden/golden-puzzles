class Coord {
  hasMine;
  minesNearby;
  x;
  y;
  constructor(hasMine = false, x, y) {
    this.hasMine = hasMine;
    this.minesNearby = 0;
    this.x = x;
    this.y = y;
  }
  incrementMinesNearby() {
    this.minesNearby++;
  }
}
