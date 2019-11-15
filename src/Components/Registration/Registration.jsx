import React, {Component} from 'react'
import './Reg.css'
// import register from '/Users/ASUS/Desktop/JC/The Real Final Project JC 10/real-final/src/icons/non.jpg'
import ava from '../../icons/ava.jpg'
import moment from 'moment'
import 'moment/locale/id'
import { connect } from 'react-redux'
import { registerUser } from '../../Redux/Actions'
import { Spinner } from 'reactstrap'
import { Redirect } from 'react-router-dom'

moment.locale('id')

class Registration extends Component {
    state = {
        namaLengkap: '',
        email: '',
        password: '',
        confirmPassword:'',
        ttl: moment().format('YYYY-MM-DD'),
        selectedKelamin: 'Laki-Laki',
        imageRegister: null,
        imageTampil: ava


    }

    //============ ONCHANGE INPUT ============

    onInputNamaLengkap = (e) => {
        this.setState({namaLengkap: e.target.value})
    }
    onInputEmail = (e) => {
        this.setState({email: e.target.value})
    }
    onInputPassword = (e) => {
        this.setState({password: e.target.value})
    }
    onInputConfirmPassword = (e) => {
        this.setState({confirmPassword: e.target.value})
    }
    onInputTTL = (e) => {
        console.log(e.target.value);
        this.setState({ttl: e.target.value})
    }
    onInputKelamin = (e) => {
        console.log(e.target.value);
        this.setState({ selectedKelamin: e.target.value })
        console.log(this.state.selectedKelamin); 
    }
    imageRegisterChange = (e) => {
        console.log(e.target.files[0])
        if(e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (ev) => {
                this.setState({imageTampil:ev.target.result});
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            this.setState({imageTampil: ava })
        }
        this.setState({imageRegister: e.target.files})
        console.log(this.state.imageRegister);
        

    }
    
    //================================================


    renderButtonRegister = () => {
        if(this.props.register.loadingRegister) {
            return (
                <div>
                    <Spinner color="success" />
                </div>
            )
        }

        return <input type="button" className="btn btn-primary" value="DAFTAR" onClick={this.btnDaftar}/>
        
    }

    btnDaftar = () => {
        var formdata = new FormData();

        var options = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        var data = {
            nama: this.state.namaLengkap,
            email: this.state.email,
            password: this.state.password,
            tanggalLahir: this.state.ttl,
            kelamin: this.state.selectedKelamin,
            role: 'user'
        }

        formdata.append('image', this.state.imageRegister[0])
        formdata.append('data', JSON.stringify(data))
        
        this.props.registerUser(formdata, options)

    }


    render() {
        if(this.props.user.email) {
            return <Redirect to='/'/>
        }

        if(!this.props.register.registerSuccess) {
            return (
                <div className="reg-box">
                    <div className="row justify-content-center">
                        <div className="col-6 reg-form">
                            <div className="text-right">
                                <p style={{margin:0, padding:0}}>www.primordia.com</p>
                            </div>
                            <div className="text-center" style={{borderBottom:'2px solid black', borderTop:'2px solid black'}}>
                                <h1>PRIMORDIA</h1>
                            </div>
                            <div className="edition">
                                <p>{moment().format('dddd, DD MMMM YYYY')}</p>
                                <p>Edisi: Registrasi</p>
                            </div>
                            <div className="judul">
                                <h2 className="text-center mt-3">Ayo membaca e-Paper bersama kami!</h2>
                                                           
                                <div className="row mt-3">
                                    <div className="col-4 img-ava">
                                        <img src={this.state.imageTampil} alt="clndr"/>
                                        <div className="img-file">
                                            <input type="file" onChange={this.imageRegisterChange}/>
                                            <span>Input file</span>
                                        </div>
                                            <p>{this.state.imageRegister ? this.state.imageRegister[0].name : "Nama File"}</p>
    
                                    </div>
                                    <div className="col-8">
                                        <h5>Nama Lengkap</h5>
                                        <input type="text" className="form-control" placeholder="Nama Lengkap" value={this.state.namaLengkap} onChange={this.onInputNamaLengkap}/>
                                        <h5 className="mt-2">Email</h5>
                                        <input type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={this.onInputEmail}/>
                                        <h5 className="mt-2">Password</h5>
                                        <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.onInputPassword} style={{display:'inline', width:'49%'}}/>
                                        <input type="password" className="form-control ml-2" placeholder="Re-type password" value={this.state.confirmPassword} onChange={this.onInputConfirmPassword} style={{display:'inline', width:'49%'}}/>                                 
    
                                    </div>
                                </div>
    
                                <div className="row mt-3">
                                    <div className="col-6">
                                        <h5>TTL</h5>
                                        <input type="date" className="form-control" value={this.state.ttl} onChange={this.onInputTTL}/>
                                        <h5 className="mt-2">Kelamin</h5>
                                        <select className="custom-select" onChange={this.onInputKelamin} defaultValue={this.state.selectedKelamin}>
                                            <option value="Laki-Laki">Laki-Laki</option>
                                            <option value="Perempuan">Perempuan</option>
                                        </select>
    
                                    </div>
                                    <div className="col-6 p-5">
                                        <p>{this.props.register.errorRegister}</p>
                                        {this.renderButtonRegister()}
                                    </div>
    
                                </div>
                            </div>
    
                        </div>
                    </div>
    
                </div>
            )
        }

        return <Redirect to={`/waitingemailverification`} />

    }
}

const mapStateToProps = ({ register, user  }) => {
    return {
        register, user
    }
}

export default connect(mapStateToProps, { registerUser })(Registration)