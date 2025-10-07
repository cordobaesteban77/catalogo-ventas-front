import React from 'react'

const FooterApp = () => {
  return (
    <div>
      <footer className='bg-black py-5 mt-4 text-white'>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 d-flex flex-column align-items-center justify-content-center text-center gap-3"> 
              <img src="/logo.svg" alt="Logo de EZ market" />
              <h5>Dónde estamos?</h5>
              <span>Calle 777</span>
              <iframe src="https://www.google.com/maps/embed?pb=!4v1759820207907!6m8!1m7!1skD3DyjTzY0fWxtt6Su7OAA!2m2!1d-26.83100610530767!2d-65.20393429017305!3f86.89674169482825!4f0!5f0.7820865974627469" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div className="col-12 d-flex gap-3 justify-content-center mt-2">
              <a href="https://www.instagram.com/_estebancordoba/?next=%2F" target='blank' className='custom-icon'><i className="bi bi-instagram"></i></a>
              <a href="tel: +5493816463774" target='blank' className='custom-icon'><i className="bi bi-whatsapp"></i></a>
              <a href="mailto: cordobaesteban77@gmail.com" target='blank' className='custom-icon'><i className="bi bi-envelope"></i></a>
            </div>
            <div className="col-12 text-center">
              <p>&copy; Todos los derechos reservados</p>
              <a href="mailto: cordobaesteban77@gmail.com">Te gusta lo que ves? Haz click aquí para contactar con el desarrollador</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default FooterApp