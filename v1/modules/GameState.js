class GameState {
    constructor() {
        this.start = true,
            this.top = false,
            this.bottom = false,
            this.left = false,
            this.right = false
    }

    change(event) {
        if (this.start == true && event == "up") {
            this.start = false;
            this.top = true;
        } else if (this.start == true && event == "down") {
            this.start = false;
            this.bottom = true;
        } else if (this.start == true && event == "left") {
            this.start = false;
            this.left = true;
        } else if (this.start == true && event == "right") {
            this.start = false;
            this.right = true;
        } else if (this.top == true && event == "down") {
            this.top = false;
            this.start = true;
        } else if (this.bottom == true && event == "up") {
            this.bottom = false;
            this.start = true;
        } else if (this.left == true && event == "right") {
            this.left = false;
            this.start = true;
        } else if (this.right == true && event == "left") {
            this.right = false;
            this.start = true;
        }
    }
}