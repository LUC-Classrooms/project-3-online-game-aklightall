/**
 * Project 3 versions 0-4 - 2D Web Game
 * Name: Ariana Lighthall
 * 
 * Use this template to get started creating a simple 2D game for the web using P5.js. 
 */
var gameState = "splash" ;
var player1;
var gameTimer; // time the game play
var testBox; // a box to preview on the splash screen
var dropTimer; // regulate box drops
var presents = new Array(0); // an empty array called "presents"

function setup() {

  createCanvas(600, 400);
  player1 = new Player (width/2, height * 4/5);
  console.log(player1);
  gameTimer = new Timer (10000); // 10 seconds for now 
  testBox = new Box(width/2, height/3);

  dropTimer = new Timer(1000);
  dropTimer.start(); // Start the drop timer

}

function draw() {
  background(200);
  /* un-comment each line to see it work */
  //splash(); // call the splash screen function (below)
  //play(); // call the play screen function (below)
  //gameOver(); // call the gameOver screen function (below)
  switch(gameState){
    case "splash":
      splash();
      break;
      case "play" :
        play();
        break;
        case "gameOver" :
          gameOver ();
          break;
          default :
          console.log("no match found");


  }
}

function splash() {
  // this is what you would see when the game starts
  background(200);
  textAlign(CENTER);
  textSize(16);
  text("Let's Play a Game!", width / 2, height / 2);
  textSize(12);
 text("(click the mouse to continue)", width / 2, height / 2 + 30);
 testBox.display(5);
 testBox.spin(15);
  
}

function play() {
  // this is what you see when the game is running 
  background(0, 200, 0); // green background
  fill(0, 0, 200)
  textAlign(CENTER);
  textSize(16);
  //text("This is where the Game happens", width / 2, height / 2);
  // player1.x = mouseX;
  player1.display();
  player1.move();
  if(gameTimer.isFinished()){
    gameState = "gameOver" ;
  }

    if(dropTimer.isFinished()) {
      let p = new Box(random(width), -40);
      // new box, anywhere across the width of the canvas, but 40px above the canvas
      presents.push(p); // add object 'p' to the 'presents' Array
      dropTimer.start(); // restart timer for next drop
  }


  // Loop through the presents array and display, move, and spin each present
  for (let i = 0; i < presents.length; i++) {
    presents[i].display();
    presents[i].move();
    presents[i].spin();

    if(presents[i].y > height) {
      // present went below the canvas
      presents.splice(i, 1);
      // remove from array
    } else {
      // Calculate distance between present and player
      let d = dist(presents[i].x, presents[i].y, player1.x, player1.y);
  
      // Check for collision
      if (d < 50) {
        // Remove the present from the array
        presents.splice(i, 1);
        // Perform any other actions you want when a collision occurs
      }
    }
  }


 
  text("remaining time: " + Math.trunc((gameTimer.time - gameTimer.elapsedTime)/1000), width/2, 40);
}


function gameOver() {
  // this is what you see when the game ends
  background(0);
  fill(255, 0, 0)
  textAlign(CENTER);
  textSize(16);
  text("Game Over!", width / 2, height / 2);
}

function mousePressed() {

  console.log("click!");
  if(gameState == "splash"){
    gameState = "play";
    gameTimer.start(); // start the timer 
  } else if (gameState == "play"){
    gameState = "gameOver";
  } else if (gameState == "gameOver"){
  gameState = "splash";
  if (gameState == "splash") {
    gameState = "play"; // go to the play() screen
    gameTimer.start(12); // start the game timer
    dropTimer.start(15); // start the drop timer for presents
  }
}
console.log(gameState);

}
