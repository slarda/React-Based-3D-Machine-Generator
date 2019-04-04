/**
 * Created by dev on 26.03.19.
 */
import Document from "../../src/model/Document";

var chai = require('chai');
var expect = chai.expect;

import LineElement from "../../src/model/elements/LineElement";
import Group from "../../src/model/elements/Group";
import Point from "../../src/model/Point";
import ShapeCrossing from "../../src/analyzer/rules/ShapeCrossing";


describe("ShapeCrossing", function(){
    it("two triangle", function () {
        let doc = new Document();

        let group = new Group();

        group.addElement(new LineElement(new Point(-5,-5), new Point()));
        group.addElement(new LineElement(new Point(5,-5), new Point()));
        group.addElement(new LineElement(new Point(-5,-5), new Point(5,-5)));

        doc.addElement(group);

        let group2 = group.copy();
        group2.move(3,2);
        doc.addElement(group2);

        let rule = new ShapeCrossing(doc);

        let res = rule.check();

        return expect(res).to.be.true;
    });

});