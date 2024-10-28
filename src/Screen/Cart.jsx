import React, { useState } from 'react';
import trash from '../assets/trash-img.svg'; // Ensure this path is correct
import { useCart, useDispatchCart } from '../Components/ContextReducer';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();

    const [checkoutMessage, setCheckoutMessage] = useState(null); // State for feedback message

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>The cart is Empty...!</div>
            </div>
        );
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");

        if (!userEmail) {
            setCheckoutMessage("You need to be logged in to checkout.");
            return;
        }

        try {
            let response = await fetch("http://localhost:5000/api/orderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    order_data: data,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });

            console.log("order response :", response);

            if (response.status === 200) {
                setCheckoutMessage("Order placed successfully!");
                dispatch({ type: "DROP" }); // Clear cart
            } else {
                setCheckoutMessage("Failed to place order. Please try again.");
            }
        } catch (error) {
            console.error("Checkout error: ", error);
            setCheckoutMessage("An error occurred during checkout. Please try again.");
        }
    };

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (
        <>
            <div>
                <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Name</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Options</th>
                                <th scope='col'>Amount</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((food, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td>
                                        <button type='button' className='btn p-0'>
                                            <img
                                                src={trash}
                                                alt='delete'
                                                onClick={() => { dispatch({ type: "REMOVE", index: index }) }}
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div>
                        <h1 className='fs-2'>Total Price: ${totalPrice}/-</h1>
                    </div>

                    <div>
                        <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check out</button>
                    </div>

                    {checkoutMessage && (
                        <div className='alert alert-info mt-3'>{checkoutMessage}</div>
                    )}
                </div>
            </div>
        </>
    );
}