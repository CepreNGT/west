import Duck from './Duck.js';
import TaskQueue from './TaskQueue.js';

class Brewer extends Duck {
    constructor() {
        super('Пивовар', 2);
    }

    attack(gameContext, continuation) {
        const taskQueue = new TaskQueue();
        const table = gameContext.currentPlayer.table.concat(gameContext.oppositePlayer.table);
        for(let position = 0; position < table.length; position++) {
            const card = table[position];
            if (card && card instanceof Duck) {
                taskQueue.push(onDone => card.view.signalHeal(onDone));
                taskQueue.push(onDone => {
                    card.maxPower += 1;
                    card.power = card.power + 2;
                    onDone();
                });
                taskQueue.push(onDone => {
                    card.updateView();
                    onDone();
                });
            }
        }

        taskQueue.push(onDone => this.view.showAttack(onDone));
        taskQueue.push(onDone => {
            const oppositeCard = gameContext.oppositePlayer.table[gameContext.position];
            if (oppositeCard) {
                this.dealDamageToCreature(this.currentPower, oppositeCard, gameContext, onDone);
            } else {
                this.dealDamageToPlayer(1, gameContext, onDone);
            }
        });
        taskQueue.continueWith(continuation);
    }
}

export default Brewer;