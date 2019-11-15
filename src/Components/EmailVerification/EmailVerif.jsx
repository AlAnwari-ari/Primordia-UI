import React, { Component } from 'react'
import './EmailVerif.css'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { confirmEmail } from '../../Redux/Actions'

class EmailVerif extends Component {
    state = {
        message: 'Waiting Email Verification...'
    }

    componentDidMount () {
        var params = queryString.parse(this.props.location.search)
        this.props.confirmEmail(params.token)
        this.setState({ message: 'Email Verified!' })
        
    }

    render() {
        return (
            <div className="email-verified">
                <h1>{this.state.message}</h1>
            </div>
        )
    }
}


export default connect(null, { confirmEmail })(EmailVerif);