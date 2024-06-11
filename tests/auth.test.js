const request = require('supertest');
const app = require('../src/app');

describe('POST /api/auth/login', () => {
    it('should login user and return a token', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });
});
