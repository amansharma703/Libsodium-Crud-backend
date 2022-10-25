import morgan from 'morgan';
import { Request, Response } from 'express';

morgan.token('message', (req: Request, res: Response) => res.locals.errorMessage || '');

const successResponseFormat = `:method :url :status - :response-time ms`;
const errorResponseFormat = `$:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
    skip: (req: Request, res: Response) => res.statusCode >= 400,
    stream: { write: (message: string) => console.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
    skip: (req: Request, res: Response) => res.statusCode < 400,
    stream: { write: (message: string) => console.error(message.trim()) },
});

export default {
    successHandler,
    errorHandler,
};
