'use strict';

class Datepicker {

    constructor(containerGeneral) {
        this.containerGeneral = containerGeneral;
        this.arrowLeft = new ArrowLeft();
        this.month = new Month();
        this.arrowRight = new ArrowRight();
        this.date = new Date();
        // this.containerDate = new ContainerDate();
    }

    draw() {
        this.containerGeneral.appendChild(this.arrowLeft.draw());
        this.containerGeneral.appendChild(this.month.draw());
        this.containerGeneral.appendChild(this.arrowRight.draw());
        // this.containerGeneral.appendChild(this.containerDate.draw());
    }

    // getDateNow() {
    //     this.date = new Date();
    //     return this.date;
    // }

    setDateCurrent(change) {
        if (change == 'left') {
            this.date.setMonth(this.date.getMonth() - 1);
            this.month.writeNameMonth();
        } else {
            this.date.setMonth(this.date.getMonth() + 1);
            this.month.writeNameMonth();
        }

    }

}

class Month {

    draw() {
        this.containerMonth = document.createElement('div');
        this.containerMonth.setAttribute("class", "datepicker__month");
        this.writeNameMonth();
        return this.containerMonth;
    }

    writeNameMonth() {
        let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        this.containerMonth.innerHTML = months[datepicker.date.getMonth().toString()];
    }

    // update() {
    //     let months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    //     this.containerMonth.innerHTML = months[datepicker.date.getMonth().toString()];
    // }

}

class Arrow {

    draw() {
        this.containerArrow = document.createElement('div');
        this.containerArrow.setAttribute("class", "datepicker__button");
        this.buttonArrow = document.createElement('div');
        this.buttonArrow.setAttribute("class", "datepicker__arrow");
        this.containerArrow.appendChild(this.buttonArrow);
    }

}

class ArrowLeft extends Arrow {

    draw() {
        super.draw();
        this.buttonArrow.classList.add("datepicker__arrow_direction_left");
        this.buttonArrow.onclick = () => this.click();
        return this.containerArrow;
    }

    click() {
        // alert('TEST');
        datepicker.setDateCurrent('left');
        // alert(datepicker.setDateCurrent());
    }

}

class ArrowRight extends Arrow {

    draw() {
        super.draw();
        this.buttonArrow.classList.add("datepicker__arrow_direction_right");
        this.buttonArrow.onclick = () => this.click();
        return this.containerArrow;
    }

    click() {
        // alert('TEST');
        datepicker.setDateCurrent('right');
        // alert(datepicker.setDateCurrent());
    }

}

let datepicker = new Datepicker(document.getElementById("datepicker"));
datepicker.draw();