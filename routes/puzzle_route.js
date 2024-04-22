const express = require("express");
const router = express.Router();
const multer = require("multer")

const puzzle_controller = require("../controllers/puzzle_controller");
const check_auth = require('../middleware/check_auth')
const check_admin = require('../middleware/check_admin')

const storage = multer.diskStorage({

    destination: function (req, file, callback) {
        callback(null, "C:/Users/fakhe/puzzlePro-backend/uploads");
    },
    filename: function (req, file, callback) {
        console.log('ztwas', file.originalname)
        callback(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });




router.post("/addPuzzle", check_admin, upload.single("imgg"), puzzle_controller.addPuzzle);
router.get("/getAllPuzzles", puzzle_controller.getAllPuzzles);
router.get("/getPuzzleByCategory", puzzle_controller.getPuzzleByCategory);
router.get("/getPuzzleByTeam", puzzle_controller.getPuzzleByTeam);
router.get("/getPuzzleById", puzzle_controller.getPuzzleById);
router.post("/deletePuzzle", check_admin, puzzle_controller.deletePuzzle);
router.post("/updatePuzzle", check_admin, upload.single("imgg"), puzzle_controller.updatePuzzle);

module.exports = router;