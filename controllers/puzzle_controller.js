const puzzle_model = require('../models/puzzle')
const { BAD_REQUEST, OK } = require('../config/http_status_code')
const { CustomError, hasRequiredFields } = require('../lib/handling_functions')
const multer = require('multer');




exports.addPuzzle = async (req, res, next) => {
    try {

        hasRequiredFields(req.body, ["name", "category", "teamName", "sizes"])
        const { name, category, teamName, imgUrl, sizes } = req.body
        const puzzle = await new puzzle_model({
            name,
            category,
            teamName,
            sizes,
            imgUrl: req.file.path
        })
        puzzle.save()
        res.status(OK).json(puzzle)

    } catch (error) {
        next(error)
    }
}

exports.getAllPuzzles = async (req, res, next) => {
    try {

        const puzzles = await puzzle_model.find({})
        res.status(OK).json({ puzzles, count: puzzles.length })

    } catch (error) {
        next(error)
    }
}

exports.getPuzzleByCategory = async (req, res, next) => {
    try {
        hasRequiredFields(req.body, ["category"])
        const { category } = req.body
        const puzzles = await puzzle_model.find({ category })
        res.status(OK).json({ puzzles, count: puzzles.length })

    } catch (error) {
        next(error)
    }
}

exports.getPuzzleByTeam = async (req, res, next) => {
    try {
        hasRequiredFields(req.body, ["teamName"])
        const { teamName } = req.body
        const puzzles = await puzzle_model.find({ teamName })
        res.status(OK).json({ puzzles, count: puzzles.length })

    } catch (error) {
        next(error)
    }
}

exports.getPuzzleById = async (req, res, next) => {

    try {
        const { id } = req.query;
        if (!id) {
            throw new CustomError({ statusCode: NOT_FOUND, message: "no product id" })
        }
        const puzzle = await puzzle_model.findById(id)
        res.status(OK).json(puzzle)
    } catch (error) {
        next(error)
    }
}

exports.updatePuzzle = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { name, category, teamName, sizes } = req.body; 
        const filter = { name, category, teamName, sizes }


        Object.keys(filter).forEach(key => {
            if (filter[key] === undefined) {
                delete filter[key];
            }

        }
        )

        if (req.file) {
            filter.imgUrl = req.file.path;
        }
        const updatedPuzzle = await puzzle_model.findByIdAndUpdate(id, { $set: filter }, { new: true, runValidators: true });

        if (!updatedPuzzle) {
            return res.status(NOT_FOUND).json({ message: "Puzzle not found." });
        }

        return res.status(OK).json(updatedPuzzle);

    } catch (error) {
        next(error)
    }
}

exports.deletePuzzle = async (req, res, next) => {

    try {
        const { id } = req.query;
        if (!id) {
            throw new CustomError({ statusCode: NOT_FOUND, message: "no product id" })
        }
        const puzzle = await puzzle_model.findByIdAndDelete(id)
        res.status(OK).json({ message: `puzzle: ${puzzle.name} deleted` })
    } catch (error) {
        next(error)
    }
}