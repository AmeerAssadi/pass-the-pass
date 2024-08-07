import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

import app from './app';

const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
