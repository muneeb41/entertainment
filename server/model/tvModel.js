const mongoose = require('mongoose');
const { Schema } = mongoose;


const tvSchema = new Schema({
    email:{
        type: String,
        required : true
    },
    adult: {
        type: Boolean,
        required: true
      },
      backdrop_path: {
        type: String
      },
      genre_ids: {
        type : [Number] // Array of genre IDs
      },
      id: {
        type: Number,
        required: true
      },
      origin_country: {
        type: [String]
      },
      original_language: {
        type: String
      },
      original_name: {
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
      first_air_date: {
        type: String
      },
      name: {
        type: String
      },
      vote_average: {
        type: Number
      },
      vote_count: {
        type: Number
      }
})


const TvModel = mongoose.model('tvBookmark', tvSchema);

module.exports = TvModel;