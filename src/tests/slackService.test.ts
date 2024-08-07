import axios from 'axios';
import { sendLinkToSlack } from '../services/slackService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Slack Service', () => {
    beforeAll(() => {
        process.env.SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/test/webhook';
    });

    it('should send link to Slack', async () => {
        mockedAxios.post.mockResolvedValue({ status: 200 });

        await expect(sendLinkToSlack('test-email', 'https://link.com'))
            .resolves.not.toThrow();

        expect(mockedAxios.post).toHaveBeenCalledWith(
            process.env.SLACK_WEBHOOK_URL,
            expect.objectContaining({ text: expect.stringContaining('https://link.com') })
        );
    });
});
