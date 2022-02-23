const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Artwork = require("../models/").artwork;
const Bid = require("../models/").bid;
const router = new Router();

//GET ALL THE ARTWORKS
// http GET :4000/artworks
router.get("/", async (req, res, next) => {
  try {
    const getAllArtworks = await Artwork.findAll();
    if (!getAllArtworks) {
      res.status(404).send("Something wrong happened");
    }
    res
      .status(200)
      .send({ message: "All the Artworks", getAllArtworks: getAllArtworks });
  } catch (e) {
    console.log(e);
  }
});

//GET ALL THE ARTWORKS INCLUDING THE BIDS
//http GET :4000/artworks/withbids
router.get("/withbids", async (req, res, next) => {
  try {
    const artworkAndBids = await Artwork.findAll({ include: Bid });
    if (!artworkAndBids) {
      res.status(404).send("Something wrong happened");
    }
    res.status(200).send({
      message: "All the Artworks including the Bid",
      artworkAndBids: artworkAndBids,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
