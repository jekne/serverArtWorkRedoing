const { Router } = require("express");
const authMiddleware = require("../auth/middleware");
const Artwork = require("../models/").artwork;
const Bid = require("../models/").bid;
const User = require("../models/").user;
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

//GET ALL THE ARTWORKS INCLUDING THE BIDS BY ID
//http GET :4000/artworks/withbids/1

router.get("/withbids/:id", async (req, res, next) => {
  try {
    const params = req.params;
    const id = parseInt(req.params.id);
    console.log("my id", id);
    const getArtworkByIdIncludeBid = await Artwork.findByPk(id, {
      include: { model: Bid },
    });
    if (!getArtworkByIdIncludeBid) {
      res.status(404).send(`The id provided ${id}, was not founded`);
    } else {
      res.status(200).send({
        message: `This is the Artwork correspondent a id ${id}, Bids include`,
        getArtworkByIdIncludeBid: getArtworkByIdIncludeBid,
      });
    }
  } catch (e) {
    console.log(e);
  }
  next();
});

//INCREASE THE NUMBER OF HEARTS
//http PATCH :4000/artworks/1  hearts=10

router.patch("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);

    const artwork = await Artwork.findByPk(id);

    if (!artwork) {
      res.status(404).send(`The id provided ${id}, was not founded`);
    }
    const updateHearts = await artwork.update({
      hearts: artwork.hearts + 1,
    });

    const { hearts } = updateHearts;

    if (!hearts) {
      res
        .status(404)
        .send(`When updating artwork's heart filed, no hearts were found`);
    }

    res.status(200).send({
      message: `This is the Artwork correspondent a id ${id}, the hearts was update`,
      hearts,
    });
  } catch (e) {
    console.log(e);
  }
  next();
});

module.exports = router;
