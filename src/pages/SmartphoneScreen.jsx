import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CarouselApp from '../components/CarouselApp'
import CardProductApp from '../components/CardProductApp'

const apiUrl = `${import.meta.env.VITE_URL_SERVER}`

const SmartphoneScreen = () => {
        //algoritmo
        //datos de entrada: productos
        //A1: traer productos ✅
        //A2: si categoria de producto = smarphones entonces A3, sino mostrar mensaje
        //A3: mostrar productos
        // parar
        const [products, setProducts] = useState([])

        useEffect(() => {
          getProducts()
        }, [])

        const getProducts = () => {
            axios.get(`${apiUrl}/products`).then((res) => setProducts(res.data.products || [])).catch(() => console.log("error al traer los productos"))
        }
        
  return (
    <div id='inicio'>
    <CarouselApp />
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className='title-text-color'>Celulares</h1>
        </div>
      </div>
      {
        products.length > 0 ? <div className="row">
          {
            products.filter(product => product.category === "Smartphone").map((product) => (
                <CardProductApp key={product._id} product={product} />
            ))
          }
        </div> : <div className="text-center">
                  <div className="spinner-border text-color" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
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

export default SmartphoneScreen