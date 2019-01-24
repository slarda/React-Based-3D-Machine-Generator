/**
 * Created by dev on 11.01.19.
 */
import Line from '../../model/elements/Line';
import Point from '../../model/Point';
import Group from '../../model/elements/Group';
import Rect from '../../model/Rect';

export default class RectElementController extends Rect{
    /**
     * @param {Point} p1
     * @param {Point} p2
     */
    constructor(p1,p2){
        super(p1,p2);
        this.group = new Group();
        this.l1 = new Line(p1.copy(), new Point(p2.x, p1.y));
        this.l2 = new Line(new Point(p2.x, p1.y), p2.copy());
        this.l3 = new Line(p2.copy(), new Point(p1.x, p2.y));
        this.l4 = new Line(new Point(p1.x, p2.y),p1.copy());

        this.group.addElement(this.l1);
        this.group.addElement(this.l2);
        this.group.addElement(this.l3);
        this.group.addElement(this.l4);
    }

    /**
     * @param {Point} p1
     */
    set p1(p1){
        this.l1.p1=p1.copy();
        this.l1.p2.y=p1.y;
        this.l2.p2.y=p1.y;
        this.l3.p2.x=p1.x;
        this.l4.p1.x=p1.x;
        this.l4.p2=p1.copy();
        this._p1=p1.copy();
    }

    /**
     * @return {Point}
     */
    get p1(){
        return this._p1;
    }

    /**
     * @param {Point} p1
     */
    set p2(p2){
        this.l1.p2.x=p2.x;
        this.l2.p1.x=p2.x;
        this.l2.p2=p2.copy();
        this.l3.p1=p2.copy();
        this.l3.p2.y=p2.y;
        this.l4.p1.y=p2.y;
        this._p2=p2.copy();
    }

    get p2(){
        return this._p2;
    }

    /**
     * @return {Group}
     */
    toElement(){
        return this.group;
    }
}