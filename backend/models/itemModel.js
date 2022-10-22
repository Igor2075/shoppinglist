const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
    {
        itemName: {
            type: String,
            required: [true, "Please add a item name"],
        },

        quantity: {
            type: String,
            required: [true, "Please add a quanity"],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("itemModel", itemSchema);
