import { useDispatch } from "react-redux";
import { deleteItem, updateItem } from "../features/items/itemSlice";
import React, { useState } from "react";
import _ from "lodash";

const inputValue = (e) => e.target.value;

function isEnterOrEscapeKeyEvent(event) {
    return event.key === "Enter" || event.key === "Escape";
}

function ListItem({ listItem }) {
    const { itemName, quantity, _id } = listItem;
    const dispatch = useDispatch();
    const [isEditingItem, setisEditingItem] = useState(false);
    const [isEditingQuantity, setisEditingQuantity] = useState(false);
    const [newQuantity, setNewQuantity] = useState(quantity);
    const [newItemName, setNewItemName] = useState(itemName);

    const onEditEnd = () => {
        setisEditingItem(false);
        setisEditingQuantity(false);
        const itemData = {
            id: _id,
            itemName: newItemName,
            quantity: newQuantity,
        };

        dispatch(updateItem(itemData));
        // setNewQuantity(quantity);
    };
    return (
        <div className="goal">
            {isEditingItem ? (
                <input
                    value={newItemName}
                    className="list-item-quantity bg-transparent border-2 border-black border-solid"
                    onKeyDown={(event) => {
                        if (isEnterOrEscapeKeyEvent(event)) {
                            event.preventDefault();
                            event.stopPropagation();
                            onEditEnd();
                        }
                    }}
                    onChange={_.flow(inputValue, setNewItemName)}
                    onBlur={onEditEnd}
                    autoFocus
                />
            ) : (
                <div className="list-item-quantity select-none" onDoubleClick={() => setisEditingItem(true)}>
                    Item: {newItemName}
                </div>
            )}
            {isEditingQuantity ? (
                <input
                    value={newQuantity}
                    className="list-item-quantity bg-transparent border-2 border-black border-solid"
                    onKeyDown={(event) => {
                        if (isEnterOrEscapeKeyEvent(event)) {
                            event.preventDefault();
                            event.stopPropagation();
                            onEditEnd();
                        }
                    }}
                    onChange={_.flow(inputValue, setNewQuantity)}
                    onBlur={onEditEnd}
                    autoFocus
                />
            ) : (
                <div className="list-item-quantity select-none" onDoubleClick={() => setisEditingQuantity(true)}>
                    Quantity: {newQuantity}
                </div>
            )}
            <button onClick={() => dispatch(deleteItem(_id))} className="close">
                X
            </button>
        </div>
    );
}

export default ListItem;
