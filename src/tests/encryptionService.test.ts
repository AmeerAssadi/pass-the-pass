import { encrypt, decrypt } from '../services/encryptionService';

describe('Encryption Service', () => {
    it('should encrypt and decrypt data correctly', () => {
        const data = 'sensitive data';
        const encryptedData = encrypt(data);
        const decryptedData = decrypt(encryptedData);

        expect(decryptedData).toBe(data);
    });
});
