import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import resourceRoutes from './routes/resourceRoutes';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
mongoose.connect((process.env.MONGO_URI as string))
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/resources', resourceRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
