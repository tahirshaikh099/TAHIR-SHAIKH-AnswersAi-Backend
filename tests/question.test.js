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

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjY0M2MyN2JjOTVmYzNiNjY2N2M3NWYiLCJpYXQiOjE3MTgxMjI5MTcsImV4cCI6MTcxODIwOTMxN30.pgPollq-jIRdiyu_SQSwK59vV1yYgUp3-TdhLWdpnEw"

describe('Question API', () => {
    it('should create a new question', async () => {
        const res = await request(app)
            .post('/api/questions')
            .send({
                questionText: 'What is AI?',
            })
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('questionText');
    });

    it('should fetch a specific question', async () => {
        const res = await request(app)
            .get('/api/questions/your_question_id')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('questionText');
    });
});
