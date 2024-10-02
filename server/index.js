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
  
const corsOptions = {  // CORS options
    origin: (origin, callback) => {
      // Check if the origin is in the allowed origins
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Block the request
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
app.use(cors(corsOptions));  // Enable CORS with the specified options



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