import React, { Component } from 'react'
import './ManageDashboard.css'
import Publisher from './Publisher'
import Package from './Package'
import Epaper from './Epaper'


class ManageDashboard extends Component {
    state = {
        tabMenu : 1
    }

    render() {
        return (
            <div className="manage-dashboard">
                <h1>ManageDashboard</h1>
                <nav>
                    <ul>
                        <li onClick={() => this.setState({tabMenu : 1})} className={this.state.tabMenu === 1 ? "active-manage" : null}>Publisher</li>
                        <li onClick={() => this.setState({tabMenu : 2})} className={this.state.tabMenu === 2 ? "active-manage" : null}>Package</li>
                        <li onClick={() => this.setState({tabMenu : 3})} className={this.state.tabMenu === 3 ? "active-manage" : null}>ePaper</li>
                    </ul>
                </nav>
                <div className="manage-content">
                    {
                        this.state.tabMenu === 1 ?
                        <Publisher/> :
                        this.state.tabMenu === 2 ?
                        <Package/> :
                        <Epaper/>

                    }
                    
                </div>
            </div>
        )
    }
}

export default ManageDashboard;