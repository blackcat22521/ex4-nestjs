"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let GlobalInterceptor = class GlobalInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        console.log(`Incoming Request: ${request.method} ${request.url}`);
        const now = Date.now();
        return next.handle().pipe((0, operators_1.tap)(() => console.log(`Outgoing Response: ${request.method} ${request.url} - ${Date.now() - now}ms`)), (0, operators_1.map)((data) => {
            return {
                ...data,
                customField: 'Handled by Global Interceptor',
            };
        }));
    }
};
exports.GlobalInterceptor = GlobalInterceptor;
exports.GlobalInterceptor = GlobalInterceptor = __decorate([
    (0, common_1.Injectable)()
], GlobalInterceptor);
//# sourceMappingURL=logging.interceptor.js.map