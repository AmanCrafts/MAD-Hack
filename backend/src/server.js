import express from 'express';
import { ENV } from './config/env.js';
import { connectDB } from './config/db.js';
import topicRoutes from './routes/topic.route.js';

const app = express();
const PORT = ENV.PORT || 3000;

app.use(express.json());

// Connect to Database
connectDB();

app.use('/api/topics', topicRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})