
// global variabels for the pictures behind the doors. 
const beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
//const closedDoorPath = "sophie-dale-dJycgkec2p0-unsplash.jpg"
const closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
// to be assigned with random doors
let openDoor1, openDoor2, openDoor3, numClosedDoors = 3;
const startButton = document.getElementById('start'); // to change start button text if win or loss
// change img on click for door-frame 
let doorImage1 = document.getElementById("door1");
let doorImage2 = document.getElementById("door2");
let doorImage3 = document.getElementById("door3");
let currentlyPlaying = true; // avoid override loss to victory
// this function will generate a random number (0,1,2) number and assign a random door to botDoorPath 
const randomChoreDoorGenerator = () => {

    const choreDoor = Math.floor(Math.random() * numClosedDoors);
       // assign a random door to botDoorPath  
        if (choreDoor === 0) { 
            openDoor1 = botDoorPath;
            openDoor2 = beachDoorPath;
            openDoor3 = spaceDoorPath;
        } else if (choreDoor === 1) { 
            openDoor1 = spaceDoorPath;
            openDoor2 = botDoorPath;
            openDoor3 = beachDoorPath;
        } else { 
            openDoor1 = beachDoorPath;
            openDoor2 = spaceDoorPath;
            openDoor3 = botDoorPath;
        }
    
};  

const playDoor = door => {
    numClosedDoors--; // decrease number of doors on each click
    numClosedDoors === 0 ? gameOver('win') : isBot(door) ? gameOver() : "";
}



const gameOver = status => {
    // change text if user won 
    status === 'win' ? startButton.innerHTML = "You win! Play again?" : startButton.innerHTML = "GAME OVER! Play again?" ; 
    currentlyPlaying = false; //make sure that additional doors can’t be clicked after the ChoreBot door is clicked.
}

const isBot = door => door === botDoorPath ? true : false ; // check losing condition 
const isClicked = door => door === closedDoorPath ? false : true; // return false if the door not been clicked


// arrow function to simulate open door on click
    doorImage1.onclick = () => {
        if (!isClicked(doorImage1.src) && currentlyPlaying) {
             doorImage1.src = openDoor1; 
        playDoor(doorImage1.src); 
        }
  
    }
    doorImage2.onclick = () => {
       if (!isClicked(doorImage2.src) && currentlyPlaying) {
            doorImage2.src = openDoor2; 
        playDoor(doorImage2.src);
       }
     
    }

    doorImage3.onclick = () => {
        if (!isClicked(doorImage3.src) && currentlyPlaying) { 
            doorImage3.src = openDoor3;  
        playDoor(doorImage3.src);
        }
     
    }

    startButton.onclick = () => !currentlyPlaying ? startRound() : "" ;

    const startRound = () => {
        numClosedDoors = 3;
        doorImage1.src = doorImage2.src = doorImage3.src =closedDoorPath;
        startButton.innerHTML = "Good luck!";
        currentlyPlaying = true;
        randomChoreDoorGenerator();
    }
    startRound();
