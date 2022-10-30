import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ItemForm from "../component/ItemForm";
import Spinner from "../component/Spinner";
import { getItems, reset } from "../features/items/itemSlice";
import ListItem from "../component/ListItem";

function Shoppinglist() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { items, isLoading, isError, message } = useSelector((state) => state.items);

    useEffect(() => {
        if (isError) {
            //console.log(message);
            navigate("/login");
        }
        if (!user) {
            navigate("/login");
        }

        if (user) {
            dispatch(getItems());
        }

        return () => {
            dispatch(reset());
        };
    }, [user, navigate, isError, message, dispatch]);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Shoppinglist</p>
            </section>
            <ItemForm />
            <section className="content">
                {items.length > 0 ? (
                    <div className="goals">
                        {items.map((item) => {
                            return <ListItem key={item._id} listItem={item} />;
                        })}
                    </div>
                ) : (
                    <h3>Shoppinglist is empty</h3>
                )}
            </section>
        </>
    );
}

export default Shoppinglist;
