class Hamburger {
    constructor(size, stuff, options, sizeCalc, stuffCalc, optionsCalc) {
        this.size = size;
        this.sizeCalc = sizeCalc;
        this.stuffCalc = stuffCalc;
        this.optionsCalc = optionsCalc;
        this.stuff = stuff;
        this.options = options;
        this.getSize();
        this.getStuff();
        this.getOptions();
        this.list = [];
    }

    getSize() {
        document.querySelector('.burger__list').addEventListener('click', (event) => {
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
        let values = [];
        const arr = document.querySelectorAll(`.input`);
        arr.forEach(el => {
            el.addEventListener('click', (event) => {

                let check = document.querySelectorAll('input[name="topings"]:checked');
                check.forEach(el => {
                    values.push(event.target.dataset["price"]);
                })
            })

        })
        console.log(values);
    }


    // inputs.forEach(el => {
    //     el.addEventListener('click', () => {
    //         container.textContent = '';
    //         let input_checkeds = document.querySelectorAll('input:checked');

    //         input_checkeds.forEach(el_checked => {
    //             container.insertAdjacentHTML('beforeend', el_checked.value);
    //         });
    //     });
    // });

    // this.options = event.target.dataset['price'];
    // this.optionsCalc = event.target.dataset['calories'];

}


const hamburger = new Hamburger();