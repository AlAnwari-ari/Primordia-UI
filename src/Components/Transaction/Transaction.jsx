import React, { Component } from 'react'
import './Transaction.css'
import Gold from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/gold.png'
import axios from 'axios'
import { urlAPI } from '../../helper/urlAPI'
import moment from 'moment'
import { connect } from 'react-redux'

class Transaction extends Component {
    state = {
        dataPackage : [],
        dataTransaksi: [],
        firstClickPay: false,
        timeRunning: false,
        then: moment('2019-11-16 00:00:00').add(5, 'hours'),
        hours: '',
        minutes: '',
        seconds: ''
    }

    componentDidMount = () => {
        this.getDataPackage(this.props.match.params.id)
    }

    componentDidUpdate() {
        if (this.state.seconds === 0 && this.state.minutes === 0 && this.state.timeRunning) {
            clearInterval(this.interval);
            this.setState({timeRunning: false, then: null})
        }
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    getDataPackage = (id) => {
        axios.get(urlAPI + '/package/getpackage/' + id)
            .then( res => {
                console.log(res.data);
                this.setState({ dataPackage: res.data })
            })
            .catch( err => {
                console.log(err);
            })
    }

    onBtnStart = () => {
        //jgn lupa di getdata transaksi taro kondisi duration.hours() < 0
        this.setState({dataTransaksi: [1,2,3], firstClickPay : !this.state.firstClickPay, timeRunning: true})
        this.interval = setInterval(() => {
            const then = moment(this.state.then);
            const now = moment();
            const duration = moment.duration(then.diff(now));
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            
            this.setState({ hours, minutes, seconds });
        }, 1000);
    }

    onBtnGoBack = () => {
        
    }


    render() {
        console.log(`${moment().add(5, 'hours').format('YYYY-MM-DD HH:mm:ss')}`);

        if (this.state.dataPackage.length) {
            return (
                <div className="transction-container">
                    <div className="title-transaction">
                        <h2>Checkout</h2>
    
                    </div>
                    <div className="package-detail">
                        <h5>Product Detail</h5>
                        <img src={urlAPI + this.state.dataPackage[0].pathPaket} alt="produk"/>
                        <table>
                            <tr>
                                <th>Product</th>
                                <td>{this.state.dataPackage[0].namaPaket}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>Rp{this.state.dataPackage[0].hargaBulanan}</td>
                            </tr>
                            <tr>
                                <th>Deskripsi</th>
                                <td><p>Akses {this.state.dataPackage[0].deskripsi}</p></td>
                            </tr>
    
                        </table>
    
                    </div>
                    <div className="bill-checkout">
                        <h5>Your Order</h5>
                        <table className="order-product">
                            <tr>
                                <th>Product</th>
                                <td>{this.state.dataPackage[0].namaPaket}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>Rp{this.state.dataPackage[0].hargaBulanan}</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <td>Rp{this.state.dataPackage[0].hargaBulanan}
                                </td>
                            </tr>
                            <tr className="payment">
                                <th>Payment</th>
                                <td>
                                    {
                                        this.state.dataTransaksi.length 
                                        ?
                                        <div>
                                            {
                                                this.state.seconds === 0 && this.state.minutes === 0
                                                ?
                                                <h5>Waktu Habis Silahkan ulang transaksi anda</h5>
                                                :
                                                <div className="timer-payment">
                                                    <h6>Menunggu Pembayaran...</h6>
                                                    <span>
                                                        <h5>{ this.state.hours } : </h5> 
                                                        <h5>{ this.state.minutes } : </h5> 
                                                        <h5>{ this.state.seconds }</h5> 
                                                    </span>
                                                </div> 
                                            }
                                        </div> 
                                        : 
                                        <input type="button" value="BAYAR" onClick={this.onBtnStart}/>    
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <ul>
                                        <li>Setelah klik BAYAR, mohon baca instruksi yang tampil di bawah!</li>
                                    </ul>
                                </td>
                            </tr>
                        </table>
    
                        <div className="back-transaction">
                            <input type="button" value="BACK" onClick={this.onBtnGoBack}/>
                        </div>
    
                    </div>
                    <div className="payment-detail">
                        {
                            this.state.firstClickPay
                            ?
                            <div className="instruction-payment">
                                <h5>Instruksi:</h5>
                                <ol>
                                    <li>Pembayaran hanya menerima uang Rupiah(Rp), tidak menerima jenis Dollar($) apapun</li>
                                    <li>Transfer ke nomor rekening Bank Sendiri 079321486 a.n. Primordia</li>
                                    <li>Waktu pembayaran hingga upload bukti transfer adalah 5 jam</li>
                                    <li>Foto bukti transaksi kemudian upload di dashboard anda!</li>
                                    <li>Jika waktu pembayaran sudah habis sebelum anda upload bukti transaksi, maka dianggap membatalkan transaksi dan harus mengulang transaksi kembali</li>
                                </ol>
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
            )

        }

        return (
            <div className="transction-container">
                <div className="title-transaction">
                    <h2>Checkout</h2>

                </div>
                <div className="package-detail">
                    <h5>Product Detail</h5>
                    <img src={Gold} alt="produk"/>
                    <table>
                        <tr>
                            <th>Product</th>
                            <td>Nama Product</td>
                        </tr>
                        <tr>
                            <th>Price</th>
                            <td>Rp00000</td>
                        </tr>
                        <tr>
                            <th>Deskripsi</th>
                            <td><p>Akses 3 Publisher</p></td>
                        </tr>

                    </table>

                </div>
                <div className="bill-checkout">
                    <h5>Your Order</h5>
                    <table className="order-product">
                        <tr>
                            <th>Product</th>
                            <td>Nama Product</td>
                        </tr>
                        <tr>
                            <th>Price</th>
                            <td>Rp00000</td>
                        </tr>
                        <tr>
                            <th>Total</th>
                            <td>Rp00000
                            </td>
                        </tr>
                        <tr className="payment">
                            <th>Payment</th>
                            <td><div>
                                    Rp <input type="number"/>
                                </div>
                                <input type="button" value="BAYAR"/>
                            </td>
                        </tr>
                    </table>

                    <div className="back-transaction">
                        <input type="button" value="CANCEL"/>
                    </div>

                    

                </div>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => {
    return {
        ...user
    }
}

export default connect(mapStateToProps)(Transaction);