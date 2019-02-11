'use strict';

class Datepicker {

    constructor(containerGeneral) {
        this.containerGeneral = containerGeneral;
        this.containerGeneral.setAttribute("class", "datepicker");
        this.date = new Date();
        this.arrowLeft = new ArrowLeft();
        this.month = new Month();
        this.arrowRight = new ArrowRight();
        this.containerWeek = new ContainerWeek("datepicker__containerWeek");
        this.containerMonth = new ContainerMonth("datepicker__containerMonth");
    }

    draw() {
        this.containerGeneral.appendChild(this.arrowLeft.draw());
        this.containerGeneral.appendChild(this.month.draw(this.getDateCurrent()));
        this.containerGeneral.appendChild(this.arrowRight.draw());
        this.containerGeneral.appendChild(this.containerWeek.draw());
        this.containerGeneral.appendChild(this.containerMonth.draw(this.getDateCurrent()));
    }
//get DateCurrent
    getDateCurrent() {
        return this.date;
    }
//set DateCurrent
    setDateCurrent(change) {
        if (change === 'left') {
            this.getDateCurrent().setMonth(this.getDateCurrent().getMonth() - 1);
        } else {
            this.getDateCurrent().setMonth(this.getDateCurrent().getMonth() + 1);
        }
    }

    update() {
        this.month.writeMonthName(this.getDateCurrent());
        this.containerMonth.clean();
        this.containerMonth.draw(this.getDateCurrent());
    }

}

class Month {

    constructor() {
        this.containerMonth = document.createElement('div');
        this.containerMonth.setAttribute("class", "datepicker__month");
    }

    draw(currentDate) {
        this.writeMonthName(currentDate);
        return this.containerMonth;
    }

    writeMonthName(currentDate) {
        let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        this.containerMonth.innerHTML = months[currentDate.getMonth().toString()] + ' ' + currentDate.getFullYear();
    }

}

class Arrow {

    constructor() {
        this.buttonArrow = document.createElement('div');
        this.buttonArrow.setAttribute("class", "datepicker__arrow");
    }

}
//обращаюсь к методу setDateCurrent через datepicker - попытаться это исправить
class ArrowLeft extends Arrow {

    draw() {
        this.buttonArrow.classList.add("datepicker__arrow_direction_left");
        this.buttonArrow.onclick = () => this.click();
        return this.buttonArrow;
    }

    click() {
        datepicker.setDateCurrent('left');
        datepicker.update();
    }

}
//обращаюсь к методу setDateCurrent через datepicker - попытаться это исправить
class ArrowRight extends Arrow {

    draw() {
        this.buttonArrow.classList.add("datepicker__arrow_direction_right");
        this.buttonArrow.onclick = () => this.click();
        return this.buttonArrow;
    }

    click() {
        datepicker.setDateCurrent('right');
        datepicker.update();
    }

}

class ContainerСalendar {

    constructor(block) {
        this.container = document.createElement('div');
        this.container.setAttribute("class", block);
    }

    createDay(classOne, classTwo) {
        this.day = document.createElement('div');
        this.day.setAttribute("class", classOne);
        this.day.classList.add(classTwo);
        this.container.appendChild(this.day);
    }

}

class ContainerWeek extends ContainerСalendar {

    draw() {
        let week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
        for (let i = 0; i < 7; i++) {
            this.createDay();
            this.day.innerHTML = week[i];
        }
        return this.container;
    }

    createDay() {
        super.createDay("containerWeek", "containerWeek__dayWeek");
    }

}

class ContainerMonth extends ContainerСalendar {
//исправить
    draw(currentDate) {
        this.currentDate = new Date(currentDate);
        this.currentDay = this.findDayFirst();
        do {
            for (let i = 0; i < 7; i++) {
                this.createDay();
                this.day.innerHTML = (() => this.findDayCurrent())();
                this.currentDay.setDate(this.currentDay.getDate() + 1);
            }
        } while (this.currentDay.getMonth() == this.currentDate.getMonth());
        return this.container;
    }

    clean() {
        for (let i = this.container.children.length - 1; i >= 0; i--) {
            this.container.removeChild(this.container.children[i]);
        }
    }

    createDay() {
        super.createDay("containerMonth", "containerMonth__dayNumber");
    }

    findDayCurrent() {
        return this.currentDay.getDate();
    }
//исправить
    findDayFirst() {
        this.dateFirst = new Date(this.currentDate.setDate(1));
        this.dateFirst.setDate(2-this.dateFirst.getDay());
        return this.dateFirst;
    }

}

let datepicker = new Datepicker(document.getElementById("datepicker"));
datepicker.draw();