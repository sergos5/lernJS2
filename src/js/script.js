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
    savings: true,
    chooseExpenses: function () {
        for (let i=0; i<2; i++) {
            let a = prompt("Введите обязательную статью расходов в этом месяце",""),
                b = prompt("Во сколько обойдется?", "");
                if (typeof(a)==='string' && (typeof(a)) !=null && (typeof(b)) !=null && a !="" && b !="" && a.length < 60) {
                    appData.expenses[a] = b;
                    console.log(appData.expenses);
                } else {
                    i--;
                    alert("Неправильный ввод данных! Повторите ввод!!!");
                }    
        } 
    },   
    detectDayBudget: function ()    {
        appData.moneyPerDay = (appData.budget/30).toFixed(2);
        alert ("Бюджет на 1 день составляет " + appData.moneyPerDay + " руб.");
    },
    detectLevel: function () {
        if (appData.moneyPerDay <= 100) {
            console.log ("Это минимальный уровень достатка!");
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay <= 2000) {
            console.log ("Это средний уровень достатка!");
        } else if (appData.moneyPerDay > 2000) {
            console.log ("Это высокий уровень достатка!");
        } else {
            console.log ("Произошла ошибка");
        }
    },
    checkSavings: function() {
        if (appData.savings == true) {
            let save = +prompt("Какова сумма Ваших накоплений?",""),
                percent =+prompt("Под какой процент?","");    
            appData.monthIncome = (save/100/12*percent).toFixed(2);
            alert("Ваш доход по депозиту за месяц: " + appData.monthIncome + "руб.");
        }
    },
    chooseOptExpenses: function () {
        for (let i=1; i<=3; i++) {
            let questionOptExpenses = prompt ("Статья необязательных расходов?","");
            appData.optionalExpenses[i] = questionOptExpenses;
            console.log(appData.optionalExpenses);
        }
    },
    chooseIncome: function () {
        let items = prompt("Что принесет Вам дополнительный доход? (Перечислите через запятую)","");
                
        while (typeof(items) != "string" || items=="" || typeof(items)==null) {
           items = prompt("Перечислите дополнительный доход!!!","");            
        }
        appData.income = items.split(", ");
        appData.income.push(prompt("Может, что-то еще?",""));        
        appData.income.sort();
        appData.income.forEach (function (itemmassive, i) {
            alert("Способы доп. заработка: " + (i+1) + " - " + itemmassive);
        });        
    },
};

for (let key in appData) {
    console.log("Наша программа включает в себя данные: " + key + ": " + appData[key]);    
}

