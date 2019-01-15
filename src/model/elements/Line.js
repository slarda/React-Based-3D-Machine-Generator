/**
 * Created by dev on 04.01.19.
 */
import Exception from '../../Exception';
import Element from '../Element';
import LineRenderer from './../../2d/renderer/LineRenderer';
import Point from "../Point";
import Matrix from "../math/Matrix";

export default class Line extends Element{
    constructor(p1, p2){
        super();
        this.p1=p1;
        this.p2=p2;
        // this._constrolPoints = [{x: (p2.x + p1.x) / 2, y: (p2.y + p1.y) / 2},...this._points];
        this._renderer = new LineRenderer(this);
    }

    /**
     * @return {number}
     */
    length(){
        let p1= this.p1;
        let p2= this.p2;
        let z = Math.pow(p1.z-p2.z,2);
        return Math.sqrt(Math.pow(p1.x-p2.x,2)+Math.pow(p1.y-p2.y,2)+z);
    }

    /**
     * http://www.cat-in-web.ru/notebook/rasstoyanie-ot-tochki-do-otrezka/
     */
    _isObtuseAngle( oppositeLine,  a,  b){
        var cos = (a*a + b*b - oppositeLine*oppositeLine) / (2 * a * b);
        return cos < 0;
    }

    /**
     * @inheritDoc
     */
    getExtrenum(){
        return Point.getExtrenum([this.p1, this.p2]);
    }

    /**
     * http://www.cat-in-web.ru/notebook/rasstoyanie-ot-tochki-do-otrezka/
     */
    distanceTo(point){
        let p1=this.p1;
        let p2=this.p2;
        if (p1.compare(point) || p2.compare(point))
            return 0;

        var AB = p1.distanceTo(p2);
        var AC = p1.distanceTo(point);

        if (AB == 0)
            return AC;

        var BC = p2.distanceTo(point);

        if (this._isObtuseAngle(AC, BC, AB))
            return BC;
        if (this._isObtuseAngle(BC, AC, AB))
            return AC;

        var p = (AC + BC + AB) / 2;
        return 2 * Math.sqrt(p * (p - AB) * (p - BC) * (p - AC)) / AB;
    }

    isIntoFigure(figure){
        return figure.contain(this.p1) && figure.contain(this.p2);
    }

    isNear(point, eps){
        return this.distanceTo(point)<eps;
    }

    move(x,y){
        let moveMatrix = new Matrix([[1,0,0,0],[0,1,0,0],[0,0,1,0],[x,y,0,1]]);
        let points = [this.p1, this.p2];
        for(let point of points){
            point.changeByMatrix(moveMatrix);
        }
    }

    resize(x, y){
        let resizeMatrix = new Matrix([[1+x,0,0,0],[0,1+y,0,0],[0,0,1,0],[0,0,0,1]]);
        let points = [this.p1, this.p2];
        for(let point of points){
            point.changeByMatrix(resizeMatrix);
        }
    }

    /**
     * Return point which offset is the size of crop number(presented by fraction)
     * Start is p1
     * @param {number} offset - 0..1
     * @return {Point}
     */
    getPointOffset(offset){
        return new Point(this.p1.x +(this.p2.x-this.p1.x)*offset, this.p1.y +(this.p2.y-this.p1.y)*offset);
    }
}