import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export { db, mongoose };
