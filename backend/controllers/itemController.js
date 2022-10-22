const asyncHandler = require("express-async-handler");

const getItems = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get Items" });
});

const postItem = asyncHandler(async (req, res) => {
    if (!req.body.itemName) {
        res.status(400);
        throw new Error("Please add an Item Name field");
    }
    res.status(201).json({ message: "New Item" });
});

const updateItem = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update Item ${req.params.id}` });
});

const deleteItem = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete Item ${req.params.id}` });
});

module.exports = { getItems, postItem, updateItem, deleteItem };
