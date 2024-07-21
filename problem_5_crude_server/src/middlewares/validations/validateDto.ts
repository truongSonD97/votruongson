import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware(type: any): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = plainToInstance(type, req.body);
    const errors: ValidationError[] = await validate(dto);
    if (errors.length > 0) {
      res.status(400).json({ errors: errors.map(error => Object.values(error.constraints || {})).flat() });
    } else {
      req.body = dto;
      next();
    }
  };
}
