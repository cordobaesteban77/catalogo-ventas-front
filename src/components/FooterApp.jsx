import React from 'react'
import { Link } from 'react-router-dom'

const FooterApp = () => {
  return (
    <div className="container-fluid mt-4 bg-black">
        <div className="row">
            <div className="col">
                <img src="/logo.svg" alt="Logo de EZ market" />
                <a href="tel:+543816463774" className="text-white" target='blank'><i className="bi bi-whatsapp"></i></a>
                <a href="https://www.instagram.com/_estebancordoba/?next=%2F" className="text-white" target='blank'><i class="bi bi-instagram"></i></a>
                <a href="mailto:cordobaesteban77@gmail.com" className="text-white" target='blank'><i class="bi bi-envelope"></i></a>
            </div>
        </div>
    </div>
  )
}

export default FooterApp