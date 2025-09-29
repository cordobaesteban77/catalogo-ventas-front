import React, { useEffect, useState } from 'react'
import axios from 'axios'

const apiUrl = `${import.meta.env.VITE_URL_SERVER}`

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
      getProducts()
    }, [])
    
    const getProducts = () => {
        axios.get(`${apiUrl}/products`).then((res) => { setProducts(res.data.products || [])
        console.log(res.data.products)})
        .catch(() => console.log("error al traer productos"))
    }
  return (
    <div>HomeScreen</div>
  )
}

export default HomeScreen