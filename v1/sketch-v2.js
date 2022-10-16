let font,
    fontsize = 20,
    visitor,
    enemies = [],
    teleporterTop,
    teleporterBottom,
    teleporterRight,
    teleporterLeft,
    gameState;

////////////////////////////////////////////////
//SETTING OUT THE TEXT FOR EACH SCENE//////////
////////////////////////////////////////////////

function drawWords(object) {
    textSize(object.size);
    fill(object.colour);
    text(object.text, width * object.position.xperc, height * object.position.yperc);
}

const openingScene = {
    openingTitle: {
        text: "Welcome ... have a bounce around",
        size: 40,
        position: {
            xperc: 0.5,
            yperc: 0.4
        },
        colour: '#ffffff'
    },
    openingSubtitle: {
        text: "Move yourself using the arrow keys",
        size: 15,
        position: {
            xperc: 0.5,
            yperc: 0.45,
        },
        colour: '#c2acba'
    },
    bottomText: {
        text: "Employers/professionals please come down here",
        size: 20,
        position: {
            xperc: 0.5,
            yperc: 0.95,
        },
        colour: '#c2acba'
    },
    topText: {
        text: "John (author) you can come here to keep track of your life",
        size: 20,
        position: {
            xperc: 0.5,
            yperc: 0.05,
        },
        colour: '#c2acba',
        navigator: true
    }
}


//////////////////////////////////////////
//MOVING THE VISITOR/////////////////////
//////////////////////////////////////////

//Moving the visitor
function keyPressed() {
    if (keyCode === UP_ARROW && keyIsPressed) {
        visitor.leap(-1);
    } else if (keyCode === DOWN_ARROW && keyIsPressed) {
        visitor.leap(1);
    } else if (keyCode === LEFT_ARROW && keyIsPressed) {
        visitor.move('left');
    } else if (keyCode === RIGHT_ARROW && keyIsPressed) {
        visitor.move('right');
    } else false;

    //if i wanted to hold the key down to move, use:
    // document.addEventListener("keydown", event => {
    //     if (event.key == 37 (which is the left arrow)) {
    //         blah blah blah
    //     }
    // })
}


//////////////////////////////////////////
//SET UP///////
//////////////////////////////////////////


function preload() {
    font = loadFont('assets/AreaKilometer50-gxmEq.otf')
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    textFont(font);
    textSize(fontsize);
    textAlign(CENTER, CENTER);

    //initialising objects from classes
    visitor = new Visitor(width / 2, height / 2, 0, 0, 0, 0);
    gameState = new GameState();
    teleporterTop = new Teleporter(width / 2, 0 + 12, 280, 12);
    teleporterBottom = new Teleporter(width / 2, height - 12, 280, 12);
    teleporterRight = new Teleporter(width - 12, height/2, 12, 200)
    teleporterLeft = new Teleporter(0 + 12, height/2, 12, 200)

}

function draw() {
    background(0);

    //Including each game state
    if (gameState.start == true) {
        drawOpeningScene();
    } else if (gameState.top == true) {
        drawtopScene();
    } else if (gameState.bottom == true) {
        drawBottomScene();
    } else if (gameState.right == true) {
        drawRightScene();
    } else if (gameState.left == true) {
        drawLeftScene();
    }

    //Teleporting visitor
    if (visitor.hits(teleporterTop) && (gameState.start == true || gameState.bottom == true)) {
        gameState.change("up")
        visitor.pos.y = height - 24 - visitor.r - 10
    }
    if (visitor.hits(teleporterBottom) && (gameState.start == true || gameState.top == true)) {
        gameState.change("down")
        visitor.pos.y = 0 + 24 + visitor.r + 10
    }
    if (visitor.hits(teleporterRight) && (gameState.start == true || gameState.left == true)) {
        gameState.change("right")
        visitor.pos.x = 0 + 24 + visitor.r + 10
    }
    if (visitor.hits(teleporterLeft) && (gameState.start == true || gameState.right == true)) {
        gameState.change("left")
        visitor.pos.x = width - 24 - visitor.r - 10
    }
}


//////////////////////////////////////////
//OPENING SCENE
//////////////////////////////////////////

function drawOpeningScene() {

    //draw teleporters
    teleporterTop.show('#ff0055')
    teleporterBottom.show('#ff0055')
    teleporterRight.show('#ff0055')
    teleporterLeft.show('#ff0055')

    //creating new enemies
    if (frameCount % 120 == 0) {
        for (i = 0; i < 12; i++) {
            enemies.push(new Enemy( //20, 20, random(-1, 1), random(-1, 1))
                random([random(-20, 0), random(width, width + 20)]),
                random([random(-20, 0), random(height, height + 20)]),
                random(-1, 1),
                random(-1, 1)
            ))
        }
    }

    //showing, moving and deleting enemies
    for (i = enemies.length - 1; i >= 0; i--) {
        enemies[i].update();
        enemies[i].show();
        if (enemies[i].offscreen()) {
            enemies.splice(i, 1)
        }
    }

    //draw text
    drawWords(openingScene.openingTitle);
    drawWords(openingScene.openingSubtitle);
    drawWords(openingScene.bottomText);
    drawWords(openingScene.topText);

    //draw visitor
    visitor.show();
    visitor.update();
    visitor.bounce();
}


//////////////////////////////////////////
//TOP SCENE 
//////////////////////////////////////////

function drawtopScene() {
    teleporterBottom.show('#ff0055')
    text("hello...", width / 2, height / 2)
    visitor.show();
    visitor.update();
    visitor.bounce();
}


//////////////////////////////////////////
//BOTTOM SCENE 
//////////////////////////////////////////

function drawBottomScene() {

    teleporterTop.show('#ff0055')
    text("bottom screen here...", width / 2, height / 2)
    visitor.show();
    visitor.update();
    visitor.bounce();
}

//////////////////////////////////////////
//RIGHT SCENE 
//////////////////////////////////////////

function drawRightScene() {
   
    teleporterLeft.show('#ff0055')
    text("right screen over here...", width / 2, height / 2)
    visitor.show();
    visitor.update();
    visitor.bounce();
}

//////////////////////////////////////////
//LEFT SCENE 
//////////////////////////////////////////

function drawLeftScene() {
    teleporterRight.show('#ff0055')
    text("left screen over here...", width / 2, height / 2)
    visitor.show();
    visitor.update();
    visitor.bounce();
}
