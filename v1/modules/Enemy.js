class Enemy {
    constructor(posx, posy, velx, vely) {
        this.pos = createVector(posx, posy)
        this.vel = createVector(velx, vely)
        this.r = 5
    }

    update() {
        this.pos.add(this.vel);
    }

    show() {
        fill(255);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
    }

    offscreen() {
        if (this.pos.x <= 0 - 40 ||
            this.pos.x >= width + 40 ||
            this.pos.y <= 0 - 40 ||
            this.pos.y >= height + 40) {
            // console.log("spliced")
            return true;
        } else return false;
    }
}