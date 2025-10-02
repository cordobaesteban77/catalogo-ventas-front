import React from 'react'

const CardProductApp = (props) => {
    const {_id, name, description, image, price, category} = props.product
  return (
    <div className='col'>
        <div className="card">
            <img src={image} className="card-img-top" alt={name}/>
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{category}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    </div>
  )
}

export default CardProductApp