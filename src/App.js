import React, { Component } from 'react';
import {withRouter, Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'
import { checkLogin } from './Redux/Actions'
import NavbarComp from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import Registration from './Components/Registration/Registration';
import Login from './Components/Login/Login';
import Subscribe from './Components/Subscribe/Subscribe';
import Transaction from './Components/Transaction/Transaction';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import WaitingEmailVerif from './Components/EmailVerification/WaitingEmailVerif';
import EmailVerif from './Components/EmailVerification/EmailVerif';
import NewspaperReading from './Components/Newspaper/NewspaperReading';
import NewspaperCompDetail from './Components/Newspaper/NewspaperCompDetail';


class App extends Component {
  componentDidMount () {
    var token = localStorage.getItem('token')
    console.log('token: ', token);
    this.props.checkLogin(token)

  }

  render() {
    return (
      <div>
        <NavbarComp />

        <Switch>
          <Route component={Home} path='/' exact/>
          <Route component={Registration} path='/registration'/>
          <Route component={Login} path='/login'/>
          <Route component={Subscribe} path='/berlangganan'/>
          <Route component={Transaction} path='/transaksi/:id'/>
          <Route component={AdminDashboard} path='/admindashboard'/>
          <Route component={WaitingEmailVerif} path='/waitingemailverification'/>
          <Route component={EmailVerif} path='/emailverified'/>
          <Route component={NewspaperReading} path='/koran/:id'/>
          <Route component={NewspaperCompDetail} path='/publisher/:id'/>
        </Switch>

        <Footer/>
      </div>
    )
  }
}

export default connect(null, { checkLogin })(withRouter(App)) 
