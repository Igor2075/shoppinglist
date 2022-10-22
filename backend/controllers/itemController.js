const getItems = (req, res) => {
    res.status(200).json({ message: "Get Items" });
};

const postItem = (req, res) => {
    res.status(201).json({ message: "New Item" });
};

const updateItem = (req, res) => {
    res.status(200).json({ message: `Update Item ${req.params.id}` });
};

const deleteItem = (req, res) => {
    res.status(200).json({ message: `Delete Item ${req.params.id}` });
};

module.exports = { getItems, postItem, updateItem, deleteItem };
