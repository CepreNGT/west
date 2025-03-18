import Dog from './Dog.js';

class Trasher extends Dog {
    constructor() {
        super('Громила', 5); 
    }

    modifyTakenDamage(value, fromCard, gameContext, continuation) {
        const reducedValue = Math.max(value - 1, 0);

        this.view.signalAbility(() => {
            continuation(reducedValue);
        });
    }

    getDescriptions() {
        return [
            ...super.getDescriptions(),
        ];
    }
}

export default Trasher;