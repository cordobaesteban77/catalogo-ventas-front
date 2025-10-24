import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CarouselApp from '../components/CarouselApp'
import CardProductApp from '../components/CardProductApp'

const apiUrl = `${import.meta.env.VITE_URL_SERVER}`

const PowerSuppliesScreen = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      getProducts()
    }, [])

    const getProducts = () => {
        axios.get(`${apiUrl}/products`)
        .then((res) => setProducts(res.data.products || []))
        .catch(() => console.log("error al traer los productos"))
        .finally(() => setLoading(false))
    }

    const powerSuppliesProducts = products.filter(product => product.category === "Fuentes de alimentacion")
    
  return (
    <div id='inicio'>
    <CarouselApp />
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className='title-text-color'>Fuentes de alimentacion</h1>
        </div>
      </div>
      {
        loading ? (
            <div className="text-center">
            <div className="spinner-border text-color" role="status">
              <span className="visually-hidden">Cargando productos...</span>
            </div>
            <p className="mt-2">Cargando productos...</p>
          </div>
        ) : powerSuppliesProducts.length > 0 ? (
            <div className="row">
            {powerSuppliesProducts.map((product) => (
              <CardProductApp key={product._id} product={product} />
            ))}
          </div>
        ) : (
            <div className="text-center text-color">
            <div className="alert" role="alert">
              <h4 className="alert-heading">Sin stock disponible</h4>
              <p>No hay productos de esta categoría disponibles en este momento.</p>
              <hr />
              <p className="mb-0">¡Pronto tendremos nuevas fuentes de alimentacion en stock!</p>
            </div>
          </div>
        )
      }
       </div>
    <div className='btn-wp'>
      <a href="tel: +5493816463774"><i className="bi bi-whatsapp text-success fs-3"></i></a>
    </div>
    <div className='btn-up'>
      <a href="#inicio"><i className="bi bi-arrow-up-circle-fill fs-3"></i></a>
    </div>
  </div>
  )
}

export default PowerSuppliesScreen