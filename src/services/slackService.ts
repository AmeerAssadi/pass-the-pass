import axios from 'axios';

export const sendLinkToSlack = async (email: string, link: string) => {
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhookUrl) {
        throw new Error('Slack webhook URL not configured');
    }

    const message = {
        text: `Secure link for sensitive data: ${link}`,
        channel: email,
    };

    await axios.post(slackWebhookUrl, message);
};
