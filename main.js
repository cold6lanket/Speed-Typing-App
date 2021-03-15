const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
// we add event listener each time we type something
quoteInputElement.addEventListener('input', () => {
    // get each and every <span> which was dynamically created in getNextQuote function
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    // value that we typed
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;

    // we loop through all span elements
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index];
        // in case we didnt type anything, we dont want to give a color to text
        if (character == null) {
            characterSpan.classList.remove('correct');
            characterSpan.classList.remove('incorrect');
            correct = false;
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct');
            characterSpan.classList.remove('incorrect');
        } else {
            characterSpan.classList.add('incorrect');
            characterSpan.classList.remove('correct');
            correct = false;
        }
    });

    if (correct) {getNextQuote();}
});

// fetching api to get quote text
async function getData() {
    return await fetch(RANDOM_QUOTE_API_URL)
                    .then(res => res.json())
                    .then(data => data.content); // get quote text from API
}

async function getNextQuote() {
    const quote = await getData();
    quoteDisplayElement.innerText = '';
    // we put each character of quote text into span
    quote.split('').forEach(character => {
        // create span element
        const characterSpan = document.createElement('span');
        // put each character into span 
        characterSpan.innerText = character;
        quoteDisplayElement.appendChild(characterSpan);
    });
    // set initial value of textarea to null
    quoteInputElement.value = null;
}

getNextQuote();