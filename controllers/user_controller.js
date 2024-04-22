const jwt = require('jsonwebtoken')
const user_model = require('../models/user')
const bcrypt = require('bcrypt')
const { BAD_REQUEST, OK } = require('../config/http_status_code')
const { default: mongoose } = require('mongoose')

const { CustomError, hasRequiredFields } = require('../lib/handling_functions')

exports.register = async (req, res, next) => {
    try {
        hasRequiredFields(req.body, ["name", "email", "password", "phoneNumber", "address"])
        const { name, email, password, phoneNumber, address } = req.body
        const userData = await user_model.findOne({ email: email.toLowerCase() }).exec()
        if (userData) {
            throw new CustomError({ statusCode: BAD_REQUEST, message: "email must be unique" })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new user_model({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            address
        })
        user.save()
        res.status(OK).json(user)
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        hasRequiredFields(req.body, ["email", "password"])
        const { email, password } = req.body
        const user = await user_model.findOne({ email: email.toLowerCase() }).exec()
        if (user != null) {
            if (await bcrypt.compare(password, user.password)) {
                let token = jwt.sign({ profileId: user._id, role: user.role }, process.env.JWT_SECRET)
                res.status(OK).json({ token })
            } else {
                throw new CustomError({ statusCode: BAD_REQUEST, message: "GHALET" })
            }
        } else {
            throw new CustomError({ statusCode: BAD_REQUEST, message: "GHALET" })
        }
    } catch (error) {
        next(error)
    }
}

exports.getUserProfile = async (req, res, next) => {
    try {
        const user = await user_model.findOne({ _id: new mongoose.Types.ObjectId(req.verified.profileId) }).select("-password")
        if (!user) {
            throw new CustomError({ statusCode: OK, message: "not found" })
        } else {
            res.status(OK).json(user)
        }
    } catch (error) {
        next(error)
    }
}

exports.updateUserProfile = async (req, res, next) => {
    try {
        const { name, phoneNumber, address } = req.body
        const filter = { name, phoneNumber, address }
        Object.keys(filter).forEach(key => {
            if (filter[key] === undefined) {
                delete filter[key];
            }
            if (filter[key] == address) {


                Object.keys(address).forEach(key => {

                    if (address[key] === undefined) {
                        delete address[key];

                    }
                    filter.adresse.key = address[key]
                })

            }
        }
        )
        const user = await user_model.findByIdAndUpdate({ _id: new mongoose.Types.ObjectId(req.verified.profileId) }, filter, { new: true })
        if (!user) {
            throw new CustomError({ statusCode: OK, message: "not found" })
        } else {
            res.status(200).json(user)

        }
    } catch (error) {
        next(error)
    }
}



