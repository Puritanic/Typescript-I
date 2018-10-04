"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Model_1 = require("./Model");
var Validators_1 = require("./Validators");
var _lastId = 0;
function generateTodoId() {
    return (_lastId += 1);
}
function clone(src) {
    var clone = JSON.stringify(src);
    return JSON.parse(clone);
}
var TodoService = /** @class */ (function () {
    function TodoService(todos) {
        var _this = this;
        this.todos = [];
        if (todos) {
            todos.forEach(function (todo) { return _this.add(todo); });
        }
    }
    TodoService.prototype.add = function (input) {
        var todo = new Validators_1.ValidatableTodo();
        todo.id = generateTodoId();
        todo.state = Model_1.TodoState.Active;
        if (typeof input === 'string') {
            todo.name = input;
        }
        else if (typeof input.name === 'string') {
            todo.name = input.name;
        }
        else {
            throw 'Invalid Todo name!';
        }
        var errors = todo.validate();
        if (errors.length) {
            var combinedErrors = errors.map(function (x) { return x.property + ": " + x.message; });
            throw "Invalid Todo: " + combinedErrors;
        }
        this.todos.push(todo);
        return todo;
    };
    TodoService.prototype.clearCompleted = function () {
        this.todos = this.todos.filter(function (x) { return x.state == Model_1.TodoState.Active; });
    };
    TodoService.prototype.getAll = function () {
        return clone(this.todos);
    };
    TodoService.prototype.getById = function (todoId) {
        var todo = this._find(todoId);
        return clone(todo);
    };
    TodoService.prototype.toggle = function (todoId) {
        var todo = this._find(todoId);
        if (!todo)
            return;
        switch (todo.state) {
            case Model_1.TodoState.Active:
                todo.state = Model_1.TodoState.Complete;
                break;
            case Model_1.TodoState.Complete:
                todo.state = Model_1.TodoState.Active;
                break;
        }
    };
    TodoService.prototype._find = function (todoId) {
        var filtered = this.todos.filter(function (x) { return x.id == todoId; });
        if (filtered.length) {
            return filtered[0];
        }
        return null;
    };
    __decorate([
        log
    ], TodoService.prototype, "add", null);
    return TodoService;
}());
exports.default = TodoService;
function log(target, methodName, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(methodName + "(" + JSON.stringify(args) + ")");
        var returnValue = originalMethod.apply(this, args);
        console.log(methodName + "(" + JSON.stringify(args) + ") => " + JSON.stringify(returnValue));
        return returnValue;
    };
}
