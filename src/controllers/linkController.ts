import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { SensitiveData } from '../models/SensitiveData';
import { encrypt, decrypt } from '../services/encryptionService';

const dataStore: Map<string, SensitiveData> = new Map();

export const generateLink = (req: Request, res: Response) => {
    const { sensitiveData } = req.body;
    const id = uuidv4();
    const encryptedData = encrypt(sensitiveData);

    dataStore.set(id, { id, data: encryptedData, createdAt: new Date() });
    const link = `${process.env.BASE_URL}/api/links/${id}`;
    res.status(201).json({ link });
};

export const viewData = (req: Request, res: Response) => {
    const { id } = req.params;
    const data = dataStore.get(id);

    if (!data) {
        return res.status(404).send('Data not found or already accessed.');
    }

    const decryptedData = decrypt(data.data);
    dataStore.delete(id);

    res.json({ data: decryptedData });
};
