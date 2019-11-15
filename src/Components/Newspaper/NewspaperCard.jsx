import React from 'react' 
import './NewspaperCard.css'
import News from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/cover.jpeg'

const NewspaperCard = (props) => {
    return (
        <div className="main-card">
            <img src={News} alt="Headline"/>
            <div className="fill-body">
                <h5>Nama Koran</h5>
                <h6>Tanggal</h6>
                <h6>Edisi</h6>
                <p>Icon : Jumlah Pembaca</p>
            </div>
            <div className="footer-btn">
                <input type="button" className="btn-read" value="READ"/>
            </div>

        </div>
    )
}

export default NewspaperCard