document.addEventListener("DOMContentLoaded",ahorcado);



function ahorcado(){


    //Create Guess Button
    let guessButton = document.querySelector("#guessButton");
    guessButton.addEventListener("click",guess);

    //Gets HTML element which draws the current player array
    let currentWordDisplay = document.querySelector("#currentWord");

    let hitsCounter = document.querySelector("#hits");
    let missesCounter = document.querySelector("#misses");


    let infoBox = document.querySelector("#info");

    let render = document.querySelector("#render");
    

    //Gets the word to guess
    let solution = getWord();

    //Creates a hyphen array of the same length as the word array
    let currentWord = createPlayerArray(solution.length);



    //Render the hyphen array
    drawCurrentWord();


    //Player stats
    let hits = 0;
    let misses = 0;


  

  
    console.log("Word:")
    console.log(solution);

    console.log("Current State:");
    console.log (currentWord);






    
    function getCorrectIndexs(letter){
        let indexs = [];

        for (let i = 0; i < solution.length; i++){
            if (solution[i].includes(letter)){
                indexs.push(i);
            }
        }

        return indexs;
    }

    function guess(){
        let letter = prompt("Type a letter.").toUpperCase();
        console.log ("Trying to guess the letter " + letter);

        

        if (currentWord.includes(letter)){
            console.log("ERROR: DUPLICATE LETTER");
            infoBox.textContent = "Letra ya ingresada";
            return;
        }

        let indexs = getCorrectIndexs(letter);

        if (indexs.length){


                console.log("LETTER FOUND IN INDEX:");
                console.log (indexs);


                indexs.forEach(index =>{
                    currentWord[index] = letter;
                })

                drawCurrentWord();
                addHit();
                infoBox.textContent = "Correct";
        

        }
        else
    {
            console.log("ERROR, letter not in array");
            addMiss();
            infoBox.textContent = "Wrong letter";
        }


        console.log("Word:")
        console.log(solution);
    
        console.log("Current State:");
        console.log (currentWord);
    
    
        checkGameState();
    }


    function checkGameState(){
        if (misses > 5){
            infoBox.textContent = "PERDISTE PUTA";
        }
    }



    function addHit(){
        hits+=1;
        drawHits();
        animateTransition(currentWordDisplay,"pulse");
    }

    function addMiss(){
        if (misses < 6){
            misses+=1;
            drawMisses();
            render.src = "img/" + misses + ".png";
            animateTransition(render,"blurred");
        }
    }

    function animateTransition(element,transitionName){
        element.classList.toggle(transitionName);
        setTimeout(()=>{
            element.classList.toggle(transitionName);  
        },250);
    }

    function drawHits(){
        hitsCounter.innerHTML = "Hits: " + hits;
    }

    function drawMisses(){
        missesCounter.innerHTML = "Misses: " + misses;
    }

    function drawCurrentWord(){
        currentWordDisplay.textContent = currentWord;
        currentWordDisplay.textContent = currentWordDisplay.textContent.replace(/,/g, '');
    }
   
    
    
    function getWord(){
        let word = prompt("Type the word to guess").toUpperCase();
        let array = word.split('');
        return array;
    }
    
    
    function createPlayerArray(length){
        let array = [];
    
        for (let i = 0; i < length; i++){
            array.push("-");
        }
    
    
        return array;
    }
    
}



