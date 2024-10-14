const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'API-TASK API',
        description: 'API documentation for API-TASK',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/userRoutes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
