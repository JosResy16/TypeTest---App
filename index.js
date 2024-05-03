
//Random quotes api
const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=110";
// Inputs
const quoteSection = document.querySelector('.citas');
const userInput = document.getElementById("text-area");

//displays
const displayTime = document.querySelector('.time');
const displayErrores = document.querySelector('.errores');
const displayVelocidad = document.getElementById("velocidad");
const displayPresicion = document.getElementById("presicion");
const resultados = document.getElementById('results');

//Botones
const btnVolver = document.getElementById("volverbtn");
const btnStart = document.getElementById("start-test");
const btnEndTest = document.getElementById("end-test");


let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;

// Mostrar Cita Random & Segmentar Cita Por Caracteres
const renderNewQuote = () => {
    fetch(quoteApiUrl).then(response => response.json()).then
    (json => {
        
        let quote = json.content;
        

        let arr = quote.split("").map((value) => {
            return "<span class='quote-chars'>" + value + "</span>";
        });

        quoteSection.innerHTML += arr.join("");

    });
}


    //Logic to compare input words with quote
userInput.addEventListener('input' , () => {
    let quoteCharsNode = document.querySelectorAll('.quote-chars');
    let quoteChars = Array.apply(null , quoteCharsNode);
    quoteChars = Array(quoteChars);

    let userInputChars = userInput.value.split('');

    // Creando un array con cada uno de los caracteres de la cita y el input
    // del usuario para poder compararlos más adelante

    quoteChars[0].forEach((char , index) => {

        if (char.innerText == userInputChars[index]){
            // Si concide la letra se coloca color ver(succes)
            char.classList.add('succes');
        } 
        else if (userInputChars[index] == null){
        // si es nulo se queda sin color (ni verde ni rojo)
            if (char.classList.contains("succes")){
                char.classList.remove('succes');
            } else {
                char.classList.remove('fail');
            }
        }
        else {
        // para los caracteres que sean distintos se asegura que contengan la clase
        // fail y se suma una unidad a los errores
            if(!char.classList.contains("fail")){
                mistakes++;
                char.classList.add('fail');
            };
            displayErrores.innerText = mistakes;
        }
    
        let check = quoteChars[0].every((element) => {
            return element.classList.contains('succes');
        })


        if(check){displayResult() }
    })
    
})

function upDatetimer(){
    if(time == 0){
        displayResult();
    }
    else {
        displayTime.innerText = --time + "s";
    };
};

function timeReduce(){
    timer = setInterval(upDatetimer , 1000);
}

function reiniciar(){
    quote = "";
    clearInterval(timer);

    time = 60;
    displayTime.innerText = time + "s";

    mistakes = 0;
    userInput.value = "";
    quoteSection.innerHTML = "";

    btnStart.style.display = "block";
    btnEndTest.style.display = "none";
    btnVolver.style.display = "none";
    resultados.style.display = 'none';
    userInput.disabled = true;
    renderNewQuote();
}

const displayResult = () => {
    resultados.style.display = 'block';
    clearInterval(timer);
    btnEndTest.style.display = 'none';
    userInput.disabled = true;
    let timeTaken = 1;
    if(timeTaken != 0){
        timeTaken = (60 - time) / 100;
    }
    displayVelocidad.innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "ppm";
    if(userInput.value.length > 0)
        displayPresicion.innerText = Math.round(((userInput.value.length - mistakes) / userInput.value.length) * 100) + "%";
    else
    displayPresicion.innerText = "0";
}

const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.disabled = false;
    timeReduce();


    btnStart.style.display = "none";
    btnEndTest.style.display = "block";
    btnVolver.style.display = "block";
};

window.onload = () => {
    userInput.value = "";
    btnStart.style.display = "block";
    btnEndTest.style.display = "none";
    btnVolver.style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
}


