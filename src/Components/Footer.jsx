import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid2';

function Footer() {
  return (
    <div className='p-5 pt-4 w-100 footerContainer'>
      <Grid container spacing={2}>
        <Grid size={{xs:12, lg:4}}>
          <div  className="intro">
            <h5><Link className='fw-bolder flex' to={'/'} style={{ color: "#fff", textDecoration: "none" }}>Astra </Link></h5>
            <p className='text-white '>Designed and built with all the love in the world by the Astra team with the help of our contributors.</p>
            <p className='text-white '>Code licensed MIT, docs CC BY 3.0.</p>
            <p className='text-white '> Currently V1.0.0.</p>
          </div>
        </Grid>
        <Grid size={1}></Grid>
        <Grid size={{xs:12,sm:4,lg:2}}>
          <div className="links d-flex flex-column ">
            <h5 className='text-white '>Links</h5>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
            <Link to={'/user/orders'} style={{ textDecoration: 'none', color: 'white' }}>Orders</Link>
          </div>
        </Grid>
        <Grid size={{xs:12,sm:4,lg:2}}>
          <div className="guides d-flex flex-column ">
            <h5 className='text-white '>Guides</h5>
            <a href="https://react.dev/" target='_blank' style={{ textDecoration: 'none', color: 'white' }}>React JS</a>
            <a href="https://reactrouter.com/en/main" target='_blank' style={{ textDecoration: 'none', color: 'white' }}>React Routing</a>
            <a href="https://react-bootstrap.github.io/" target='_blank' style={{ textDecoration: 'none', color: 'white' }}>React Bootstrap</a>
          </div>
        </Grid>
        <Grid size={{xs:12,sm:4,lg:3}}>
          <div className="contact d-flex flex-column ">
            <h5 className='text-white '>Contact Us</h5>
            <div className="d-flex">
              <input placeholder='Email Id Please' type="text" className='form-control ' />
              <button className='btn btn-success  ms-2'><i className='fa-solid fa-arrow-right'></i></button>
            </div>
            <div className='icons d-flex justify-content-between mt-3'>
              <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'>
                <i className='fa-brands fa-twitter'></i>
              </a>
              <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'>
                <i className='fa-brands fa-instagram'></i>
              </a>
              <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'>
                <i className='fa-brands fa-facebook'></i>
              </a>
              <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'>
                <i className='fa-brands fa-linkedin'></i>
              </a>
              <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'>
                <i className='fa-brands fa-github'></i>
              </a>
              <a href="" style={{ textDecoration: 'none', color: 'white' }} target='_blank'>
                <i className='fa-solid fa-phone'></i>
              </a>
            </div>
          </div>
        </Grid>
      </Grid>
      <p className='text-center text-white  mt-2 mb-0'>Copyright &#169;Astra 2024. Built with React.</p>
    </div>
  )
}

export default Footer
