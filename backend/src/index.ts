import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import articlesRouter from './routes/articles';
import collectionsRouter from './routes/collections';
import trendsRouter from './routes/trends';
import authRouter from './routes/auth';
import commentsRouter from './routes/comments';
import savedRouter from './routes/saved';
import userPostsRouter from './routes/userPosts';
import path from "path";
import uploadRouter from './routes/upload';
import feedRouter from './routes/feed';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/articles', articlesRouter);
app.use('/api/collections', collectionsRouter);
app.use('/api/trends', trendsRouter);
app.use('/api/auth', authRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/saved', savedRouter);
app.use('/api/posts', userPostsRouter);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/upload', uploadRouter);
app.use('/api/feed', feedRouter);

app.listen(process.env.PORT || 5000, () => {
    console.log(`✅ Vibe Backend running on http://localhost:5000`);
});