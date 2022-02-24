const bill = document.getElementById('bill');
const people = document.getElementById('people');
const tipForOne = document.getElementById('tip-result');
const totalForOne = document.getElementById('total-result');
const tipBtns = document.querySelectorAll('.tip');
const error = document.querySelector('.error');
const tipCustom = document.querySelector('.custom-tip');
const resetBtn = document.querySelector('.reset-btn');

//  events //
bill.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});

tipCustom.addEventListener('input', setTipCustomValue);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);

// declarations //
let billValue = 0.0;
let tipValue = 0.05;
let peopleValue = 1;


// functions //
function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s){
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}


function setBillValue(){
    if (bill.value.includes(',')){
        bill.value = bill.value.replace(',', '.');
    }

    if(!validateFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1);
    }

    billValue = parseFloat(bill.value)
    calculateTip();
}

function handleClick(event){
    tipBtns.forEach(btn => {
        //clear active state
        btn.classList.remove('selected');

        //set active state 
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('selected');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    });

    //clear custom tip
    tipCustom.value = '';

    calculateTip();
}


function setTipCustomValue(){
    if(!validateInt(tipCustom.value)){
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }
    
    tipValue = parseFloat(tipCustom.value/100);

    //remove active state from buttons
    tipBtns.forEach(btn => {
        btn.classList.remove('selected');
    });

    if(tipCustom.value !== ''){
        calculateTip();
    }
}

function setPeopleValue(){
    if(!validateInt(people.value)){
        people.value = people.value.substring(0, people.value.length-1);
    }

    peopleValue = parseInt(people.value);

    if(peopleValue <= 0){
        error.classList.add('show-error');
        setTimeout(function(){
            error.classList.remove('show-error');
        }, 3000);
    }

    calculateTip();
}

function calculateTip(){
    if (peopleValue >=1 ){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        if (tipAmount >= 0){
            tipForOne.innerHTML = '$' + tipAmount.toFixed(2);
        }
        if (total >= 0){
            totalForOne.innerHTML = '$' + total.toFixed(2);
        }
    }
}


function reset(){
    bill.value = '0.0';
    setBillValue();

    tipBtns[2].click();

    people.value = '1';
    setPeopleValue();
}