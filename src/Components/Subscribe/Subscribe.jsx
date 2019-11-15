import React, { Component } from 'react'
import './Subscribe.css'
import Bronze from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/bronze.png'
import Silver from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/silver.png'
import Gold from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/gold.png'

class Subscribe extends Component {
    render() {
        return (
            <div>
                <div className="subscribe-title">
                    <h4>Nikmati membaca koran dari berbagai sumber terpercaya anda bersama kami!</h4>
                </div>
                <div className="package-container">
                    <div className="bronze-package">
                        <h3>1 Bulan</h3>
                        <img src={Gold} alt="bronze"/>
                        <p>Akses ke 3 publisher e-paper</p>
                        <div className="footer-package">
                            <h5>Rp.50.000</h5>
                            <input type="button" value="Langganan Sekarang"/>
                        </div>
                    </div>    
                    <div className="middle-package">
                        <h2>3 Bulan</h2>
                        <img src={Bronze} alt="bronze"/>
                        <p>Akses ke 5 publisher e-paper</p>
                        <div className="middle-footer-package">
                            <h5>Rp.100.000</h5>
                            <input type="button" value="Langganan Sekarang"/>
                        </div>
                    </div>    
                    <div className="bronze-package">
                        <h3>2 Bulan</h3>
                        <img src={Silver} alt="bronze"/>
                        <p>Akses ke 4 publisher e-paper</p>
                        <div className="footer-package">
                            <h5>Rp.75.000</h5>
                            <input type="button" value="Langganan Sekarang"/>
                        </div>
                    </div>    
                </div>

            </div>
        )
    }
}

export default Subscribe;