/**
 * Created by dev on 14.01.19.
 */

import CreatorToolsInTwoSteps from './CreatorToolsInTwoSteps';
import Spline from './../../model/elements/Spline';
import Line from './../../model/elements/Line';

export default class SplineTool extends CreatorToolsInTwoSteps{
    constructor(document){
        super(document);
        this.cursor.src = 'images/Spline.png';

    }

    /**
     * @return {Spline}
     */
    get spline(){
        return this._element;
    }

    setPosition2(point){
        this.spline.endPoint=point;
        let line = new Line(this.spline.startPoint.copy(),  point.copy());
        let center = line.getCenter();
        line.rotate(center,65);
        this.spline.controlPoint1 = line.p1;
        this.spline.controlPoint2 = line.p2;
    }

    createElement(point){
        let res = new Spline(point, point);
        this._element=res;
        this.setPosition2(point);
        return res;
    }

}