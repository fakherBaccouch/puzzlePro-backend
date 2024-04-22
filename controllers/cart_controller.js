const cart_model = require('../models/cart')
const { BAD_REQUEST, OK, NOT_FOUND } = require('../config/http_status_code')
const { CustomError, hasRequiredFields } = require('../lib/handling_functions')


exports.addItemToCart = async (req, res, next) => {
    try {

        hasRequiredFields(req.body, ["puzzleId", "selectedSize", "quantity"])
        const { profileId } = req.verified
        console.log(req.verified
        )
        const { puzzleId, selectedSize, quantity } = req.body
        const cart = await cart_model.findOne({ user: profileId });
        if (!cart) {
            const newCart = await cart_model.create({
                user: profileId,
                items: [{ puzzle: puzzleId, selectedSize, quantity }]
            });
            return res.status(OK).json(newCart);
        }

        const itemIndex = cart.items.findIndex(item => item.puzzle == puzzleId && item.selectedSize == selectedSize);
        if (itemIndex > -1) {

            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ puzzle: puzzleId, selectedSize, quantity });

        }
        await cart.save();
        return res.status(OK).json(cart);

    } catch (error) {
        next(error)
    }
}

exports.getUserCart = async (req, res, next) => {
    try {
        const { profileId } = req.verified
        const cart = await cart_model.findOne({ user: profileId }).populate("items.puzzle")
        if (!cart) {
            throw new CustomError({ statusCode: NOT_FOUND, message: "no cart for this user" })
        }
        return res.status(OK).json(cart);
    }
    catch (error) {
        next(error)
    }
}

exports.deleteCartItem = async (req, res, next) => {


    try {
        hasRequiredFields(req.body, ["itemId", "selectedSize"])

        const { profileId } = req.verified
        const { itemId, selectedSize } = req.body

        const cart = await cart_model.findOneAndUpdate(
            { user: profileId },
            { $pull: { items: { puzzle: itemId, selectedSize } } },
            { new: true }
        );
        if (!cart) {
            return res.status(NOT_FOUND).json({ message: "Cart not found or item not in cart" });
        }
        res.status(OK).json(cart);
    } catch (error) {
        next(error)
    }
}


exports.updateItemQ = async (req, res, next) => {


    try {
        hasRequiredFields(req.body, ["itemId", "selectedSize", "method"])

        const { profileId } = req.verified
        const { itemId, selectedSize, method } = req.body

        let num = null;

        if (method === "inc") {
            num = 1
        } else if (method === "dec") {
            num = -1
        }

        const cart = await cart_model.findOneAndUpdate(
            { "user": profileId, "items.puzzle": itemId, "items.selectedSize": selectedSize },
            { $inc: { "items.$.quantity": num } },
            { new: true }
        );


        if (!cart) {
            return res.status(NOT_FOUND).json({ message: "Cart not found or item not in cart" });
        }
        res.status(OK).json(cart);
    } catch (error) {
        next(error)
    }
}