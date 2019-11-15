import React, { Component } from 'react'
import './Login.css'
import moment from 'moment'
import 'moment/locale/id'
import { connect } from 'react-redux'
import { loginUser } from '../../Redux/Actions'
import { Spinner } from 'reactstrap'
import { Redirect } from 'react-router-dom'

moment.locale('id')

class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    //============ ONCHANGE INPUT ============

    onLoginEmail = (e) => {
        this.setState({email: e.target.value})
    }
    onLoginPassword = (e) => {
        this.setState({password: e.target.value})
    }

    //================================================

    btnLogin = () => {
        var dataUser = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(dataUser)      
    }

    renderButtonRegister = () => {
        if(this.props.login.loadingLogin) {
            return (
                <div className="mt-4">
                    <Spinner color="success" />
                </div>
            )
        }

        return <input type="button" className="btn-login mt-4" value="LOGIN" style={{width:'15%'}} onClick={this.btnLogin}/>       
    }

    render() {
        if(this.props.user.email) {
            return <Redirect  to='/'/>
        }

        return (
            <div className="main-login">
                <div className="row justify-content-center">
                    <div className="col-6  login-temp">
                    <div className="text-right">
                            <p style={{margin:0, padding:0}}>www.primordia.com</p>
                        </div>
                        <div className="text-center" style={{borderBottom:'2px solid black', borderTop:'2px solid black'}}>
                            <h1>PRIMORDIA</h1>
                        </div>
                        <div className="edisi">
                            <p>{moment().format('dddd, DD MMMM YYYY')}</p>
                            <p>Edisi: Login</p>
                        </div>
                        <div className="login-title mt-3">
                            <div className="login-box">
                                <h2>LOGIN</h2>
                                <input type="text" className="form-control mt-4" placeholder="Email" value={this.state.email} onChange={this.onLoginEmail} style={{width:'50%'}}/>  
                                <input type="password" className="form-control mt-3 " placeholder="Password" value={this.state.password} onChange={this.onLoginPassword} style={{width:'50%'}}/>
                                {this.renderButtonRegister()}

                            </div>

                        </div>
                    </div>
                </div>
                

            </div>
        )
    }
}

const mapStateToProps = ({ login, user }) => {
    return {
        login,
        user
    }
}

export default connect(mapStateToProps, { loginUser })(Login)