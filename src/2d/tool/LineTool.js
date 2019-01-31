/**
 * Created by dev on 09.01.19.
 */

import CreatorToolsInTwoSteps from './CreatorToolsInTwoSteps';
import Line from '../../model/elements/Line';

export default class LineTool extends CreatorToolsInTwoSteps{
    constructor(document){
        super(document);
        
        this.cursor.src = 'images/Line.png';
    }

    /**
     * @return {Line}
     */
    get line(){
        return this._element;
    }

    setPosition2(point){
        this.line.p2=point;
    }

    createElement(point){
        return new Line(point, point);
    }
}