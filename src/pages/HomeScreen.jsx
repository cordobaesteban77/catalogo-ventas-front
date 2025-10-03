import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CarouselApp from '../components/CarouselApp'
import CardProductApp from '../components/CardProductApp'

const apiUrl = `${import.meta.env.VITE_URL_SERVER}`

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
      getProducts()
    }, [])
    
    const getProducts = () => {
        axios.get(`${apiUrl}/products`).then((res) => setProducts(res.data.products || []))
        .catch(() => console.log("error al traer productos"))
    }
  return (
    <div>
      <CarouselApp />
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className='title-text-color'>Nuestros Productos</h1>
          </div>
        </div>
        {
          products.length > 0 ? <div className="row">
            {
              products.map((product) => (
                <CardProductApp key={product._id} product={product}/>
              ))
            }
          </div> : <div class="text-center">
                    <div class="spinner-border text-color" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
        }
      </div>
    </div>
  )
}

export default HomeScreen