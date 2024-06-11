// tests/question.test.js
const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Question API', () => {
    it('should create a new question', async () => {
        const res = await request(app)
            .post('/api/questions')
            .send({
                questionText: 'What is AI?',
            })
            .set('Authorization', 'Bearer your_token');
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('questionText');
    });

    it('should fetch a specific question', async () => {
        const res = await request(app)
            .get('/api/questions/your_question_id')
            .set('Authorization', 'Bearer your_token');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('questionText');
    });
});
