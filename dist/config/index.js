"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const loadConfig = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    country: process.env.COUNTRY,
    nodeEnv: process.env.NODE_ENV,
});
exports.loadConfig = loadConfig;
//# sourceMappingURL=index.js.map