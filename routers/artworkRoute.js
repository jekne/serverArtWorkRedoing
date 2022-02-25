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
      order: [[{ model: Bid }, "amount", "DESC"]],
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

// create a new artwork, to have an auction:
//http -v POST :4000/artworks/4 title=JohannTeste minimumBid=100 imageUrl=GoodPicture

router.post("/:userId", authMiddleware, async (req, res, next) => {
  try {
    // HERE WE GET OUT THE ID OF THE USER THAT MADE THE TOKEN
    const logged_in_user = req.user.id;
    console.log(" I AMMMMMMMM");

    console.log("THIS IS THE LOGGED_IN_USER", logged_in_user);
    const user = await User.findByPk(logged_in_user);

    if (!user) {
      res.status(404).send("The user was not found");
    } else {
      res.status(200).send({ message: "authorized", user: user });
      const { title, minimumBid, imageUrl } = req.body;
      console.log(
        `The new story with the title ${title}, minimumBid ${minimumBid} and imageUrl ${imageUrl} was create`
      );
      // const params = req.params;
      const userId = parseInt(req.params.userId);
      console.log("my id", userId);
      if (!title) {
        res.status(404).send("Need to provided a title");
      }
      if (!minimumBid) {
        res.status(404).send("Need to provided a minimumBid");
      }
      if (!imageUrl) {
        res.status(404).send("Need to provided a imageUrl");
      }
      const checkuserId = await Artwork.findByPk(userId);
      if (!checkuserId) {
        res.status(404).send("This space id do not belong a valid story");
      }
      const createNewStory = await Artwork.create({
        title,
        minimumBid,
        imageUrl,
        userId,
        hearts: 0,
      });

      if (!createNewStory) {
        res.status(404).send("Something get wrong");
      } else {
        res.status(200).send({
          message: `The new story with the title ${title}, minimumBid ${minimumBid} and imageUrl ${imageUrl} was create`,
          createNewStory: createNewStory,
        });
      }
    }
  } catch (e) {
    console.log(e);
  }

  next();
});

module.exports = router;
