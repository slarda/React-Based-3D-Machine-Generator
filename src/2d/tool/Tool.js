/**
 * Created by dev on 09.01.19.
 */

import Document from '../../model/Document';
import Point from '../../model/Point';
import Cursor from './Cursor';

export default class Tool{
    /**
     * @param {Document} document
     */
    constructor(document){
        this._document = document;
        this.cursor = new Cursor();

        this.mousePosition = new Point(0,0,0);
    }

    set document(doc){
        this._document=doc;
    }

    get document(){
        return this._document;
    }

    /**
     * @param {Point} point
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseMove(point){
        this.mousePosition=point;
        return false;
    }

    /**
     * @param {Point} point
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseDbClick(point){
        throw new Exception("The method doesn't have implementation");
    }

    /**
     * @param {Point} point
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseClick(point){
        throw new Exception("The method doesn't have implementation");
    }

    /**
     * @param {Point} point
     * @return {boolean} false if not changing anyGraphicElement GraphicElement
     */
    mouseDown(point){
        throw new Exception("The method doesn't have implementation");
    }

    /**
     * @param {Point} point
     * @return {boolean} false if not changing any GraphicElement
     */
    mouseUp(point){
        throw new Exception("The method doesn't have implementation");
    }

    /**
     *
     */
    render(){
        if(this.cursor) {
            this.cursor.render(this.mousePosition);
        }
    }
}