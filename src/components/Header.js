import React, { Component } from 'react';
import { Menu } from 'antd';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

// internal imports
import RegisterModal from './RegisterModal';
import '../styles/Header.scss';

class Header extends Component {
    state = {
        registerModalVisible: false,
        loginModalVisible: false
    };

    showRegisterModal = () => {
        this.setState({
            registerModalVisible: true,
        });
    };

    showLoginModal = () => {

        this.setState({
            loginModalVisible: true,
        });
    };

    hideRegisterModal = (value) => {
        this.setState({
            registerModalVisible: value,
        });

    };

    hideLoginModal = (value) => {
        this.setState({
            loginModalVisible: value,
        });

    };


    render() {
        return (
            <div>
                <header>
                    <div className="logo" >WeCare</div>
                    <Menu className="menu"
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['login']}
                    >
                        <Menu.Item className="menu__item" key="register" onClick={this.showRegisterModal}>Create New Schedule</Menu.Item>
                    </Menu>
                </header>
          
                <RegisterModal registerModalVisible={this.state.registerModalVisible} hideRegisterModal={this.hideRegisterModal}></RegisterModal>
            </div>
        )
    }
}


function mapState(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}


const actionCreators = {
    logout: userActions.logout
};

const connectedHeader = connect(mapState, actionCreators)(Header);

export default connectedHeader;