require('dotenv').config();
const express = require('express');
const path = require('path');

const userRoutes = require('./src/routes/userRoutes');
const exhibitionRoutes = require('./src/routes/exhibitionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/exhibitions', exhibitionRoutes);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})