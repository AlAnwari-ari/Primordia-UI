import React, { Component } from 'react'
import './AdminDashboard.css'
import Analytics from './Analytics'
import AdminMessages from './AdminMessages'
import ManageDashboard from './ManageDashboard'


class AdminDashboard extends Component {
    state = {
        tabMenu : 1
    }

    render() {
        return (
            <div className="main-admin">
                <div className="side-nav">
                    <nav>
                        <ul>
                            <li onClick={() => this.setState({tabMenu : 1})} className={this.state.tabMenu === 1 ? "active-admin" : null}>Analytics</li>
                            <li onClick={() => this.setState({tabMenu : 2})} className={this.state.tabMenu === 2 ? "active-admin" : null}>ePaper</li>
                            <li onClick={() => this.setState({tabMenu : 3})} className={this.state.tabMenu === 3 ? "active-admin" : null}>Messages</li>
                        </ul>
                    </nav>
                </div>
                <div className="admin-content">
                    { 
                        this.state.tabMenu === 1 ?
                        <Analytics/> :
                        this.state.tabMenu === 2 ?
                        <ManageDashboard/> :
                        <AdminMessages/>
                    }
                </div>

            </div>
        )
    }
}

export default AdminDashboard;