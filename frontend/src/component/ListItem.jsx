import { useDispatch } from "react-redux";
import { deleteItem } from "../features/items/itemSlice";

function ListItem({ listItem }) {
    const dispatch = useDispatch();
    return (
        <div className="goal">
            <p className="list-item-name">Item: {listItem.itemName}</p>
            <p className="list-item-quantity">Quantity: {listItem.quantity}</p>
            <button onClick={() => dispatch(deleteItem(listItem._id))} className="close">
                X
            </button>
        </div>
    );
}

export default ListItem;
