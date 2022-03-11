class Hamburger {
    constructor(size, stuff, options, sizeCalc, stuffCalc, optionsCalc, result, resultCalc) {
        this.size = size;
        this.sizeCalc = sizeCalc;
        this.stuffCalc = stuffCalc;
        this.optionsCalc = optionsCalc;
        this.stuff = stuff;
        this.options = options;
        this.result = result;
        this.resultCalc = resultCalc;
        this.getSize();
        this.getStuff();
        this.getOptions();
        this.showAll();
    }

    getSize() {
        document.querySelector('.burger__list').addEventListener('click', (event) => {
            document.querySelectorAll('.btn').forEach(el => el.classList.remove('active'));
            event.target.classList.add('active');
            if (event.target.tagName !== 'BUTTON') {
                return;
            }
            this.size = event.target.dataset["price"];
            this.sizeCalc = event.target.dataset['calories'];
        })
        return this.size, this.sizeCalc;
    }

    getStuff() {
        document.querySelector('.stuff').addEventListener('change', (event) => {
            this.stuff = event.target.dataset['price'];
            this.stuffCalc = event.target.dataset['calories'];
        })
        return this.stuff, this.stuffCalc;
    }

    getOptions() {
        this.result = [];
        this.resultCalc = [];
        const arr = [...document.querySelectorAll('input[name="topings"]')];
        arr.forEach(el => {
            el.addEventListener('change', (event) => {
                if (event.target.checked === true) {
                    this.options = el.dataset['price'];
                    this.optionsCalc = el.dataset['calories']
                    this.result.push(this.options);
                    this.resultCalc.push(this.optionsCalc)
                } else if (event.target.checked === false) {
                    if (this.result.length == 1) {
                        this.result = [];
                        this.resultCalc = [];
                    } else {
                        this.result = [document.querySelector(`input[name=topings]:checked`).dataset.price];
                        this.resultCalc = [document.querySelector(`input[name=topings]:checked`).dataset.calories];
                    }
                }
            })
        })

        return this.result, this.resultCalc;
    }

    getSumPrice(size, sizeCalc, stuff, stuffCalc, result) {
        let price = 0;
        this.result.forEach(el => price += Number(el))
        const totalPrice = +this.size + +this.stuff + price;

        return totalPrice;
    }

    getSumCalc(size, sizeCalc, stuff, stuffCalc, price, resultCalc) {
        let calc = 0;

        this.result.forEach(el => calc += Number(el))

        const totalCalc = +this.sizeCalc + +this.stuffCalc + calc;

        return totalCalc;
    }

    showAll() {
        document.querySelector('.total-btn').addEventListener('click', () => {
            document.querySelector('.totalPrice-span').textContent = this.getSumPrice();
            document.querySelector('.totalCalc-span').textContent = this.getSumCalc();
        })
    }
}


const hamburger = new Hamburger();