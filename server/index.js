const express = require('express')
const dotenv = require('dotenv')
const dbConnection = require('./config/config.js')
const cors = require('cors')
const userRouter = require('./routes/userRouter.js')
const movieRouter = require('./routes/movieRouter.js')
const tvRouter = require('./routes/tvRouter.js')
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swaggerOptions.js'); // Swagger config




const app = express();
dotenv.config()


//database connection
dbConnection();


//middleware
app.use(express.json());


const allowedOrigins = [  // Define allowed origins
    'https://entertainment-client.onrender.com', // Production URL
    'http://localhost:5173' // Local development URL
  ];
  
app.use(cors({
  origin: allowedOrigins,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
  



// Swagger setup
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// routes 
app.use('/user',userRouter);
app.use('/movie',movieRouter);
app.use('/tv',tvRouter);


app.listen(process.env.PORT,()=>{
    console.log(`server is running ${process.env.PORT}`)
})