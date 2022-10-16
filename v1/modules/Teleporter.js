class Teleporter {
    constructor(x, y, w, h) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
   }

    show(hexCode) {
        fill(hexCode)
        rectMode(RADIUS)
        rect(this.x, this.y, this.w, this.h)
    }

}