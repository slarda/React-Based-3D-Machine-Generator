/**
 * Created by dev on 26.02.19.
 */


var assert = require('assert');

import Arc from './../src/model/elements/Arc';
import Point from './../src/model/Point';

import ChangeArcAngleCommand from './../src/2d/command/ChangeArcAngleCommand';

describe('Arc', function() {
    describe('set inside angle', function() {
        it('arc start 0, end 45 after setting inside angle to 90 must be started 0 and ended 90', function() {
            let arc = new Arc(new Point(10,10), 5);
            arc.startAngle=0;
            arc.endAngle=45;

            let command = new ChangeArcAngleCommand(null, [arc],90, null);
            command.executeCommand();

            assert.equal(arc.startAngle, 0);
            assert.equal(arc.endAngle, 90);
        });

    });

});
