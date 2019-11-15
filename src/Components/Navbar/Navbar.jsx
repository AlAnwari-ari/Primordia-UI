import React, { Component } from 'react'
import './Navbar.css'
import { connect } from 'react-redux'
// import { urlAPI } from '../../helper/urlAPI'


class NavbarComp extends Component {
    render() {
        if(!this.props.user.authchecked){
            return (
                <div>
                    <div className="nav-container">
                        <nav className="nav container">
                            <ul className="ul">
                                <li className="li logo">PRIMORDIA</li>
                            </ul>
                            <ul className="ul list-menu" style={{visibility: 'hidden'}}>
                                <li className="li">BERLANGGANAN</li>
                                <li className="li reg">REGISTRASI</li>
                                <span style={{marginRight:'20px'}}>|</span>
                                <li className="li login">LOGIN</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )
        }

        if(this.props.user.email === '') {
            return (
                <div>
                    <div className="nav-container">
                        <nav className="nav container">
                            <ul className="ul">
                                <li className="li logo">PRIMORDIA</li>
                            </ul>
                            <ul className="ul list-menu">
                                <li className="li">BERLANGGANAN</li>
                                <li className="li reg">REGISTRASI</li>
                                <span style={{marginRight:'20px'}}>|</span>
                                <li className="li login">LOGIN</li>
                            </ul>
                        </nav>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <div className="nav-container">
                    <nav className="nav container">
                        <ul className="ul">
                            <li className="li logo">PRIMORDIA</li>
                        </ul>
                        <ul className="ul list-menu">
                            <li className="li">BERLANGGANAN</li>
                            <li className="li reg">{this.props.user.role}</li>
                            <span style={{marginRight:'20px'}}>|</span>
                            <li className="li login">{this.props.user.nama}</li>
                            {/* <li className="li login"><img src={`${urlAPI}${this.props.user.pathUser}`} alt="user" style={{height:'50px', width:'50px', borderRadius:'50%', margin: '0', padding:'0'}}/></li> */}
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        user
    }
}

export default connect(mapStateToProps)(NavbarComp)