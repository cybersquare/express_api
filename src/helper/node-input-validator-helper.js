const { Validator, extendMessages, setLang, extend } = require('node-input-validator');
const message = require("./message.json");
const mongoose = require("mongoose");

module.exports.niv = (lang, data, validations) => {
    extendMessages({
        required: message.required[lang],
        equals: message.passwordMismatch[lang],
        objectId: message.invalidId[lang]
    }, lang);

    setLang(lang);

    extend('arrayLength', ({ value, args }) => {
        if (Array.isArray(value)) {
            if (value.length <= parseInt(args[0])) {
                return true;
            }
        }
        return false;
    });

    extend('objectId', ({ value }) => {
        if (mongoose.isValidObjectId(value)) {
            return true;
        }
        return false;
    });


    const validateReq = new Validator(data, validations);
    return validateReq;
}