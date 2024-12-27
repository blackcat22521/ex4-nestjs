import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
export interface IRequest extends Request {
    user?: string;
}
export declare class LoggerMiddleware implements NestMiddleware {
    use(req: IRequest, res: Response, next: NextFunction): void;
}
