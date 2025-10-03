import React from 'react'
import img1 from '../assets/pexels-nanadua11-4581902.jpg';
import img2 from '../assets/pexels-johnpet-2115257.jpg';
import img3 from '../assets/pexels-erik-g-12654570-6236574.jpg';

const CarouselApp = () => {
  return (
    <div className='carousel-container'>
        <div id="carouselExampleCaptions" className="carousel slide custom-carousel" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item carousel-container active">
                <img src={img1} className="d-block w-100" alt="imagen del carousel"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>EZ Market</h5>
                    <p>Lo mejor en tecnología.</p>
                </div>
                </div>
                <div className="carousel-item carousel-container">
                <img src={img2} className="d-block w-100" alt="imagen del carousel"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>EZ Market</h5>
                    <p>Precios competitivos.</p>
                </div>
                </div>
                <div className="carousel-item carousel-container">
                <img src={img3} className="d-block w-100" alt="imagen del carousel"/>
                <div className="carousel-caption d-none d-md-block">
                    <h5>EZ Market</h5>
                    <p>Calidad garantizada.</p>
                </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
            </div>
    </div>
  )
}

export default CarouselApp