import { Request, Response } from 'express';
import { sendLinkToSlack } from '../services/slackService';

export const sendLink = async (req: Request, res: Response) => {
    const { email, link } = req.body;

    try {
        await sendLinkToSlack(email, link);
        res.status(200).send('Link sent via Slack');
    } catch (error) {
        res.status(500).send('Failed to send link via Slack');
    }
};
