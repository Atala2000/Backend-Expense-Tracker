import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    session: any;
}

export const isAuthenticated = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.session.user) {
        next(); 
    } else {
        res.status(401).send('Unauthorized'); 
    }
};
