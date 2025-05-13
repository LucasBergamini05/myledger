import { z } from 'zod';

export const requiredStringSchema = (message: string) => z.string().min(1, message);
