import { useDispatch } from "react-redux";
import { FaRegCheckCircle, FaTimesCircle } from "react-icons/fa";
import { deleteItem, updateItem } from "../features/items/itemSlice";
import React, { useState } from "react";
import _ from "lodash";
import { IconContext } from "react-icons";

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
    const [isOrdered, setIsOrdered] = useState(false);

    const toggleOrdered = () => {
        setIsOrdered(!isOrdered);
    };

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
        <div className={isOrdered ? "goal ordered" : "goal"}>
            <IconContext.Provider value={{ className: "react-icons" }}>
                <button onClick={toggleOrdered} className="order">
                    <FaRegCheckCircle />
                </button>
            </IconContext.Provider>
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
            <IconContext.Provider value={{ className: "react-icons" }}>
                <button onClick={() => dispatch(deleteItem(_id))} className="close">
                    <FaTimesCircle />
                </button>
            </IconContext.Provider>
        </div>
    );
}

export default ListItem;
