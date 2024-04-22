const { BAD_REQUEST, OK, NOT_FOUND } = require('../config/http_status_code')
const { CustomError, hasRequiredFields } = require('../lib/handling_functions')
const user_model = require('../models/user')
const puzzle_model = require('../models/puzzle')
const cart_model = require('../models/cart')
const order_model = require('../models/order')


exports.addOrder = async (req, res, next) => {
    try {
        const { profileId } = req.verified
        const cart_items = await cart_model.findOne({ user: profileId }).select('items.quantity items.selectedSize items.puzzle')
        const add = await user_model.findById(profileId).select('address.street address.city address.state address.zip address.country ')
        let totalPrice = 0
        if(!cart_items){
          return  res.status(NOT_FOUND).json('no cart items')

        }
        if(!add){
            return  res.status(NOT_FOUND).json('no user addresse')
  
          }
        for (const item of cart_items.items) {
            let puzzleSizes = await puzzle_model.findById(item.puzzle).select("sizes")
            let myPuzzlesize = puzzleSizes.sizes.find(size => size.size === item.selectedSize)
            let inc = myPuzzlesize.price * item.quantity
            totalPrice += inc
        }


        const newOrder = await order_model.create({
            user: profileId,
            items: cart_items.items,
            totalPrice,
            address: add.address
        })

        res.status(OK).json(newOrder)

    } catch (error) {
        next(error)
    }
}