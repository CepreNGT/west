import Dog from './Dog.js'

class Lad extends Dog {
    static inGameCount = 0;

    constructor() {
        super('Браток', 2);
    }

    static getInGameCount() {
        return this.inGameCount;
    }

    static setInGameCount(count) {
        this.inGameCount = count;
    }

    static getBonus() {
        const count = this.getInGameCount();
        return (count * (count + 1)) / 2;
    }

    doAfterComingIntoPlay(gameContext, continuation) {
        super.doAfterComingIntoPlay(gameContext, continuation);
        Lad.setInGameCount(Lad.getInGameCount() + 1);
    }

    doBeforeRemoving(continuation) {
        super.doBeforeRemoving(continuation);
        Lad.setInGameCount(Lad.getInGameCount() - 1);
    }

    modifyTakenDamage(value, fromCard, gameContext, continuation) {
        const reducedValue = Math.max(value - Lad.getBonus(), 0);

        this.view.signalAbility(() => {
            continuation(reducedValue);
        });
    }

    modifyDealedDamageToCreature(value, toCard, gameContext, continuation) {
        const buffedValue = value + Lad.getBonus();
        continuation(buffedValue);
    };

    getDescriptions() {
        const descriptions = super.getDescriptions();
        if (Lad.prototype.hasOwnProperty('modifyDealedDamageToCreature') &&
            Lad.prototype.hasOwnProperty('modifyTakenDamage')) {
                return [
                    ...descriptions,
                    'Чем их больше, тем они сильнее'
                ];        
        }

        return descriptions;
    }
}

export default Lad;