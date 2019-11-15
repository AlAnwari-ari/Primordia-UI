import React, { Component } from 'react'
import './WaitingEmailVerif.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { urlAPI } from '../../helper/urlAPI'

class WaitingEmailVerif extends Component {

    onBtnResendEmailClick = () => {
        axios.post(urlAPI + '/user/resendemailconfirm', {
            email: this.props.register.emailSuccess
        })
        .then(res => {
            alert(res.data.message)
        })
        .catch(err => {
            alert(err.response.data.message);
            
        })

    }

    render() {
        return (
            <div className="waiting-container">
                <h1>Mohon Periksa E-mail Anda untuk konfirmasi</h1>
                <h4>Klik Button di bawah bila tidak menerima Emailnya</h4>
                <input type="button" value="RESEND EMAIL" onClick={this.onBtnResendEmailClick}/>         
            </div>
        )
    }
}

const mapStateToProps = ({ register, user }) => {
    return {
        register, user
    }

}

export default connect(mapStateToProps)(WaitingEmailVerif);