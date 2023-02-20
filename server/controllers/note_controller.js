'use strict';

const Note = require('../models/note_schema');

const createNote = (req, res) => {
    console.log('New Note Created!', req.body);
    Note.create(req.body)
        .then((data) => {
            console.log('New Note Created!', data);
            res.status(201).json(data);
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                console.error('Error Validating!', err);
                res.status(422).json(err);
            } else {
                console.error(err);
                res.status(500).json(err);
            }
        });
};

const readNote = (req, res) => {

    Note.find( {user_id : req.user.userId})
        .then((data) => {
            
            console.log('Your notes', data);
            res.status(200).json(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        }); 
};

const updateNote = (req, res) => {
    Note.findByIdAndUpdate(req.params.id, req.body, {
        useFindAndModify: false,
        new: true,
    })
        .then((data) => {
            console.log('Note updated!');
            res.status(201).json(data);
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                console.error('Error Validating!', err);
                res.status(422).json(err);
            } else {
                console.error(err);
                res.status(500).json(err);
            }
        });
};

const deleteNote = (req, res) => {
    Note.findById(req.params.id)
        .then((data) => {
            if (!data) {
                throw new Error('Note not available');
            }
            return data.remove();
        })
        .then((data) => {
            console.log('Note removed!');
            res.status(200).json(data);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json(err);
        });
};

module.exports = {
    createNote,
    readNote,
    updateNote,
    deleteNote,
};
