const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { signUp, login } = require("../controllers/authController.js");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);

router.get("/profile", protect, (req, res) => {
res.status(200).json({
message: "Profile retrieved successfully",
user: req.user,
});
});

module.exports = router;
