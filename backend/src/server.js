import express from 'express';
import { ENV } from './config/env.js';


import topicRoutes from './routes/topic.route.js';

const app = express();
const PORT = ENV.PORT || 3000;


app.use(express.json());

app.use('/api/topics', topicRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})