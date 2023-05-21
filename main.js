const display = document.querySelector('.mainDisplay')
const numButton = document.querySelectorAll('.number')
const optButton = document.querySelectorAll('.operator')
const load = document.querySelector('.load')
const clear = document.querySelector('.clear')
const cut =  document.querySelector('.AC')
const dot =  document.querySelector('.dot') 
const shortDis = document.querySelector('.shortDisplay') 
let number1 = '';
let operand = '';
let number2 = '';


function add (a, b) {
    return parseFloat(a) + parseFloat(b);
  };
  
function subtract  (a, b) {
    return parseInt(a) - parseInt(b);
  };

function multiply  (a, b) {
    return parseInt(a) * parseInt(b);
  };

function divide  (a, b) {
    // console.log(a + ' '+ b)
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
function updateShortDis(){
    shortDis.innerHTML=''
    const shortDisContent = document.createElement('div')
    shortDisContent.textContent = `${number1} ${operand} ${number2}`
    shortDis.appendChild(shortDisContent)  
}

 
function updateDisplay (data){
    const displayDiv = document.createElement('div')
    displayDiv.textContent = data
    display.appendChild(displayDiv)
    if(!display.textContent.toString().includes('.')){
        document.querySelector('.dot').classList.remove('disable')}
        else{document.querySelector('.dot').classList.add('disable')}
    updateShortDis()
}
clear.addEventListener('click', ()=>{
    display.textContent=''
    number1 = ''
    operand = ''
    number2 = ''
    shortDis.textContent = ''
})

load.addEventListener('click', ()=>{
    if((number1!='' && number2!='' && operand!='') && (number1 !=undefined && operand !=undefined && number2 != undefined) ){
    number2 = display.textContent;
        // console.log(`${number1} ${operand} ${number2}`)
    number1 = operator(number1, number2, operand)
    display.textContent=''
    updateDisplay(number1)
    number2 = ''
    operand = ''
    updateShortDis()
}
    else{ 
    alert('You are missing values, please check and try again')
}
}
)

optButton.forEach((button)=>{
button.addEventListener('click', saveNumber)
})

function saveNumber(){
    if(number1===''  && operand ===''){
    number1 = display.textContent 
    operand = this.textContent
    display.textContent=''
    }
    else if (number1!=='' && operand !=='' && number2!=''){
        number1 = operator(number1, display.textContent, operand)
        display.textContent=''
        number2 = ''
        operand = this.textContent
        updateDisplay(number1)
    }
    else if (number1!=='' && operand ===''){
        operand = this.textContent
        display.textContent=''
    }
    
    else {console.log('operand issue')}
    updateShortDis()
}

numButton.forEach((button)=>{
button.addEventListener('click', runner)})

function runner (){
     
    if ((number1 ==='' && operand ==='')|| (number1 ===undefined && operand ===undefined)){
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
        console.log('Number assignment issue')

    }
    updateShortDis()
}

cut.addEventListener('click',()=>{
        if(display.textContent.length>0){ 
        let ScreenInput = display.textContent
        display.innerHTML=''
        updateDisplay(ScreenInput.substring(0,ScreenInput.length-1))
        // console.log(`number1 : ${number1}, number2: ${number2}, operator ${operand}`)
        }
        else if (display.textContent.length===0) {
            number1=''
            number2=''
            operand=''}
        number2 = display.textContent    
        updateShortDis()
       
})

dot.addEventListener('click',()=>{
    if(display.textContent.toString().includes('.')){
        return ''
    }
    else{
        updateDisplay('.')
        document.querySelector('.dot').classList.add('disable')
    }
})