const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
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
