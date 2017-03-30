    var door1; 
    var door2; 
    var door3;
    var question;
    var wins = 0;
    var prize_door;
    var current_go = 0;
    var clicks = 0;
    var disable;

    function main() {

         door1 = document.getElementById("door1");
         door2 = document.getElementById("door2");
         door3 = document.getElementById("door3");
         question = document.getElementById("question");

        // don't remove me
        setUpGame();

        door1.addEventListener("click", function (event) { doorClicked(event, door1, 1) });
        door2.addEventListener("click", function (event) { doorClicked(event, door2, 2) });
        door3.addEventListener("click", function (event) { doorClicked(event, door3, 3) });
        document.getElementById("reset").addEventListener("click", setUpGame);
    }

function setUpGame() {
    disable = false;
    prize_door = getRandNumber(1, 3);

    door1.src = "img/door.png";
    door2.src = "img/door.png";
    door3.src = "img/door.png";

    question.innerHTML = "Pick a door!!!!!!!";
}

function doorClicked(event, door, doorNumber) {
    if (disable){
        return;
    }

    clicks++;
    var odd = clicks % 2 != 0;

    if (odd) {
        current_go++;
        var randomDoorNumber;

        if (doorNumber != prize_door) {
            switch (doorNumber + prize_door) {
                case 3: randomDoorNumber = 3; break;
                case 4: randomDoorNumber = 2; break;
                case 5: randomDoorNumber = 1; break;
            }
        }
        else {
            randomDoorNumber = getRandNumberWithExclude(1, 3, doorNumber);
        }

        var randomDoor = document.getElementById("door" + randomDoorNumber);
        randomDoor.src = "img/goat.png";
        question.innerHTML = "Do you want to switch?";
    }
    else {
        if (prize_door == doorNumber) {
            door.src = "img/car.png";

            wins++;
            document.getElementById("win").innerHTML = wins + " Wins";
            question.innerHTML = "You won!";
        }
        else {
            door.src = "img/goat.png";
        }

        disable = true;
    }

    var win_percent = (wins / current_go) * 100;
    document.getElementById("goes").innerHTML = current_go + " Goes";
    document.getElementById("win_percent").innerHTML = win_percent.toFixed(1) + "% Wins";
}

function getRandNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

function getRandNumberWithExclude(min, max, exclude) {
    var randNumb;

    do
    {
        randNumb = parseInt(getRandNumber(min, max));
    }while (randNumb == exclude);

    return randNumb;
}