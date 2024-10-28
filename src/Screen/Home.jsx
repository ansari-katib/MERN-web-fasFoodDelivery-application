import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
import Carousal from "../Components/Carousal";

function Home() {
    // Food category state
    const [foodCat, setFoodCat] = useState([]);
    // Food items state
    const [foodItem, setFoodItem] = useState([]);
    // Search functionality state
    const [search, setSearch] = useState('');

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5000/api/foodData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setFoodItem(data[0]);
            setFoodCat(data[1]);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <Navbar />
            <Carousal search={search} setSearch={setSearch} />

            <div className="container">
                <div className="my-3"></div>

                {foodCat.length > 0 ?
                    (
                        foodCat.map((data) => (
                            <div key={data._id} className='row mb-3'>
                                <div className="fs-3 m-3">{data.CategoryName}</div>
                                <hr />

                                {foodItem.length > 0 ?
                                    (
                                        foodItem.filter(item =>
                                            item.CategoryName === data.CategoryName &&
                                            item.name.toLowerCase().includes(search.toLowerCase())
                                        ).map(filterItems => (
                                            <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                                                <Card  
                                                    
                                                    foodItem = {filterItems}
                                                    options = {filterItems.options}
                        
                                                ></Card>
                                            </div>
                                        ))
                                    )
                                    :
                                    (
                                        <div>No items found</div>
                                    )}
                            </div>
                        ))
                    )
                    :
                    (
                        <div>No food categories available</div>
                    )}
            </div>

            <Footer />
        </>
    );
}

export default Home;
