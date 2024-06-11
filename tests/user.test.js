const request = require('supertest');
const app = require('../src/app');

describe('POST /api/users', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ username: 'testuser', password: 'testpassword' });
        
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('username', 'testuser');
    });
});
