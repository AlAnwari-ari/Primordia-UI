import React, { Component } from 'react'
import './NewspaperReading.css'
import axios from 'axios'
import { urlAPI } from '../../helper/urlAPI'
import { Spinner } from 'reactstrap';


class NewspaperReading extends Component {
    state = {
        dataKoran : [],
        dataKoranImage: [],
        currentPage: 1,
        maxPageKoranImage: 0
    
    }

    componentDidMount () {
        this.getDataKoran(this.props.match.params.id)
        this.getImageKoran(this.props.match.params.id)
        this.setState({ loading : false })
    }

    getDataKoran = (id) => {
        axios.get(urlAPI + '/koran/getkoran/' + id)
            .then( res => {
                console.log(res.data);
                this.setState({ dataKoran: res.data})
            })
            .catch( err => {
                console.log(err);
            })
    }

    getImageKoran = (id) => {
        axios.get(urlAPI + '/koran/getimagekoran/' + id)
            .then( res => {
                console.log(res.data);
                this.setState({ dataKoranImage: res.data, maxPageKoranImage: res.data.length})
            })
            .catch( err => {
                console.log(err);
            })
    }

    renderImageKoran = () => {
        if(this.state.dataKoranImage[this.state.currentPage - 1]) {
            return <img src={`${urlAPI}${this.state.dataKoranImage[this.state.currentPage - 1].pathImage}`} alt="koran"/>
        }

        return (
            <div>
                <h1>Loading...</h1>
                <Spinner color="success" />
            </div>
        )
    }

    renderImagePages = () => {
        
        return this.state.dataKoranImage.map((item) => {
            let classes = this.state.currentPage === parseInt(item.page) ? 'active-reading-page' : '';
            return (
                <li className={classes} onClick={() => this.setState({currentPage: parseInt(item.page)})}>
                    <img src={`${urlAPI}${item.pathImage}`} alt="koran"/>
                    <span>{item.page}</span>
                </li>
            )
        })
    } 

    render() {
        return (
            <div>
                <div className="reading-container">
                    <div className="prev-read">
                        {
                            this.state.currentPage > 1
                            ?
                            <span onClick={() => this.setState({ currentPage: this.state.currentPage - 1})}><h1>Prev</h1></span>
                            :
                            null
                        }

                    </div>
                    <div className="next-read">
                        {
                            this.state.currentPage < this.state.maxPageKoranImage
                            ?
                            <span onClick={() => this.setState({ currentPage: this.state.currentPage + 1})}><h1>Next</h1></span>
                            :
                            null
                        }

                    </div>
                    <div className="reading-board">
                        <div className="header-reading">
                            <span>
                                {
                                    this.state.currentPage > 1
                                    ?
                                    <h6 onClick={() => this.setState({ currentPage: this.state.currentPage - 1})}>Prev</h6>
                                    :
                                    null
                                }
                            </span>
                            <span>{this.state.currentPage}</span>
                            <span>
                                {
                                    this.state.currentPage < this.state.maxPageKoranImage
                                    ?
                                    <h6 onClick={() => this.setState({ currentPage: this.state.currentPage + 1})}>Next</h6>
                                    :
                                    null
                                }
                            </span>
                        </div>
                        {this.renderImageKoran()}
                        
                    </div>
                    <div className="nav-pages">
                        <ul>
                            {this.renderImagePages()}

                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewspaperReading;