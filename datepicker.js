'use strict';

class Datepicker {

    constructor(containerGeneral) {
        this.containerGeneral = containerGeneral;
        this.containerGeneral.setAttribute("class", "datepicker");
        this.arrowLeft = new ArrowLeft();
        this.month = new Month();
        this.arrowRight = new ArrowRight();
        this.containerWeek = new ContainerWeek();
        this.containerMonth = new ContainerMonth();
    }

    draw() {
        this.containerGeneral.appendChild(this.arrowLeft.draw());
        this.containerGeneral.appendChild(this.month.draw());
        this.containerGeneral.appendChild(this.arrowRight.draw());
        this.containerGeneral.appendChild(this.containerWeek.draw());
        this.containerGeneral.appendChild(this.containerMonth.draw(this.month.getDateCurrent()));
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
        datepicker.containerMonth.clean();
        datepicker.containerMonth.draw(this.date);
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

    constructor() {
        this.containerMonth = document.createElement('div');
        this.containerMonth.setAttribute("class", "datepicker__containerMonth");
    }

    draw(currentDate) {
        this.currentDate = new Date(currentDate);
        this.findDateFirst();
        this.currentDay = this.findDateFirst();
        do {
            for (let day = 0; day < 7; day++) {
                this.createDay();
                this.dayNumber.innerHTML = (() => this.startDate())();
                this.currentDay.setDate(this.currentDay.getDate() + 1);
            }
        } while (this.currentDay.getMonth() == this.currentDate.getMonth());
        return this.containerMonth;
    }

    clean() {
        let main_block = this.containerMonth;
        let blocks = main_block.childNodes;
        for (let i = blocks.length-1; i >= 0; i--) {
            main_block.removeChild(blocks[i]);
        }
    }

    createDay() {
        this.dayNumber = document.createElement('div');
        this.dayNumber.setAttribute("class", "containerMonth");
        this.dayNumber.classList.add("containerMonth__dayNumber");
        this.containerMonth.appendChild(this.dayNumber);
    }

    startDate() {
        return this.currentDay.getDate();
    }

    findDateFirst() {
        this.dateFirst = new Date(this.currentDate.setDate(1));
        this.dateStart = new Date(this.dateFirst.setDate(2-this.dateFirst.getDay()));
        return this.dateStart;
    }

}

let datepicker = new Datepicker(document.getElementById("datepicker"));
datepicker.draw();