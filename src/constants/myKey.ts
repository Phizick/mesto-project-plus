import crypto from 'crypto';

export const mySecretKey = crypto.randomBytes(32).toString('hex');
