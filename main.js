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
    return parseFloat(a)- parseFloat(b);
  };

function multiply  (a, b) {
    return parseFloat(a)  * parseFloat(b);
  };

function divide  (a, b) {
    // console.log(a + ' '+ b)
    if (parseFloat(b)===0){
        updateDisplay('That is not gonnna work!')
    }
    return (parseFloat(a) / parseFloat(b))%1===0? parseFloat(a) / parseFloat(b): (parseFloat(a) / parseFloat(b)).toFixed(2);
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

load.addEventListener('click', loader)

function loader (){
   
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
optButton.forEach((button)=>{
button.addEventListener('click', ()=>{saveNumber(button.textContent)})
})

function saveNumber(value){
    if(number1===''  && operand ===''){
    number1 = display.textContent 
    operand = value
    display.textContent=''
    }
    if(number1===''  && operand ===''){
        number1 = display.textContent 
        operand = value
        display.textContent=''
        }
    if(number1!==''  && operand !=='' && number2===''){
              operand = value
           
            }    
    else if (number1!=='' && operand !=='' && number2!=''){
        number1 = operator(number1, display.textContent, operand)
        display.textContent=''
        number2 = ''
        operand = value
        updateDisplay(number1)
    }
    else if (number1!=='' && operand ===''){
        operand = value
        display.textContent=''
    }
    
    else {console.log('operand issue')}
    updateShortDis()
}

numButton.forEach((button)=>{
button.addEventListener('click', ()=>{  runner(button.textContent)})})
 
function runner (num){
    if (operand!=='' && number1===''){
        updateDisplay(num)
    }
    else if ((number1 ==='' && operand ==='')|| (number1 ===undefined && operand ===undefined)){
        let data = num
        updateDisplay(data)
    }
    else if(number1!=='' && operand !=='' && number2 ===''){
        display.textContent = ''
        number2 = num
        updateDisplay(number2)     
    }
    else if(number1!=='' && operand !=='' && number2 !=='')
    {
        updateDisplay(num)
        number2 = display.textContent
    }
    else if(number1!=='' && operand ==='' && number2 ==='')
    {
        updateDisplay(num)
        number1 = display.textContent
    }
    else {
        console.log('Number assignment issue')

    }
    updateShortDis()
}

function backspace(){
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
    if (number1 !=='' && operand !==''){number2 = display.textContent}    
    updateShortDis()
   
}


function dotOpt () {
    if(display.textContent.toString().includes('.')){
        return ''
    }
    else{
        updateDisplay('.')
        document.querySelector('.dot').classList.add('disable')
    }
}
cut.addEventListener('click', backspace)
dot.addEventListener('click',dotOpt)


window.addEventListener('keydown',  (e)=>{
    console.log(e.key)
    if (e.key==='Enter'){
        loader()
    }
    else  if( parseInt(e.key) >=0 && parseInt(e.key) <=9){
        runner(e.key)
    }
    else if (e.key === '+' ||e.key === '-' ||e.key === '*' ||e.key === '/'){
        saveNumber(e.key)
    }
    else if (e.key === '.' ){
        dotOpt()
    }
    else if (e.key === 'Backspace' ){
        backspace()
    }

})