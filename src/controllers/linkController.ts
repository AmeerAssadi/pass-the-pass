import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { encrypt, decrypt } from '../services/encryptionService';
import SensitiveData from '../models/SensitiveData';

export const generateLink = async (req: Request, res: Response) => {
    const { sensitiveData, expirationTime } = req.body;

    if (!sensitiveData || sensitiveData.trim() === '') {
        return res.status(400).json({ error: 'Sensitive data cannot be empty' });
    }

    const allowedExpirationTimes = [600000, 1800000, 3600000];
    if (!allowedExpirationTimes.includes(parseInt(expirationTime))) {
        return res.status(400).json({ error: 'Invalid expiration time' });
    }

    const id = uuidv4();
    const encryptedData = encrypt(sensitiveData);
    const expiresAt = new Date(Date.now() + parseInt(expirationTime));

    await SensitiveData.create({
        id,
        data: encryptedData,
        expiresAt,
    });

    const link = `${process.env.BASE_URL}/api/links/${id}`;
    res.status(201).json({ link });
};

export const viewData = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await SensitiveData.findOne({ where: { id } });

    if (!data || new Date() > data.expiresAt) {
        return res.status(404).send('Data not found or has expired.');
    }

    const decryptedData = decrypt(data.data);
    await data.destroy();

    res.render('viewData', { decryptedData });
};

export const getDataJson = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await SensitiveData.findOne({ where: { id } });

    if (!data || new Date() > data.expiresAt) {
        return res.status(404).json({ error: 'Data not found or has expired.' });
    }

    const decryptedData = decrypt(data.data);
    await data.destroy();

    res.json({ data: decryptedData });
};
