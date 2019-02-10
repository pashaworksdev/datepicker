'use strict';

class Datepicker {

    constructor(containerGeneral) {
        this.containerGeneral = containerGeneral;
        this.containerGeneral.setAttribute("class", "datepicker");
        this.arrowLeft = new ArrowLeft();
        this.month = new Month();
        this.arrowRight = new ArrowRight();
        this.containerWeek = new ContainerWeek();
        this.containerMonth = new ContainerMonth(this.month.getDateCurrent());
    }

    draw() {
        this.containerGeneral.appendChild(this.arrowLeft.draw());
        this.containerGeneral.appendChild(this.month.draw());
        this.containerGeneral.appendChild(this.arrowRight.draw());
        this.containerGeneral.appendChild(this.containerWeek.draw());
        this.containerGeneral.appendChild(this.containerMonth.draw());
    }

}

class Month {

    constructor() {
        this.date = new Date();
        this.containerMonth = document.createElement('div');
        this.containerMonth.setAttribute("class", "datepicker__month");
    }

    getDateCurrent() {
        return this.date;
    }

    setDateCurrent(change) {
        if (change === 'left') {
            this.date.setMonth(this.date.getMonth() - 1);
        } else {
            this.date.setMonth(this.date.getMonth() + 1);
        }
        this.writeMonthName();
    }

    draw() {
        this.writeMonthName();
        return this.containerMonth;
    }

    writeMonthName() {
        let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        this.containerMonth.innerHTML = months[this.getDateCurrent().getMonth().toString()] + ' ' + this.getDateCurrent().getFullYear();
    }

}

class Arrow {

    constructor() {
        this.buttonArrow = document.createElement('div');
        this.buttonArrow.setAttribute("class", "datepicker__arrow");
    }

}
//обращаюсь к методу click через datepicker.month - попытаться это исправить
class ArrowLeft extends Arrow {

    draw() {
        this.buttonArrow.classList.add("datepicker__arrow_direction_left");
        this.buttonArrow.onclick = () => this.click();
        return this.buttonArrow;
    }

    click() {
        datepicker.month.setDateCurrent('left');
    }

}
//обращаюсь к методу click через datepicker.month - попытаться это исправить
class ArrowRight extends Arrow {

    draw() {
        this.buttonArrow.classList.add("datepicker__arrow_direction_right");
        this.buttonArrow.onclick = () => this.click();
        return this.buttonArrow;
    }

    click() {
        datepicker.month.setDateCurrent('right');
    }

}
// возможно можно сделать дочерним классом
class ContainerWeek {

    constructor() {
        this.containerWeek = document.createElement('div');
        this.containerWeek.setAttribute("class", "datepicker__containerWeek");
    }

    draw() {
        let week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
        for (var day = 0; day < 7; day++) {
            this.createDay();
            this.dayWeek.innerHTML = week[day];
        }
        return this.containerWeek;
    }

    createDay() {
        this.dayWeek = document.createElement('div');
        this.dayWeek.setAttribute("class", "containerWeek");
        this.dayWeek.classList.add("containerWeek__dayWeek");
        this.containerWeek.appendChild(this.dayWeek);
    }

}
// возможно можно сделать дочерним классом
class ContainerMonth {

    constructor(currentDate) {
        this.containerMonth = document.createElement('div');
        this.containerMonth.setAttribute("class", "datepicker__containerMonth");
        this.currentDate = new Date(currentDate);
    }

    draw() {
        this.findDateFirst();
        // do {
            for (var day = 0; day < 7; day++) {
                this.createDay();
                this.dayNumber.innerHTML = (() => this.startDate())();
            }
        // } while ();
        return this.containerMonth;
    }

    createDay() {
        this.dayNumber = document.createElement('div');
        this.dayNumber.setAttribute("class", "containerMonth");
        this.dayNumber.classList.add("containerMonth__dayNumber");
        this.containerMonth.appendChild(this.dayNumber);
    }

    startDate() {
        // this.currentDay = this.findDateFirst().getDate() + day;
        // this.qqqqq = new Date(this.findDateFirst().setDate(this.currentDay));
        // this.wwww = this.qqqqq.getDate();
        // return this.wwww;

        this.currentDay = this.findDateFirst();
        this.currentDaySSS = this.currentDay;
        this.aaaaa = this.findDateFirst().getDate() + 1;
        this.currentDay = new Date(this.findDateFirst().setDate(this.aaaaa));

        return this.currentDaySSS.getDate();
        // this.currentDay =
    }

    findDateFirst() {
        this.dateFirst = new Date(this.currentDate.setDate(1));
        this.dateStart = new Date(this.dateFirst.setDate(2-this.dateFirst.getDay()));
        return this.dateStart;
}

}

let datepicker = new Datepicker(document.getElementById("datepicker"));
datepicker.draw();