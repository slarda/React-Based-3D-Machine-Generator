/**
 * Created by dev on 19.12.18.
 */

import {Vector3} from 'three';


class Vertex2{
    constructor(x,y){
        this.x=x;
        this.y=y;
    }

    /**
     * @public
     * @return {THREE.Vector3}
     */
    getThreeVertex(){
        return new Vector3(this.x, this.y, 0);
    }

    /**
     * @param {Vertex2} vertex
     * @return {boolean}
     */
    compare(vertex){
        if(vertex instanceof Vertex2) {
            return this.x == vertex.x && this.y==vertex.y;
        }
        return false;
    }
}

class Vertex3 extends Vertex2{
    constructor(x,y,z){
        super(x,y);
        this.z=z;
    }

    /**
     * @public
     * @return {THREE.Vector3}
     */
    getThreeVertex(){
        return new Vector3(this.x, this.y, this.z);
    }

    /**
     * @param {Vertex3} vertex
     * @return {boolean}
     */
    compare(vertex){
        if(vertex instanceof Vertex3){
            return super.compare(vertex) && this.z==vertex.z;
        }
        return false;
    }
}

export {Vertex3, Vertex2};