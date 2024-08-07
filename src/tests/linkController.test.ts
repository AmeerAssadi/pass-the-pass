import request from 'supertest'; // Default import
import app from '../app';

describe('Link Controller', () => {
    it('should generate a secure link and retrieve the data', async () => {
        const response = await request(app)
            .post('/api/links/generate')
            .send({ sensitiveData: 'test data' });

        expect(response.status).toBe(201);
        expect(response.body.link).toBeDefined();

        const link = response.body.link.split('/').pop();

        const dataResponse = await request(app)
            .get(`/api/links/${link}`);

        expect(dataResponse.status).toBe(200);
        expect(dataResponse.body.data).toBe('test data');
    });

    it('should not retrieve data twice', async () => {
        const response = await request(app)
            .post('/api/links/generate')
            .send({ sensitiveData: 'test data' });

        const link = response.body.link.split('/').pop();

        await request(app).get(`/api/links/${link}`);
        const secondResponse = await request(app).get(`/api/links/${link}`);

        expect(secondResponse.status).toBe(404);
    });
});
