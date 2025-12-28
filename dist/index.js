"use strict";
// Main entry point for Bengali Slang Translator
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translator = exports.BengaliSlangTranslator = exports.TranslationEngine = exports.RegionalAdapter = exports.SafetyValidator = exports.LexiconService = void 0;
exports.main = main;
__exportStar(require("./types"), exports);
__exportStar(require("./data/lexicon"), exports);
// Export service implementations (not interfaces to avoid conflicts)
var LexiconService_1 = require("./services/LexiconService");
Object.defineProperty(exports, "LexiconService", { enumerable: true, get: function () { return LexiconService_1.LexiconService; } });
var SafetyValidator_1 = require("./services/SafetyValidator");
Object.defineProperty(exports, "SafetyValidator", { enumerable: true, get: function () { return SafetyValidator_1.SafetyValidator; } });
var RegionalAdapter_1 = require("./services/RegionalAdapter");
Object.defineProperty(exports, "RegionalAdapter", { enumerable: true, get: function () { return RegionalAdapter_1.RegionalAdapter; } });
var TranslationEngine_1 = require("./services/TranslationEngine");
Object.defineProperty(exports, "TranslationEngine", { enumerable: true, get: function () { return TranslationEngine_1.TranslationEngine; } });
var BengaliSlangTranslator_1 = require("./BengaliSlangTranslator");
Object.defineProperty(exports, "BengaliSlangTranslator", { enumerable: true, get: function () { return BengaliSlangTranslator_1.BengaliSlangTranslator; } });
const BengaliSlangTranslator_2 = require("./BengaliSlangTranslator");
// Main application function
function main() {
    console.log('🗺️ The Local Guide: Bengali Slang Translator');
    console.log('Kiro - The Local Dada is ready to help!');
    const translator = new BengaliSlangTranslator_2.BengaliSlangTranslator();
    // Example usage
    console.log('\nExample translations:');
    console.log(translator.getFormattedResponse('lyadh'));
    console.log('\n' + '='.repeat(50) + '\n');
    console.log(translator.getFormattedResponse('fatafati'));
    return translator;
}
// Export default instance
exports.translator = new BengaliSlangTranslator_2.BengaliSlangTranslator();
//# sourceMappingURL=index.js.map