import React from 'react'

const CardProductApp = (props) => {
    const {_id, name, description, image, price, category} = props.product
    console.log(image)
  return (
    <div className='col'>
        <div className="card card-custom bg-black text-color">
            <img src={`${import.meta.env.VITE_URL_SERVER}/public/${image}`} className="card-img-top img-card-custom" alt={name}/>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{category}</p>
                <p className="card-text">${price}</p>
                <a href="#" className="btn btn-custom">Ver más</a>
            </div>
        </div>
    </div>
  )
}

export default CardProductApp