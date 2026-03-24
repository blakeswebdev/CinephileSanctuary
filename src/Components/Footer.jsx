import React from 'react'
import "./Footer.css"
import cs from "../Assets/C (1).png"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row footer__row">
                    <a href="#">
                        <figure className="footer__logo">
                            <img src={cs} alt="" className='footer__logo-img' />
                        </figure>
                    </a>
                
                    <div className="footer_list">
                        <Link to="/" className='footer_link' >Home</Link>
                        <Link to="/" className='footer_link' >About</Link>
                        <Link to="/home" className='footer_link' >Movies</Link>
                        <Link to="/" className='footer_link' >Contact</Link>
                    

                    <div className="footer_copy">Copyright &copy; 2026 Cinephile</div>
                </div>
                </div>
            </div>

        </div>
    )
}

export default Footer