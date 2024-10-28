import React, { useEffect, useRef, useState } from 'react';
import img from '../assets/burger.jpg'; // Default image
import { useDispatchCart, useCart } from './ContextReducer';

function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();

    const { options, foodItem } = props;

    // Ensure options is an array before mapping over it
    const sizes = Array.isArray(options) ? options.map(option => option.size) : [];

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async () => {
        const selectedPrice = options.find(option => option.size === size)?.price || 0;
        const finalPrice = qty * selectedPrice;

        // Check if the food item is already in the cart
        let food = data.find(item => item.id === foodItem._id && item.size === size);

        if (food) {
            // If the food exists and the size matches, update the quantity and price
            await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty });
        } else {
            // Add the food item to the cart if it's not already present or the size is different
            await dispatch({
                type: "ADD",
                id: foodItem._id,
                name: foodItem.name,
                price: finalPrice,
                qty: qty,
                size: size
            });
        }
    };

    useEffect(() => {
        if (priceRef.current) {
            setSize(priceRef.current.value);
        }
    }, []);

    // Calculate final price whenever qty or size changes
    const finalPrice = qty * (options.find(option => option.size === size)?.price || 0);

    return (
        <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
            <img src={img}  /* src={foodItem.img} */ className="card-img-top" alt="food" style={{ height: "130px", objectFit: "fill" }} />
            <div className="card-body">
                <h5 className="card-title">{foodItem.name}</h5>
                <div className="container w-100">
                    <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>

                    <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)} aria-label="Select Size">
                        <option value="">Select Size</option>
                        {sizes.map((size, index) => (
                            <option key={index} value={size}>{size}</option>
                        ))}
                    </select>

                    <div className="d-inline h-100 fs-5">
                        ${finalPrice}/-
                    </div>
                </div>
                <hr />
                <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}

export default Card;
