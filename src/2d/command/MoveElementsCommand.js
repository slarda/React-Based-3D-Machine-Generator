/**
 * Created by dev on 28.01.19.
 */

import Command from './Command';

export default class MoveElementsCommand extends Command{
    /**
     * @param {Document} document
     * @param {Array.<Element>} elements
     * @param {number} x
     * @param {number} y
     */
    constructor(document, elements, x, y){
        super(document);

        this._elements=elements;

        this.x=x;

        this.y=y;

        this.name= 'MoveElementsCommand';
    }

    /**
     * @inheritDoc
     */
    executeCommand(){
        for(let el of this._elements) {
            el.move(this.x, this.y);
        }
        return true;
    }
}