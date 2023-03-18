let cached = 0;
let displayNumber = 0;
let action = null;

let displayController = document.querySelector(".center-vertical");

let digitTiles = document.querySelectorAll(".digit");
let operatorTiles = document.querySelectorAll(".operator");
let clear = document.querySelector(".clear");
let reduce = document.querySelector(".reduce");


function updateDisplay() {
    console.info(`Display number has changed: ${displayController.innerText} -> ${displayNumber}`)
    displayController.innerText = displayNumber;
}

function clearButton() {
    // Display clean listener
    clear.addEventListener("click", () => {
        if (displayNumber != 0)
        {
            displayNumber = 0;
            updateDisplay();
        }
    });
    
    clear.addEventListener("mousedown", () => {
        clear.style.backgroundColor = "#B8B8B8";
    });
    clear.addEventListener("mouseup", () => {
        clear.style.backgroundColor = "#F7F5F6";
    });
    clear.addEventListener("mouseout", () => {
        clear.style.backgroundColor = "#DEDEE2";
    });
    clear.addEventListener("mouseover", () => {
        clear.style.backgroundColor = "#F7F5F6";
    });
}

function reduceButton() {
    // Display pop listener
    reduce.addEventListener("click", () => {
        if (displayNumber != 0)
        {
            displayNumber = Math.floor(displayNumber / 10);
            updateDisplay();
        }
    });

    reduce.addEventListener("mousedown", () => {
        reduce.style.backgroundColor = "#B8B8B8";
    });
    reduce.addEventListener("mouseup", () => {
        reduce.style.backgroundColor = "#F7F5F6";
    });
    reduce.addEventListener("mouseout", () => {
        reduce.style.backgroundColor = "#DEDEE2";
    });
    reduce.addEventListener("mouseover", () => {
        reduce.style.backgroundColor = "#F7F5F6";
    });
}

function digitButtons() {
    // Digit tiles listener
    for (const tile of digitTiles) {
        console.log(tile.value);

        tile.addEventListener("click", function () {
            displayNumber = (10 * displayNumber) + Number.parseInt(tile.value);
            updateDisplay();
        });
        
        tile.addEventListener("mousedown", () => {
            tile.style.backgroundColor = "#B8B8B8";
        });
        tile.addEventListener("mouseup", () => {
            tile.style.backgroundColor = "#F7F5F6";
        });
        tile.addEventListener("mouseout", () => {
            tile.style.backgroundColor = "#DEDEE2";
        });
        tile.addEventListener("mouseover", () => {
            tile.style.backgroundColor = "#F7F5F6";
        });
    }
}

function updateCache() {
    switch (action) {
        case "+":
        {
            cached += displayNumber;
            console.debug("+");
            break;
        }
    
        case "-":
        {   
            cached -= displayNumber;
            console.debug("-");
            break;
        }
    
        case "*":
        {
            cached *= displayNumber;
            console.debug("*");
            break;
        }
    
        case "/":
        {
            if (displayNumber != 0) {
                cached /= displayNumber;
            }
            console.debug("/");
            break;
        }
    
        default:
        {
            break;
        }
    }
}

function useOperator(o) {
    if (o === "=")
    {
        if (action == null) {
            return;
        }

        updateCache();
        action = null;
        displayNumber = cached;
        cached = 0;
    }
    else
    {
        if (displayNumber === 0)
        {
            action = o;
            return;
        }
    
        if (cached === 0)
        {
            cached = displayNumber;
        }
        else
        {
            updateCache();
        }
        action = o;
        displayNumber = 0;
    }
    updateDisplay();
}

function operatorButtons() {
    // Operator tiles listener
    for (const tile of operatorTiles) {
        console.log(tile.value);

        tile.addEventListener("click", function () {
            useOperator(tile.value);
        });

        tile.addEventListener("mousedown", () => {
            tile.style.backgroundColor = "#E08946";
        });
        tile.addEventListener("mouseup", () => {
            tile.style.backgroundColor = "#E7AF7B";
        });
        tile.addEventListener("mouseout", () => {
            tile.style.backgroundColor = "#E69351";
        });
        tile.addEventListener("mouseover", () => {
            tile.style.backgroundColor = "#E7AF7B";
        });
    }
}

function init() {
    clearButton();
    reduceButton();
    digitButtons();
    operatorButtons();
}

init();