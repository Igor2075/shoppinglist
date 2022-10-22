const asyncHandler = require("express-async-handler");
const ItemName = require("../models/itemModel");

const getItems = asyncHandler(async (req, res) => {
    const items = await ItemName.find();

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

    const updatedItem = await ItemName.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json(updatedItem);
});

const deleteItem = asyncHandler(async (req, res) => {
    const item = await ItemName.findById(req.params.id);
    if (!item) {
        res.status(400);
        throw new Error("Item not found");
    }

    await item.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = { getItems, postItem, updateItem, deleteItem };
