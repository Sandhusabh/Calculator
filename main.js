const display = document.querySelector('.display')
const numButton = document.querySelectorAll('.number')
const optButton = document.querySelectorAll('.operator')
const load = document.querySelector('.load')
const clear = document.querySelector('.clear')
const cut =  document.querySelector('.AC')
const dot =  document.querySelector('.dot')  
let number1 = '';
let operand = '';
let number2 = '';


function add (a, b) {
    return parseInt(a) + parseInt(b);
  };
  
function subtract  (a, b) {
    return parseInt(a) - parseInt(b);
  };

function multiply  (a, b) {
    return parseInt(a) * parseInt(b);
  };

function divide  (a, b) {
    console.log(a + ' '+ b)
    if (parseInt(b)===0){
        updateDisplay('That is not gonnna work!')
    }
    return (parseInt(a) / parseInt(b))%1===0? parseInt(a) / parseInt(b): (parseInt(a) / parseInt(b)).toFixed(2);
  };
   
function operator(num1, num2, opt){
    if(opt === '+'){
        return add(num1, num2)
    }
    else if (opt==='-'){
        return subtract(num1, num2)
    }
    else if (opt==='*'){
        return multiply(num1, num2)
    }
    else if (opt==='/'){
        return divide(num1, num2)
    }
  
}
 
function updateDisplay (data){
    const displayDiv = document.createElement('div')
    displayDiv.textContent = data
     display.appendChild(displayDiv)
}
clear.addEventListener('click', ()=>{
    display.textContent=''
    number1 = ''
    operand = ''
    number2 = ''
})

load.addEventListener('click', ()=>{
number2 = display.textContent;
    console.log(`${number1} ${operand} ${number2}`)
number1 = operator(number1, number2, operand)
display.textContent=''
updateDisplay(number1)
number2 = ''
operand = ''
})

optButton.forEach((button)=>{
button.addEventListener('click', saveNumber)
})

function saveNumber(){
if(number1===''  && operand ===''){
number1 = display.textContent 
operand = this.textContent
display.textContent=''
}
else if (number1!=='' && operand !==''){
    number1 = operator(number1, display.textContent, operand)
    display.textContent=''
    number2 = ''
    operand = this.textContent
    updateDisplay(number1)
}
else {console.log('This should not have run')}

}

numButton.forEach((button)=>{
button.addEventListener('click', runner)})

function runner (){
    if (number1 ==='' && operand ===''){
        let data = this.textContent
        updateDisplay(data)
    }
    else if(number1!=='' && operand !=='' && number2 ===''){
        display.textContent = ''
        number2 = this.textContent
        updateDisplay(number2)     
    }
    else if(number1!=='' && operand !=='' && number2 !=='')
    {
        updateDisplay(this.textContent)
        number2 = display.textContent
    }
    else {
        console.log('This should not be running')

    }
}

cut.addEventListener('click',()=>{
        let ScreenInput = display.textContent
        display.innerHTML=''
        updateDisplay(ScreenInput.substring(0,ScreenInput.length-1))
})
