import React, {Component} from 'react'
import './Footer.css'
import facebook from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/facebook.png'
import twitter from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/twitter.png'
import instagram from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/instagram.png'

class Footer extends Component {
    render() {
        return (
            <div className="main-footer">
                <div className="top-bottom">
                    <div className="tb-top">
                        <ul>
                            <li>TENTANG</li>
                            <li>KONTAK</li>
                        </ul>
                    </div>
                    <div className="tb-bot">
                        <ul>
                            <li><img src={facebook} alt="fb"/></li>
                            <li><img src={twitter} alt="twt"/></li>
                            <li><img src={instagram} alt="ig"/></li>
                        </ul>

                    </div>

                </div>
                <div className="bot-bottom text-center">
                    <p>Hak Cipta &copy; 2019 Primordia</p>
                </div>

            </div>
        )
    }
}

export default Footer