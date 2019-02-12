'use strict';

class Datepicker {

    constructor(containerGeneral) {
        this.containerGeneral = containerGeneral;
        this.containerGeneral.setAttribute("class", "datepicker");
        this.today = new Date();
        this.currentDate = new Date();
        this.month = new Month("datepicker__month");
        this.arrowLeft = new ArrowLeft('datepicker__arrow', 'datepicker__arrow_direction_left');
        this.arrowRight = new ArrowRight('datepicker__arrow', 'datepicker__arrow_direction_right');
        this.containerWeek = new ContainerWeek("datepicker__containerWeek");
        this.containerMonth = new ContainerMonth("datepicker__containerMonth");
    }

    draw() {
        this.containerGeneral.appendChild(this.arrowLeft.draw(this));
        this.containerGeneral.appendChild(this.month.draw(this.currentDate));
        this.containerGeneral.appendChild(this.arrowRight.draw(this));
        this.containerGeneral.appendChild(this.containerWeek.draw());
        this.containerGeneral.appendChild(this.containerMonth.draw(this.currentDate, this.today));
    }

    click(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.month.writeMonth(this.currentDate);
        this.containerMonth.clean();
        this.containerMonth.draw(this.currentDate, this.today);
    }

}

class Month {

    constructor(className) {
        this.containerMonth = document.createElement('div');
        this.containerMonth.setAttribute("class", className);
    }

    draw(currentDate) {
        this.writeMonth(currentDate);
        return this.containerMonth;
    }

    writeMonth(currentDate) {
        let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        this.containerMonth.innerHTML = months[currentDate.getMonth().toString()] + ' ' + currentDate.getFullYear();
    }

}

class Arrow {

    constructor(classNameOne, classNameTwo) {
        this.buttonArrow = document.createElement('div');
        this.buttonArrow.setAttribute("class", classNameOne);
        this.buttonArrow.classList.add(classNameTwo);
    }

}

class ArrowLeft extends Arrow {

    draw(object) {
        this.buttonArrow.onclick = () => object.click(-1);
        return this.buttonArrow;
    }

}

class ArrowRight extends Arrow {

    draw(object) {
        this.buttonArrow.onclick = () => object.click(1);
        return this.buttonArrow;
    }

}

class ContainerСalendar {

    constructor(className) {
        this.container = document.createElement('div');
        this.container.setAttribute("class", className);
    }

    drawDay(classNameOne, classNameTwo) {
        this.day = document.createElement('div');
        this.day.setAttribute("class", classNameOne);
        this.day.classList.add(classNameTwo);
        this.container.appendChild(this.day);
    }

}

class ContainerWeek extends ContainerСalendar {

    draw() {
        let week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
        for (let i = 0; i < 7; i++) {
            this.drawDay();
            this.day.innerHTML = week[i];
        }
        return this.container;
    }

    drawDay() {
        super.drawDay("containerWeek", "containerWeek__dayWeek");
    }

}

class ContainerMonth extends ContainerСalendar {

    draw(currentDate, today) {
        this.startDay(currentDate);
        do {
            for (let i = 0; i < 7; i++) {
                this.drawDay(currentDate, today);
                this.day.innerHTML = (() => this.currentDay.getDate())();
                this.currentDay.setDate(this.currentDay.getDate() + 1);
            }
        } while (this.currentDay.getMonth() == currentDate.getMonth());
        return this.container;
    }

    drawDay(currentDate, today) {
        super.drawDay("containerMonth", "containerMonth__dayNumber");
        if (this.currentDay.getMonth() != currentDate.getMonth()) this.day.classList.add('containerMonth__dayNumber_tag_grey');
        if (this.currentDay.toString() == today.toString()) this.day.classList.add('containerMonth__dayNumber_tag_yellow');
    }

    startDay(currentDate) {
        this.currentDay = new Date(currentDate);
        this.currentDay.setDate(1);
        this.currentDay.setDate(2 - this.currentDay.getDay());
    }

    clean() {
        for (let i = this.container.children.length - 1; i >= 0; i--) {
            this.container.removeChild(this.container.children[i]);
        }
    }

}

let datepicker = new Datepicker(document.getElementById("datepicker"));
datepicker.draw();