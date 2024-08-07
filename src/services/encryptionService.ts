import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKeyBase64 = process.env.ENCRYPTION_KEY;

if (!secretKeyBase64) {
    throw new Error('Encryption key not set in environment variables');
}

const secretKey = Buffer.from(secretKeyBase64, 'base64');

if (secretKey.length !== 32) {
    throw new Error('Encryption key must be 32 bytes for AES-256');
}

export const encrypt = (text: string) => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (hash: string) => {
    const [iv, content] = hash.split(':');
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);

    return decrypted.toString();
};
