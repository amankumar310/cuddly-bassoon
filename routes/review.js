const express = require("express");
const router = express.Router({ mergeParams: true });
// const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
// const Reviews = require("../models/reviews.js");
const { validateReview, isLogedIn, isReviewAuther } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js")

// Reviews
// Post review route
router.post("/", isLogedIn, validateReview, wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId", isLogedIn, isReviewAuther, wrapAsync(reviewController.destroyReview));

module.exports = router;
