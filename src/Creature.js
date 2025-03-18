import Card from './Card.js';
import Dog from './Dog.js';

class Creature extends Card {
    constructor(name, num) {
        super(name, num);
    }

    get power() {
        return this.currentPower;
    }

    set power(newPower) {
        this.currentPower = Math.min(this.maxPower, newPower);
    }

    getDescriptions() {
        console.log(1);
        let indexDescription = "";
        if (isDuck(this) && isDog(this)) {
            indexDescription = 'Утка-Собака';
        } else if (isDuck(this)) {
            indexDescription = 'Утка';
        } else if (isDog(this)) {
            indexDescription = 'Собака';
        } else {
            indexDescription = 'Существо';
        }

        const names = super.getDescriptions();
        console.log([indexDescription, names]);
        return [indexDescription, names];
    }
};

function isDuck(card) {
    return card && card.quacks && card.swims;
}

function isDog(card) {
    return card instanceof Dog;
}

export default Creature;