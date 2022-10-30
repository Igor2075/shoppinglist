import { useState } from "react";
import { useDispatch } from "react-redux";
import { createItem } from "../features/items/itemSlice";
function ItemForm() {
    const [formData, setFormData] = useState({
        itemName: "",
        quantity: "",
    });

    const dispatch = useDispatch();

    const { itemName, quantity } = formData;
    const onSubmit = (e) => {
        e.preventDefault();
        const itemData = {
            itemName,
            quantity,
        };
        dispatch(createItem(itemData));
        setFormData({
            itemName: "",
            quantity: "",
        });
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group-item">
                    <div className="item-name">
                        <input type="text" name="itemName" id="itemName" value={itemName} onChange={onChange} placeholder="Item" />
                    </div>
                    <div className="item-quantity">
                        <input type="text" name="quantity" id="quantity" value={quantity} onChange={onChange} placeholder="quantity" />
                    </div>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type="submit">
                        Add Item
                    </button>
                </div>
            </form>
        </section>
    );
}

export default ItemForm;
