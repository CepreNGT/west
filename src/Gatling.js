import Creature from './Creature.js';
import TaskQueue from './TaskQueue.js';

class Gatling extends Creature {
    constructor() {
        super('Гатлинг', 6);
    }

    attack(gameContext, continuation) {
        const taskQueue = new TaskQueue();
        const oppositeTable = gameContext.oppositePlayer.table;
        for(let position = 0; position < oppositeTable.length; position++) {
            taskQueue.push(onDone => this.view.showAttack(onDone));
            taskQueue.push(onDone => {
                const card = oppositeTable[position];
                if (card) {
                    this.dealDamageToCreature(2, card, gameContext, onDone);
                } else {
                    onDone();
                }
            });
        }
        taskQueue.continueWith(continuation);
    }
}

export default Gatling;