const mongoose = require('mongoose');
// const review = require('./review');
const Schema = mongoose.Schema;
const Review = require('../models/review.js');

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectID,
            ref: "Review",
        },
    ],
    owner : {
        type: Schema.Types.ObjectID,
        ref: "User",
        required: true,
    },
    category: {
        type: String,
        enum: ["Mountains", "Arctic", "Amazing Pools", "Castles", "Trending", "Rooms", "Iconic Cities", "Camping", "Farms", "Boats", "Domes"]
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
