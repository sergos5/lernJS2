"use strict";

let money, time;

function start () {
    money = +prompt("Ваш бюджет на месяц?", "");
    while (isNaN(money) || money=="" || money==null) {
        money = +prompt("Настоятельно прошу, введите Ваш бюджет на месяц!!!", "");
    }
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
}
start();


let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
};


function chooseExpenses () {
    for (let i=0; i<2; i++) {
        let a = prompt("Введите обязательную статью расходов в этом месяце",""),
            b = prompt("Во сколько обойдется?", "");
            if ((typeof(a)) !=null && (typeof(a)) !=null && a !="" && b !="" && a.length < 60) {
                appData.expenses[a] = b;
                console.log(appData.expenses);
            } else {
                i--;
                alert("Неправильный ввод данных! Повторите ввод!!!");
            }    
    } 
}   
chooseExpenses ();


/* let nam =0;
while (nam<2) {
    let a = prompt("Введите обязательную статью расходов в этом месяце",""),
    b = prompt("Во сколько обойдется?", "");
    if ((typeof(a)) !=null && (typeof(a)) !=null && a !="" && b !="" && a.length < 60) {
        appData.expenses[a] = b;
        console.log(appData.expenses);
    } else {
        alert("Неправильный ввод данных! Повторите ввод!!!");
        nam--;
    }  
    nam++;  
}
 */

/* let nam = 0;
do {
    let a = prompt("Введите обязательную статью расходов в этом месяце",""),
        b = prompt("Во сколько обойдется?", "");
    if ((typeof(a)) !=null && (typeof(a)) !=null && a !="" && b !="" && a.length < 60) {
        appData.expenses[a] = b;
        console.log(appData.expenses);
        
    } else {                
        alert("Неправильный ввод данных! Повторите ввод!!!");
        nam--;
    } 
    nam++;
}
while (nam<2); */


function detectDayBudget() {
    appData.moneyPerDay = (appData.budget/30).toFixed(2);
    alert ("Бюджет на 1 день составляет " + appData.moneyPerDay + " руб.");
}
detectDayBudget();


function detectLevel() {
    if (appData.moneyPerDay <= 100) {
        console.log ("Это минимальный уровень достатка!");
    } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000) {
        console.log ("Это средний уровень достатка!");
    } else if (appData.moneyPerDay > 2000) {
        console.log ("Это высокий уровень достатка!");
    } else {
        console.log ("Произошла ошибка");
    }
}
detectLevel ();

let questionSavings = confirm("У Вас есть накопления?","");
if (questionSavings) {
    appData.savings = true;
}

function checkSavings() {
    if (appData.savings == true) {
        let save = +prompt("Какова сумма Ваших накоплений?",""),
            percent =+prompt("Под какой процент?","");    
        appData.monthIncome = (save/100/12*percent).toFixed(2);
        alert("Ваш доход по депозиту за месяц: " + appData.monthIncome + "руб.");
    }
}
checkSavings(); 


function chooseOptExpenses() {
    for (let i=1; i<=3; i++) {
        let questionOptExpenses = prompt ("Статья необязательных расходов?","");
        appData.optionalExpenses[i] = questionOptExpenses;
        console.log(appData.optionalExpenses);
    }
}
chooseOptExpenses();