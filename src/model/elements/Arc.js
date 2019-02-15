/**
 * Created by dev on 14.01.19.
 */

import GraphicElement from '../GraphicElement';
import Point from '../Point';
import Line from './../math/Line';
import Vector from './../math/Vector';
import ArcRenderer from './../../2d/renderer/ArcRenderer';
import PolyLine from './../math/PolyLine';
import Trigonometric from './../math/Trigonometric';
import Matrix from './../math/Matrix';

/**
 * startAngle and endAngle are by counterclockwise
 */
export default class Arc extends GraphicElement{
    constructor(center, radius){
        super();
        this._center=center;
        // this._points[0]=center;
        this.radius=radius;
        this.startAngle=0;
        this.endAngle=0;
        
        this._renderer = new ArcRenderer(this);

        this.typeName = 'Arc';
    }

    set center(point){
        this._center = point;
        // this._points[0]=point;
    }

    get center(){
        return this._center;
    }

    get _points(){
        let points =  this.toPolyLines()[0].points;
        points.push(this.center);
        return points;
    }

    set _points(points){

    }

    /**
     * @return {number}
     */
    get incrementAngle(){
        if(this.endAngle> this.startAngle)
            return this.endAngle - this.startAngle;
        else
            return this.endAngle+(360-this.startAngle);
    }

    rotate(center,grad) {
        let rotateMatrix = Matrix.createRotateMatrix(grad);

        let moveMatrix = Matrix.createMoveMatrix(-center.x, -center.y);
        let removeMatrix = Matrix.createMoveMatrix(center.x, center.y);

        if (!this._center.compare(center)) {
            this._center.changeByMatrix(moveMatrix);
            this._center.changeByMatrix(rotateMatrix);
            this._center.changeByMatrix(removeMatrix);
        }
        if (this.startAngle != this.endAngle) {
            this.startAngle -= grad;
            this.endAngle -= grad;
        }
    }

    getMagnificationPoints(){
        //todo: change for arc
        return [this.center,
            new Point(this._center.x+this.radius, this._center.y),
            new Point(this._center.x, this._center.y+this.radius),
            new Point(this._center.x-this.radius, this._center.y),
            new Point(this._center.x, this._center.y-this.radius)
        ];
    }

    /**
     * @returns {{max:{x:number, y:number}, min:{x:number, y:number}}}
     */
    getExtrenum(){
        let points = this.toPolyLines()[0].points;
        return Point.getExtrenum(points);
    }


    getCenter(){
        return this._center;
    }

    /**
     * @param {Point} point
     * @param {float} eps
     * @return {boolean}
     */
    isNear(point, eps){
        let points = this.toPolyLines()[0].points;

        let res = false;
        for(let i=1; i<points.length; i++){
            res|=new Line(points[i-1], points[i]).isNear(point,eps);
        }
        return res;
    }


    /**
     * @deprecated The method can have an error if the figure is a concave element
     *
     * @param {ClosedFigure} figure
     * @return {boolean} - true if current elements into figure.
     */
    isIntoFigure(figure){
        let points = this.toPolyLines()[0].points;
        let res = true;
        for(let p of points){
            res &= figure.contain(p);
        }
        return res;
    }

    copy(){
        let arc = new Arc(this.center.copy(), this.radius);
        arc.height=this.height;
        arc.id=this.id;
        arc.startAngle=this.startAngle;
        arc.endAngle=this.endAngle;
        arc.lineType = this.lineType.copy();
        return arc;
    }

    /**
     * @inheritDoc
     */
    toPolyLines(){
        let res = new PolyLine();

        var start = this.startAngle;
        var end = this.endAngle;

        if(start!=0){
            start = Trigonometric.gradToRad(start);
        }
        if(end!=0){
            end = Trigonometric.gradToRad(end);
        }else{
            end=2 * Math.PI;
        }
        var a = start;
        if(this.startAngle>this.endAngle){
            for (; a<=(2*Math.PI); a += Math.PI / 100) {
                let p = new Point(this._center.x + this.radius * Math.cos(a), this._center.y + this.radius * Math.sin(a));
                res.addPoint(p);
            }
            a=0;
        }
        for (; a <= end; a += Math.PI / 100) {
            let p = new Point(this._center.x + this.radius * Math.cos(a), this._center.y + this.radius * Math.sin(a));
            res.addPoint(p);
        }

        return [res];
    }

    /**
     * The method return list of elements which was made by intersection current element
     * @param {Array.<Point>} points  - the points must be in current element
     * @return {Array.<GraphicElement>}
     */
    intersectByPoints(points){
        if(points.length<2){
            throw new Exception('Circle can be intersecting only by two points (for v1)');
        }
        let startPoint = points[0];
        points.splice(0,1);

        points = points.sort((a, b)=>{
            let angle1 = new Line(this.center,startPoint).toVector().getAngle(new Line(this.center,a).toVector());
            let angle2 = new Line(this.center,startPoint).toVector().getAngle(new Line(this.center,b).toVector());
            return angle2-angle1;
        });
        points.push(startPoint);
        let baseVector = new Vector(1,0,0);

        let res = [];
        let temp = this.copy();
        for(let i=0; i<points.length; i++){
            temp = this.copy();
            temp.startAngle = baseVector.getAngle(new Line(this.center,points[i]).toVector());
            temp.endAngle = baseVector.getAngle(new Line(this.center,startPoint).toVector());
            console.log(temp.startAngle, 'start');
            console.log(temp.endAngle, 'end');
            temp.generateNewId();
            res.push(temp);
            startPoint=points[i];
        }
        // temp.eAngleAngle = baseVector.getAngle(new Line(this.center,endPoint).toVector());
        return res;
    }
}