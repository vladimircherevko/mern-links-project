const { Router } = require("express");
const shortid = require("shortid");
const config = require("config");
const auth = require("../middlewares/authMiddleware");
const Link = require("../models/Link");

const router = Router();

// /api/link/generate
router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");
    const { from } = req.body;

    const existing = await Link.findOne({ from });
    if (existing) return res.json({ link: existing });

    const code = shortid.generate();
    const to = baseUrl + "/t/" + code;
    const link = new Link({ code, to, from, owner: req.user.userId });
    link.save();
    res.status(201).json({ link });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong " });
  }
});

// /api/link/
router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong " });
  }
});

// /api/link/:id
router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
