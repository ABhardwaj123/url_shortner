import connectDB from './config/db.js';
import redis from './config/redis.js';
import app from './app.js'

connectDB();

const PORT = process.env.PORT || 5000
app.listen(PORT , () => console.log(`server is running on port ${PORT}`))