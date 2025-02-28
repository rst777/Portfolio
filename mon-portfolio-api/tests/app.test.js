const request = require('supertest');
const app = require('../src/app');
const Project = require('../src/models/project.model');

describe('Project API', () => {
    let createdProjectId = null;

    // Test de la route d'accueil
    it('GET / should return 200 and welcome message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
    });

    it('GET /unknown should return 404', async () => {
        const response = await request(app).get('/unknown');
        expect(response.statusCode).toBe(404);
    });

    it('GET /api/projects should return 200', async () => {
        const response = await request(app).get('/api/projects');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true); // Vérifie que la réponse est un tableau
    });

    it('POST /api/projects with JSON data should create a new project', async () => {
        const newProject = { title: 'Test Project' };
        const response = await request(app)
            .post('/api/projects')
            .send(newProject)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json');

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toBe('Test Project');
        createdProjectId = response.body.id; // Stocke l'ID du projet créé
    });

    afterAll(async () => {
        if (createdProjectId) {
            try {
                await Project.remove(createdProjectId);
                console.log('Project removed with ID:', createdProjectId);
            } catch (error) {
                console.error('Error removing project:', error);
            }
        }

        try {
            await Project.closeConnection();
            console.log('Database connection closed');
        } catch (error) {
            console.error('Error closing database connection:', error);
        }
    });
});
