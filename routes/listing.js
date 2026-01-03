const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const { isLogedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js")
const upload = multer({ storage });


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLogedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing));


//New route
router.get("/new", isLogedIn, listingController.rederNewForm);


router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLogedIn, isOwner, upload.single('listing[image]'),
        validateListing, wrapAsync(listingController.updateListing))
    .delete(isLogedIn, isOwner,
        wrapAsync(listingController.deleteListing));

// Index Route
// router.get("/", wrapAsync(listingController.index));


//Show route
// router.get("/:id", wrapAsync(listingController.showListing));

//Create route
// router.post("/", isLogedIn, validateListing, wrapAsync(listingController.createListing));

//Edit route
router.get("/:id/edit", isLogedIn, isOwner, wrapAsync(listingController.renderEditForm));

//Update route
// router.put("/:id", isLogedIn, isOwner,
//     validateListing, wrapAsync(listingController.updateListing));

//Delete route
// router.delete("/:id", isLogedIn, isOwner,
//     wrapAsync(listingController.deleteListing));


module.exports = router;