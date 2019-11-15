import React, { Component } from 'react'
import './NewspaperCompDetail.css'
import axios from 'axios'
import { urlAPI } from '../../helper/urlAPI'
import { Spinner } from 'reactstrap';
import moment from 'moment'

class NewspaperCompDetail extends Component {
    state = {
        dataPublisher : [],
        dataFiltered : [],
        inputFilteredDate: moment().format('YYYY-MM-DD')
    }

    componentDidMount () {
        this.getDataPublisher(this.props.match.params.id)
        this.getDataFiltered(this.props.match.params.id)
    }

    inputDateFilterChange = (e) => {
        this.setState({ inputFilteredDate : e.target.value })
    }

    getDataPublisher = (id) => {
        axios.get(urlAPI + '/publisher/getpublisher/' + id)
        .then((res) => {
            this.setState({ dataPublisher: res.data})
        })
        .catch((err) => {
            console.log(err);
        })
    }

    getDataFiltered = (id) => {
        axios.post(urlAPI + '/publisher/getfilteredpublisher/' + id, {tanggal: this.state.inputFilteredDate})
        .then((res) => {
            this.setState({ dataFiltered: res.data})
        })
        .catch((err) => {
            console.log(err);
        })

    }

    renderCard = () => {
        return this.state.dataPublisher.map((item) => {
            return (
                <div key={item.idKoran} className="card-comp">
                    <p>{moment(item.tanggal).format('YYYY-MM-DD')}</p>
                    <img src={urlAPI + item.pathImage} alt="Headline"/>
                    <div className="footer-comp">
                        <ul>
                            <li>icon</li>
                            <li>icon</li>
                        </ul>
                        
                    </div>
                </div>
            )
        })
    }

    renderCardNews = () => {
        return this.state.dataFiltered.map((item)=> {
            return (
                <div key={item.idKoran} className="card-comp">
                    <p>{moment(item.tanggal).format('YYYY-MM-DD')}</p>
                    <img src={urlAPI + item.pathImage} alt="Headline"/>
                    <div className="footer-comp">
                        <ul>
                            <li>icon</li>
                            <li>icon</li>
                        </ul>
                        
                    </div>
                </div>
            )
        })
    }
    
    render() {  
        console.log('data filter: ', this.state.dataFiltered);  
        return (
            <div>
                <div className="publisherdetail-container">
                    <div className="logo-week">
                        {this.state.dataPublisher.length ? <img src={urlAPI + this.state.dataPublisher[0].pathLogo} alt="logo"/> : <Spinner color="success" />}
                        <p>Ayo baca epaper kepercayaan anda bersama kami!</p>
                        <p>Belum bergabung? Mari bergabung</p>
                        <h5>Koran Minggu ini</h5>
                        <div className="one-week">
                            <div className="weekcard-board">
                                {this.renderCard()}
                            </div>
                        </div>
                    </div>

                    <div className="news-today">
                        <h5>Koran Hari Ini!</h5>
                        {this.state.dataPublisher.length ? <img src={urlAPI + this.state.dataPublisher[0].pathImage} alt="logo"/> : <Spinner color="success" />}
                    </div>

                    <div className="filtered-news">
                        <div className="search-newscomp">
                            <h6>Filter by date: </h6>
                            <input type="date" value={this.state.inputFilteredDate} onChange={this.inputDateFilterChange}/>
                            <input type="button" value="SEARCH" onClick={() => this.getDataFiltered(this.props.match.params.id)}/>
                        </div>
                        <div className="filtered-data">
                            {this.renderCardNews()}

                        </div>
                    
                        


                    </div>
                </div>

            </div>
        )
    }
}

export default NewspaperCompDetail;