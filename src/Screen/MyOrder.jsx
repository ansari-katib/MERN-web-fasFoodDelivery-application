import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null); // Initialize as null

    const fetchMyOrder = async () => {
        const userEmail = localStorage.getItem('userEmail');
        console.log(userEmail);

        const response = await fetch("http://localhost:5000/api/myorderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail,
            }),
        });

        const jsonData = await response.json();
        setOrderData(jsonData); // Set the fetched data
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <>
          <div>
            <Navbar />
          </div>

            <div className='container'>
                <div className='row'>
                    {orderData && orderData.order_data && orderData.order_data.length > 0 ? ( // Add null checks here
                        orderData.order_data.slice(0).reverse().map((orderGroup, index) => (

                                <div key={index}>
                                    {orderGroup.map((item, idx) => (
                                        
                                        <div key={idx}>
                                            {item.Order_date ? 
                                            (
                                                <div className='m-auto mt-5'>
                                                    <h4>Order Date: {item.Order_date}</h4>
                                                    <hr />
                                                </div>
                                            ) 
                                            : 
                                            (
                                                <div className='col-12 col-md-6 col-lg-3'>
                                                    <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                        <div className="card-body">
                                                            <h5 className="card-title">{item.name}</h5>
                                                            <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                <span className='m-1'>{item.qty}</span>
                                                                <span className='m-1'>{item.size}</span>
                                                                <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                                    ₹{item.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )
                        )
                    )
                        :
                        (
                            <h4>No orders found.</h4>
                        )}
                </div>

            </div>
            <hr></hr>

            <div>
                <Footer />
            </div>
        </>
    );
}
