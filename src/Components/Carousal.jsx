import React from 'react';
import burger from '../assets/burger.jpg';
import pizza from '../assets/pizza.jpg';
import sandwitch from '../assets/sandwitch.jpg';

function Carousal({ search, setSearch }) { // Accept search and setSearch as props
    return (
        <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ height: '80vh' }}>
                <div className="carousel-inner h-100">
                    <div className="carousel-item active h-100">
                        <img src={burger} className="d-block w-100 h-100" alt="burger" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="carousel-item h-100">
                        <img src={pizza} className="d-block w-100 h-100" alt="pizza" style={{ objectFit: 'cover' }} />
                    </div>
                    <div className="carousel-item h-100">
                        <img src={sandwitch} className="d-block w-100 h-100" alt="sandwitch" style={{ objectFit: 'cover' }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                <div className="carousel-caption d-flex justify-content-center align-items-center" style={{ zIndex: 15, height: '45%' }}>
                    <div className="d-flex justify-content-center w-75">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} // Update the search state in Home
                        />
                        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Carousal;
