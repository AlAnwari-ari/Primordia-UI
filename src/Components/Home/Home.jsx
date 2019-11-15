import React, { Component } from 'react'
import './Home.css'
import Landing from './google-news-t.jpg'
import calendar from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/calendar.png'
import folder from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/folder.png'
import smartphone from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/smartphone.png'
import trees from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/trees.png'
import NewspaperCard from '../Newspaper/NewspaperCard'

class Home extends Component {

    renderData = () => {
        var arr = [0,1,2,3]
        return arr.map(val => {
            return (
                <NewspaperCard/>
            )

        })
    }

    render() {
        return (
            <div>
                <div className="land-container">
                    
                    <img src={Landing} alt="gbr"/>
                    <div className="overlay"></div>
                    <div className="hero-text text-white">
                        <h1>Paperless</h1>
                        <h1>Digital More</h1>
                        <p>Ayo baca e-Paper secara digital!</p>
                        <p style={{lineHeight:'0'}}>Nikmati membaca koran tanpa lembaran kertas.</p>

                        <input className="btn-join" type="button" value="Bergabung"/>
                    </div>
                </div>

                <div className="process-container">
                    <div className="row text-center inside-process">
                        <div className="col">
                            <img src={calendar} alt="clndr"/>
                            <h6>Berita terbaru setiap harinya</h6>

                        </div>
                        <div className="col">
                            <img src={folder} alt="fldr"/>
                            <h6>Berbagai Sumber terpercaya</h6>

                        </div>
                        <div className="col-5 second-fill">
                            <h2>Dapatkan Informasi Selalu</h2>
                            <p>Selalu ada informasi untuk Anda dari sumber Terpercaya</p>
                        </div>
                        <div className="col">
                            <img src={smartphone} alt="smrt" style={{transform:'rotate(90deg)'}}/>
                            <h6>Baca secara digital kapanpun dan dimanapun</h6>

                        </div>
                        <div className="col trees">
                            <img src={trees} alt="trs"/>
                            <h6>Paperless</h6>
                            <h6 style={{margin:'0'}}>=</h6>
                            <h6 style={{margin:'0'}}>More Trees</h6>

                        </div>
                    </div>
                </div>

                <div className="bigData pt-3 pb-3">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h4>Terbaru</h4>
                                <div className="render-new">
                                    {this.renderData()}
                                </div>     
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col">
                                <h4>Popular</h4>
                                <div className="render-popular">
                                    {this.renderData()}
                                </div>
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col">
                                <h4>Terbaru</h4>
                                <div className="render-apa">
                                    {this.renderData()}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>



            </div>
        )
    }
}

export default Home