// Standard setup
// Require express to start code
const express = require("express");
// Require cors to start code
const cors = require("cors");
// Set app to express application
const app = express();
const Joi = require("joi");
// For images
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
// Access .env credentials
require("dotenv").config();

// Set .env credentials to consts
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const cluster = process.env.CLUSTER;
const cLink = process.env.CLUSTER_LINK;
const db = process.env.DB;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/reviews/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// mongodb+srv://<username>:<pw>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority&appName=<cluster>
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@${cLink}.mongodb.net/${db}?retryWrites=true&w=majority&appName=${cluster}`
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

const reviewSchema = new mongoose.Schema({
  reviewer: String,
  content: String,
  rating: Number,
  item: String,
  image: String,
});

const Review = mongoose.model("Review", reviewSchema);

// When you go to default "/", execute function
// HTTP request and HTTP response
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Posts are hardcoded into server due to lack of CRUD operations
let posts = [
  {
    _id: 0,
    game: ["Buckshot Roulette"],
    headline: "The Devastating Reality of Gambling Addiction",
    lede: "How a simple horror game beautifully depicts the painful journey of falling too deep into a gambling addiction.",
    thumbnail: {
      name: "buckshot-roulette/buckshot-thumb.jpg",
      credit: [
        {
          dev: "Mike Klubnika",
          url: "https://store.steampowered.com/app/2835570/Buckshot_Roulette/",
        },
      ],
      alt: "A general liability form that the player has to sign before playing the game.",
    },
    seo: "buckshot-roulette",
    date: "May 20th, 2024",
    subtitle:
      "Despite the simplicity of the game, Buckshot Roulette (2024) paints a story about the harrowing reality of gambling addiction and the lengths people will go to satiate their addiction.",
    content: [
      {
        line: "The protagonist was doomed the moment you started the game.",
        image: {},
      },
      {
        line: 'From the adrenaline-pumping music to the intensity of the amped-up Russian roulette you play with the dealer, it is easy to miss the tragedy that is taking place here: regardless of whether you "win" or "lose", the protagonist has already fallen too deep into a gambling addiction they cannot recover from.',
        image: {},
      },
      {
        line: "Before the game has officially started, the main menu highlights the premise (and the inevitable temptation) of the game through the buckshots raining down on screen. This design choice creates a underlying agreement between you and the game that the actions you take for the character you are playing as may cost them their life.",
        image: {
          name: "buckshot-roulette/buckshot-1.jpg",
          credit: [
            {
              dev: "Mike Klubnika",
              url: "https://store.steampowered.com/app/2835570/Buckshot_Roulette/",
            },
          ],
        },
      },
      {
        line: 'We begin the actual game with the protagonist in a bathroom with loud (but muffled) club music playing outside, the letters "AFRAID" written on the mirror, and pill bottles littering the sink area. This is a crucial but often overlooked detail in the game. In other media such as movies and TV shows, club bathrooms are often used as areas where characters can let go and express themselves fully outside of the suffocating environments they were initial in.',
        image: {
          name: "buckshot-roulette/buckshot-2.jpg",
          credit: [
            {
              dev: "Mike Klubnika",
              url: "https://store.steampowered.com/app/2835570/Buckshot_Roulette/",
            },
          ],
        },
      },
      {
        line: 'By starting in this area, we can assume that the protagonist has come here to calm themselves down before they go to meet the Dealer. The "AFRAID" message could be a representation of the protagonist\'s subconscious, especially... (to be added)',
        image: {},
      },
      {
        line: "To be added",
        image: {
          name: "buckshot-roulette/buckshot-3.jpg",
          credit: [
            {
              dev: "Mike Klubnika",
              url: "https://store.steampowered.com/app/2835570/Buckshot_Roulette/",
            },
          ],
        },
      },
    ],
    tags: ["analysis", "gameplay"],
  },
  {
    _id: 1,
    game: ["Stardew Valley", "Harvest Moon"],
    headline: "Two Farming Games, Two Very Different Experiences",
    lede: "How Stardew Valley's pixel art creates a unique gaming experience compared to its counterparts.",
    thumbnail: {
      name: "stardew-valley-harvest-moon/stardew-valley-harvest-moon-thumb.jpg",
      credit: [
        {
          dev: "ConcernedApe",
          url: "https://www.stardewvalley.net/",
        },
        {
          dev: "Marvelous",
          url: "https://www.bokumono.com/",
        },
      ],
      alt: "Two screenshots from Harvest Moon and Stardew Valley; both show the player character of each game in a farm.",
    },
    seo: "stardew-valley-harvest-moon",
    date: "May 22nd, 2024",
    subtitle:
      "Although Harvest Moon (1996) was released 30 years before Stardew Valley (2016), the latter has seen... (to be added)",
    content: [
      {
        line: "(To be added)",
        image: {},
      },
      {
        line: "(To be added)",
        image: {
          name: "stardew-valley-harvest-moon/stardew-valley-harvest-moon/stardew-1.jpg",
          credit: [
            {
              dev: "ConcernedApe",
              url: "https://www.stardewvalley.net/",
            },
          ],
        },
      },
      {
        line: "(To be added)",
        image: {
          name: "stardew-valley-harvest-moon/harvest-moon-1.jpg",
          credit: [
            {
              dev: "Marvelous",
              url: "https://www.bokumono.com/",
            },
          ],
        },
      },
    ],
    tags: ["analysis", "art style", "throwback"],
  },
  {
    _id: 2,
    game: ["Portal"],
    headline: "Finding Freedom in the Face of Oppression",
    lede: "How Portal's art style and game mechanics captures the struggle between humanity and the relentless forces that seek to constrain it.",
    thumbnail: {
      name: "portal/portal-thumb.jpg",
      credit: [
        {
          dev: "Valve Corporation",
          url: "https://www.valvesoftware.com/en/",
        },
      ],
      alt: "A person coming through an orange portal at the top heading down into a blue portal below them.",
    },
    seo: "portal",
    date: "May 23rd, 2024",
    subtitle:
      "For such a seemingly straightforward game, Portal (2007) has an inspiring message about the enduring spirit of humanity.",
    content: [
      {
        line: "(To be added)",
        image: {},
      },
      {
        line: "(To be added)",
        image: {
          name: "portal/portal-1.jpg",
          credit: [
            {
              dev: "Valve Corporation",
              url: "https://www.valvesoftware.com/en/",
            },
          ],
        },
      },
    ],
    tags: ["analysis", "art style", "gameplay"],
  },
  {
    _id: 3,
    game: ["Brave Fencer Musashi"],
    headline: "A Game that Does Not Get the Love it Deserves",
    lede: "Brave Fencer Musashi (1998) does not get the recognition it deserves and I am here to fix that.",
    thumbnail: {
      name: "musashi/musashi-thumb.jpg",
      credit: [
        {
          dev: "Square (now Square-Enix)",
          url: "https://www.square-enix-games.com/en_US/home",
        },
      ],
      alt: "A zoomed-in view of Brave Fencer Musashi's cover art; the protagonist Musashi is at the fofolderpathront.",
    },
    seo: "musashi",
    date: "May 23rd, 2024",
    subtitle:
      "Brave Fencer Musashi (1998) is a fun, campy action RPG and I believe that we should talk about it more.",
    content: [
      {
        line: "(To be added)",
        image: {},
      },
      {
        line: "(To be added)",
        image: {
          name: "musashi/musashi-1.jpg",
          credit: [
            {
              dev: "Square (now Square-Enix)",
              url: "https://www.square-enix-games.com/en_US/home",
            },
          ],
        },
      },
    ],
    tags: ["analysis", "gameplay", "throwback"],
  },
  {
    _id: 4,
    game: ["Minecraft"],
    headline: "How Adding More Features Can Make a Game Less Fun",
    lede: 'Minecraft (2011) has been inundated with new features to "improve" the gaming experience, but why does it not feel like an improvement?',
    thumbnail: {
      name: "minecraft/minecraft-thumb.jpg",
      credit: [
        {
          dev: "Square (now Square-Enix)",
          url: "https://www.square-enix-games.com/en_US/home",
        },
      ],
      alt: "The player character looking at the night sky while on top of a jungle tree.",
    },
    seo: "minecraft",
    date: "May 24th, 2024",
    subtitle:
      "Minecraft (2011) used to be a lot more fun to play, but why do a lot of players feel like that?",
    content: [
      {
        line: "(To be added)",
        image: {},
      },
      {
        line: "(To be added)",
        image: {
          name: "minecraft/minecraft-mountain.jpg",
          credit: [
            {
              dev: "Mojang",
              url: "https://www.minecraft.net/en-us",
            },
          ],
        },
      },
    ],
    tags: ["analysis", "art style", "gameplay"],
  },
  {
    _id: 5,
    game: ["Delicious"],
    headline:
      "Exploring Toxic Mother-Daughter Relationships in a Seemingly Wholesome Game Series",
    lede: "For such a wholesome time management game series, Delicious (2006) has an often overlooked toxicity between Emily and her mother Evelyn in the earlier games.",
    thumbnail: {
      name: "delicious/delicious-thumb.jpg",
      credit: [
        {
          dev: "GameHouse",
          url: "https://www.gamehouse.com/series/delicious-games-for-windows",
        },
      ],
      alt: "A polaroid picture of the main character Emily as a child cooking with her mother Evelyn.",
    },
    seo: "delicious",
    date: "May 24th, 2024",
    subtitle:
      "The dynamic between Emily and her mother is an often painful reality for many toxic mother-daughter relationships.",
    content: [
      {
        line: "(To be added)",
        image: {},
      },
      {
        line: "(To be added)",
        image: {
          name: "delicious/delicious-1.jpg",
          credit: [
            {
              dev: "GameHouse",
              url: "https://www.gamehouse.com/series/delicious-games-for-windows",
            },
          ],
        },
      },
    ],
    tags: ["analysis", "gameplay", "throwback"],
  },
  {
    _id: 6,
    game: ["NieR: Automata"],
    headline:
      "flower for m[A]chines and What it Means to Be Worthy of Humanity",
    lede: "flower for m[A]chines blurs what it means to be worthy of humanity in NieR: Automata (2017).",
    thumbnail: {
      name: "nier-automata/nier-automata-thumb.jpg",
      credit: [
        {
          dev: "Square Enix",
          url: "https://www.square-enix-games.com/en_US/home",
        },
        {
          dev: "PlatinumGames Inc.",
          url: "https://www.platinumgames.com/",
        },
      ],
      alt: "A picture of 2B, one of the playable characters in the game, mid-air as she attacks an android. There are two other androids to the right of the android that is being attacked.",
    },
    seo: "nier-automata",
    date: "May 25th, 2024",
    subtitle: "Perhaps we aren't the superior species after all.",
    content: [
      {
        line: "(To be added)",
        image: {},
      },
      {
        line: "(To be added)",
        image: {
          name: "nier-automata/nier-automata-1.jpg",
          credit: [
            {
              dev: "Square Enix",
              url: "https://www.square-enix-games.com/en_US/home",
            },
            {
              dev: "PlatinumGames Inc.",
              url: "https://www.platinumgames.com/",
            },
          ],
        },
      },
    ],
    tags: ["analysis", "gameplay"],
  },
  {
    _id: 7,
    game: ["Halo 3"],
    headline: "The Perfect End to the Halo Series",
    lede: "Halo 3 (2007) should have been the end of the Halo series and I will explain why.",
    thumbnail: {
      name: "halo3/halo3-thumb.jpg",
      credit: [
        {
          dev: "Bungie",
          url: "https://www.bungie.net/",
        },
      ],
      alt: "Masterchief, the main character of the game, holding an assault rifle with a halo-shaped structure and debris looming in the background. Cortana, his AI companion throughout the game, can be seen behind him.",
    },
    seo: "halo3",
    date: "May 25th, 2024",
    subtitle:
      "Halo 3 (2007) was a beautiful end to Master Chief's and Cortana's journey together and it should have stayed that way.",
    content: [
      {
        line: "(To be added)",
        image: {},
      },
      {
        line: "(To be added)",
        image: {
          name: "halo3/halo3-1.jpg",
          credit: [
            {
              dev: "Bungie",
              url: "https://www.bungie.net/",
            },
          ],
        },
      },
    ],
    tags: ["analysis", "gameplay"],
  },
];

app.get("/api/posts", (req, res) => {
  res.send(posts);
});

app.get("/api/reviews", (req, res) => {
  getReviews(res);
});

const getReviews = async (res) => {
  const reviews = await Review.find();
  res.send(reviews);
};

app.get("/app/reviews/:id", (req, res) => {
  getReview(res, req.params.id);
});

const getReview = async (res, id) => {
  const review = Review.findOne({ _id: id });
  res.send(review);
};

app.post("/api/reviews", upload.single("img"), (req, res) => {
  const result = validateReview(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const review = new Review({
    reviewer: req.body.reviewer,
    content: req.body.content,
    rating: parseFloat(req.body.rating),
    item: req.body.item,
  });

  if (req.file) {
    review.image = "images/reviews/" + req.file.filename;
  }

  createReview(res, review);
});

const createReview = async (res, review) => {
  const result = await review.save();
  res.send(review);
};

app.put("/api/reviews/:id", upload.single("img"), async (req, res) => {
  const result = validateReview(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  let fieldsToUpdate = {
    reviewer: req.body.reviewer,
    content: req.body.content,
    rating: req.body.rating,
    item: req.body.item,
  };

  if (req.file) {
    fieldsToUpdate.image = "images/reviews/" + req.file.filename;
  }

  const wentThrough = await Review.updateOne(
    { _id: req.params.id },
    fieldsToUpdate
  );

  const updatedReview = await Review.findOne({ _id: req.params.id });
  res.send(updatedReview);
});

app.delete("/api/reviews/:id", (req, res) => {
  removeReviews(res, req.params.id);
});

const removeReviews = async (res, id) => {
  const review = await Review.findByIdAndDelete(id);
  res.send(review);
};

const validateReview = (review) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    reviewer: Joi.string().min(3).required(),
    content: Joi.string().min(3).required(),
    rating: Joi.number().required(),
    item: Joi.string().required(),
  });

  return schema.validate(review);
};

/* Checks if port is accessed */
app.listen(3001, () => {
  console.log("I'm listening");
});
