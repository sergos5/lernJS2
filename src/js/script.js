"use strict";

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');
    
let money, time;

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

sumValue.disabled = true; 
percentValue.disabled = true;


// начинаем расчет с нажатия кнопки "Начать расчет"
startBtn.addEventListener('click', function() {    
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");
    while (isNaN(money) || money=="" || money==null) {
        money = +prompt("Введите Ваш бюджет на месяц!", "");
    }

    //записывем полученные значения в объект appData
    appData.budget = money;
    appData.timeData = time;

    //выводим полученные значения даты и дохода
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth()+1;
    dayValue.value = new Date(Date.parse(time)).getDate();  
    
    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBtn.disabled = false;
});

// обязательные расходы
expensesBtn.addEventListener('click', function() {
    let sum = 0;
    for (let i=0; i<expensesItem.length; i++) {
        let a = expensesItem[i]. value,
            b = expensesItem[++i]. value;
        if (typeof(a)==='string' && (typeof(a)) !=null && (typeof(b)) !=null && a !="" && b !="" && a.length < 60) {
            appData.expenses[a] = b;
            sum += +b;            
        } 
    } 
    expensesValue.textContent = sum;    
    //console.log(expensesValue.textContent);
});

// необязательные расходы
optionalExpensesBtn.addEventListener('click', function() {
    optionalExpensesValue.textContent =""; 
    for (let i=0; i<optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + " ";
    }
});

//расчет дневного бюджета и вывод уровня дохода
countBtn.addEventListener('click', function(){
    if (appData.budget != undefined) { 
        appData.moneyPerDay = ((appData.budget - +expensesValue.textContent)/30).toFixed(2);
        daybudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay <= 370) {
            levelValue.textContent = "Это минимальный уровень достатка!";
        } else if (appData.moneyPerDay > 370 && appData.moneyPerDay <= 2000) {
            levelValue.textContent = "Это средний уровень достатка!";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Это высокий уровень достатка!";
        } else {
            levelValue.textContent = "Произошла ошибка!";
        } 
    } else {    
        daybudgetValue.textContent = "Произошла ошибка!";        
    }
});

// статьи возможного дохода
incomeItem.addEventListener('input', function(){
    let items = incomeItem.value;
    appData.income = items.split(", ");
    incomeValue.textContent = appData.income;    
});

// чекбокс и расчет накоплений
checkSavings.addEventListener('click', function() {
    if (checkSavings.checked == true) {
        appData.savings = true; 
        sumValue.disabled = false; 
        percentValue.disabled = false;
    } else {
        appData.savings = false;
        sumValue.disabled = true; 
        percentValue.disabled = true;
    }    
});

sumValue.addEventListener('input', function(){
    if (appData.savings == true) {
        let save = +sumValue.value,
            percent = +percentValue.value;    
        appData.monthIncome = (save/100/12*percent);
        appData.yearIncome = (save/100*percent);
        monthSavingsValue.textContent = appData.monthIncome.toFixed(2);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(2);
    }
});
percentValue.addEventListener('input', function(){
    if (appData.savings == true) {
        let save = +sumValue.value,
            percent = +percentValue.value;    
        appData.monthIncome = (save/100/12*percent);
        appData.yearIncome = (save/100*percent);
        monthSavingsValue.textContent = appData.monthIncome.toFixed(2);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(2);
    }
});


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};

