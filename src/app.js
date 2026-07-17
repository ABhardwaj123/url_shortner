import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './modules/auth/auth.routes.js';
import urlRoutes from './modules/urls/url.routes.js'
import redirectRoutes from './modules/urls/redirect.routes.js'
import analyticsRoutes from './modules/analytics/analytics.routes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/urls' , urlRoutes)
app.use('/', redirectRoutes)

app.use('/api/analytics', analyticsRoutes);

export default app;