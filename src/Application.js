/**
 * Created by dev on 17.01.19.
 */

import Board from './2d/Board';
import Command from './2d/command/Command';
import CommandHistory from './CommandHistory';
import Document from './model/Document';
import GroupCommand from './2d/command/GroupCommand';
import UngroupCommand from './2d/command/UngroupCommand';
import DeleteElementCommand from './2d/command/DeleteElementCommand';
import ChangeElementsHeightCommand from './2d/command/ChangeElementsHeightCommand';
import MoveElementsCommand from './2d/command/MoveElementsCommand';
import RotateElementsCommand from './2d/command/RotateElementsCommand';

/**
 * The main application class is a facade for board
 * the class can generate events like as:
 * 1. selectElement - the event will call for every selected element. The event has data the data is a selected element
 * 2. clearSelectElements - the event will call when clear select elements
 *
 */
class Application{
    constructor(){
        /** @param {Document} */
        this.currentDocument = new Document();

        /** @param {CommandHistory} */
        this.commandHistory = new CommandHistory();

        /** @param {Board} */
        this._board = null;

        this.selectElements = [];

        this._handlers = {
            selectElement: [],
            clearSelectElements: []
        }
    }

    set board(board){
        this._board = board;
        board.document=this.currentDocument;
    }
    
    get board(){
        return this._board;
    }

    addSelectElements(elements){
        for(let element of elements){
            this.addSelectElement(element);
        }
    }

    addSelectElement(element){
        this.selectElements.push(element);
        this._notifyHandlers('selectElement',element);
    }

    clearSelectElements(){
        this.selectElements.splice(0,this.selectElements.length);
        this._notifyHandlers('clearSelectElements');
    }

    /**
     * @param {Command} command
     */
    executeCommand(command){
        let res = command.execute();
        if(res){
            this.commandHistory.push(command);
        }

        if(this._board){
            this._board.renderDocument();
        }
    }

    /**
     * Redo command which was undo
     */
    redo(){
        if(this.commandHistory.hasRedo()){
            let command = this.commandHistory.getRedo();
            this.commandHistory.push(command);
            command.execute();
        }
        if(this._board){
            this._board.renderDocument();
        }
    }
    
    /**
     * The method need for revert last command
     */
    undo(){
        let command = this.commandHistory.pop();
        if(command){
            command.undo();
        }

        if(this._board){
            this._board.renderDocument();
        }
    }
    
    group(){
        this.executeCommand(new GroupCommand(app.currentDocument, app.selectElements));
    }

    ungroup(){
        this.executeCommand(new UngroupCommand(app.currentDocument, app.selectElements));
    }

    deleteSelected(){
        if(this.board){
            this.board.setTool('Pointer');
        }
        this.executeCommand(new DeleteElementCommand(this.currentDocument, this.selectElements));
    }

    setElementsHeight(height){
        this.executeCommand(new ChangeElementsHeightCommand(app.currentDocument, app.selectElements, height));
    }

    /**
     * 
     * @param {number} x
     * @param {number} y
     */
    moveSelected(x,y){
        this.executeCommand(new MoveElementsCommand(app.currentDocument, app.selectElements, x,y));
    }

    /**
     * @param angle
     */
    rotateSelected(angle){
        this.executeCommand(new RotateElementsCommand(app.currentDocument, app.selectElements, angle));
    }

    addHandler(eventName, handler){
        this._handlers[eventName].push(handler);
    }

    _notifyHandlers(eventName, data){
        if(this._handlers[eventName]) {
            for (let handler of this._handlers[eventName]) {
                handler(data);
            }
        }
    }
}

window.app = new Application();