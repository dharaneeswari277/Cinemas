import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieForm = () => {
    const [movies, setMovies] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        duration: '',
        ticket_price: '',
        language: '',
        description: '',
        show_timings: '',
        theatre: '',
        image: null, 
        is_showing: true,
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('http://localhost:5000/movies');
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        try {
            if (editingId) {
                await axios.put(`http://localhost:5000/movies/${editingId}`, formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                await axios.post('http://localhost:5000/movies', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
            resetForm();
            fetchMovies();
        } catch (error) {
            console.error('Error saving movie:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            duration: '',
            ticket_price: '',
            language: '',
            description: '',
            show_timings: '',
            theatre: '',
            image: null,
            is_showing: true,
        });
        setEditingId(null);
    };

    const handleEdit = (movie) => {
        setFormData(movie);
        setEditingId(movie.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/movies/${id}`);
            fetchMovies();
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    return (
        <div>
            <header>
                <nav className="main-nav">
                    <a href="/">NMS Cinemas</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/view">View Movies</a>
                    <a href="/manage">Manage Movies</a>
                </nav>
            </header>
            <div className="movie-form-container">
                <h2>Movie Management</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Movie Name" required />
                    </label>
                    <label>
                        Duration:
                        <input name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Duration" required />
                    </label>
                    <label>
                        Ticket Price:
                        <input name="ticket_price" type="number" value={formData.ticket_price} onChange={handleInputChange} placeholder="Ticket Price" required />
                    </label>
                    <label>
                        Language:
                        <input name="language" value={formData.language} onChange={handleInputChange} placeholder="Language" required />
                    </label>
                    <label>
                        Description:
                        <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" required />
                    </label>
                    <label>
                        Show Timings:
                        <input name="show_timings" value={formData.show_timings} onChange={handleInputChange} placeholder="Show Timings (comma-separated)" required />
                    </label>
                    <label>
                        Theatre:
                        <input name="theatre" value={formData.theatre} onChange={handleInputChange} placeholder="Theatre" required />
                    </label>
                    <label>
                        Upload Image:
                        <input type="file" onChange={handleFileChange} required />
                    </label>
                    <button type="submit">{editingId ? 'Update Movie' : 'Add Movie'}</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Movie Name</th>
                            <th>Price</th>
                            <th>Language</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(movie => (
                            <tr key={movie.id}>
                                <td>{movie.name}</td>
                                <td>{movie.ticket_price}</td>
                                <td>{movie.language}</td>
                                <td>
                                    <button onClick={() => handleEdit(movie)}>Edit</button>
                                    <button onClick={() => handleDelete(movie.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MovieForm;
