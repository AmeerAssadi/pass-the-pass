import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import { ensureAuthenticated } from './middleware/authMiddleware';
import sequelize from './database';
import linkRoutes from './routes/linkRoutes';
import slackRoutes from './routes/slackRoutes';
import './config/passport';

const app = express();

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'your-session-secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    } else {
        res.sendFile(path.join(__dirname, '../public/signin.html'));
    }
});

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/');
    }
);

app.use('/api/links', ensureAuthenticated, linkRoutes);
app.use('/api/slack', ensureAuthenticated, slackRoutes);

app.use(ensureAuthenticated, express.static(path.join(__dirname, '../public')));

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

sequelize.sync().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Failed to synchronize database:', error);
});

export default app;
