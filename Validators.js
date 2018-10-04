"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ValidatableTodo = /** @class */ (function () {
    function ValidatableTodo() {
    }
    __decorate([
        required,
        regex("^[a-zA-Z ]*$")
    ], ValidatableTodo.prototype, "name", void 0);
    ValidatableTodo = __decorate([
        validatable
    ], ValidatableTodo);
    return ValidatableTodo;
}());
exports.ValidatableTodo = ValidatableTodo;
function validate() {
    var validators = [].concat(this._validators), errors = [];
    for (var _i = 0, validators_1 = validators; _i < validators_1.length; _i++) {
        var validator = validators_1[_i];
        var result = validator(this);
        if (!result.isValid) {
            errors.push(result);
        }
    }
    return errors;
}
exports.validate = validate;
function validatable(target) {
    target.prototype.validate = validate;
}
exports.validatable = validatable;
function required(target, propertyName) {
    var validatable = target, validators = validatable._validators || (validatable._validators = []);
    validators.push(function (instance) {
        var propertyValue = instance[propertyName], isValid = propertyValue != undefined;
        if (typeof propertyValue === 'string') {
            isValid = propertyValue && propertyValue.length > 0;
        }
        return {
            isValid: isValid,
            message: propertyName + " is required",
            property: propertyName,
        };
    });
}
exports.required = required;
function regex(pattern) {
    var expression = new RegExp(pattern);
    return function regex(target, propertyName) {
        var validatable = target, validators = validatable._validators || (validatable._validators = []);
        validators.push(function (instance) {
            var propertyValue = instance[propertyName], isValid = expression.test(propertyValue);
            return {
                isValid: isValid,
                message: propertyName + " does not match " + expression,
                property: propertyName,
            };
        });
    };
}
exports.regex = regex;
