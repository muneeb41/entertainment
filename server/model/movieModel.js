const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    email:{
        type: String,
        required : true
    },
    adult: {
        type: Boolean,
        required: true
      },
      backdrop_path: {
        type: String,
      },
      genre_ids: {
        type: [Number]
      },
      id: {
        type: Number,
        required: true
      },
      original_language: {
        type: String
      },
      original_title: {
        type: String,
        required: true
      },
      overview: {
        type: String,
        required: true
      },
      popularity: {
        type: Number,
        required: true
      },
      poster_path: {
        type: String,
        required: true
      },
      release_date: {
        type: Date
      },
      title: {
        type: String,
        required: true
      },
      video: {
        type: Boolean
      },
      vote_average: {
        type: Number
      },
      vote_count: {
        type: Number
      }
})

const MovieModel = mongoose.model('movieBookmark', movieSchema);

module.exports = MovieModel;