const asyncHandler = require("express-async-handler");
const ItemName = require("../models/itemModel");
const User = require("../models/userModel");

const getItems = asyncHandler(async (req, res) => {
    const items = await ItemName.find({ user: req.user.id });

    res.status(200).json(items);
});

const postItem = asyncHandler(async (req, res) => {
    if (!req.body.itemName) {
        res.status(400);
        throw new Error("Please add an Item Name field");
    }

    const item = await ItemName.create({
        itemName: req.body.itemName,
        quantity: req.body.quantity,
        user: req.user.id,
    });

    res.status(201).json(item);
});

const updateItem = asyncHandler(async (req, res) => {
    const item = await ItemName.findById(req.params.id);
    if (!item) {
        res.status(400);
        throw new Error("Item not found");
    }

    const updates = {
        itemName: req.body.itemName,
        quantity: req.body.quantity,
    };

    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (item.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }
    const updatedItem = await ItemName.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json(updatedItem);
});

const deleteItem = asyncHandler(async (req, res) => {
    const item = await ItemName.findById(req.params.id);
    if (!item) {
        res.status(400);
        throw new Error("Item not found");
    }

    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (item.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }

    await item.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = { getItems, postItem, updateItem, deleteItem };
