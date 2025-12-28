"use strict";
// Core data types for Bengali Slang Translator
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToneStyle = exports.Region = exports.SafetyLevel = void 0;
var SafetyLevel;
(function (SafetyLevel) {
    SafetyLevel["SAFE_FRIENDLY"] = "Safe / Friendly";
    SafetyLevel["FRIENDLY_ROAST"] = "Friendly Roast";
    SafetyLevel["OFFENSIVE_ANNOYING"] = "Offensive / Annoying";
    SafetyLevel["DO_NOT_USE"] = "Do not use";
})(SafetyLevel || (exports.SafetyLevel = SafetyLevel = {}));
var Region;
(function (Region) {
    Region["KOLKATA"] = "Kolkata";
    Region["BARDHAMAN"] = "Bardhaman";
    Region["TARAKESWAR_HOOGHLY"] = "Tarakeswar/Hooghly";
})(Region || (exports.Region = Region = {}));
var ToneStyle;
(function (ToneStyle) {
    ToneStyle["LIGHT_WITTY"] = "light_witty";
    ToneStyle["EARTHY_RESPECTFUL"] = "earthy_respectful";
    ToneStyle["EXTRA_CAUTIOUS"] = "extra_cautious";
})(ToneStyle || (exports.ToneStyle = ToneStyle = {}));
//# sourceMappingURL=index.js.map