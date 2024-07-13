const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'Mokshitha@18', // replace with your MySQL password
    database: 'cinema' 
});

// Connect to MySQL
db.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
});

// 1. Manage Genres
app.post('/genres', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO genres (name) VALUES (?)', [name], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: results.insertId, name });
    });
});

app.delete('/genres/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM genres WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Genre not found.' });
        res.status(200).json({ message: 'Genre removed.' });
    });
});


// 2. Add Movie
app.post('/movies', (req, res) => {
    const movie = req.body;
    db.query('INSERT INTO movies (name, ticket_price, language, description, show_timings, theatre, is_showing) VALUES (?, ?, ?, ?, ?, ?, ?)', 
        [movie.name, movie.ticket_price, movie.language, movie.description, JSON.stringify(movie.show_timings), movie.theatre, movie.is_showing],
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: results.insertId, ...movie });
        });
});

// 3. Update Movie
app.put('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = req.body;
    db.query('UPDATE movies SET name = ?, ticket_price = ?, language = ?, description = ?, show_timings = ?, theatre = ?, is_showing = ? WHERE id = ?', 
        [movie.name, movie.ticket_price, movie.language, movie.description, JSON.stringify(movie.show_timings), movie.theatre, movie.is_showing, id], 
        (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            if (results.affectedRows === 0) return res.status(404).json({ error: 'Movie not found.' });
            res.status(200).json({ id: id, ...movie });
        });
});

// 4. Delete Movie
app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM movies WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Movie not found.' });
        res.status(200).json({ message: 'Movie deleted.' });
    });
});

// 5. Enable/Disable Movie Shows
app.put('/movies/:id/toggle_show', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE movies SET is_showing = NOT is_showing WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Movie not found.' });
        res.status(200).json({ message: 'Movie show status toggled.' });
    });
});


app.get('/movies', (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

app.get('/genres', (req, res) => {
    db.query('SELECT * FROM genres', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

// 6. Get Movies by Theatre
app.get('/theatres/:theatreName/movies', (req, res) => {
    const { theatreName } = req.params;
    db.query('SELECT * FROM movies WHERE theatre = ?', [theatreName], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
