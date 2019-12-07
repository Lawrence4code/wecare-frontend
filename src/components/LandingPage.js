import React, { Component } from 'react';
import { Layout, Button, Modal } from 'antd';
import { connect } from 'react-redux';

// internal imports
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import { alertActions } from '../_actions';
import { history } from '../_helpers'
import '../styles/LandingPage.scss';


const { Footer } = Layout;

class LandingPage extends Component {
    state = {
        registerModalVisible: false,
        loginModalVisible: false
    };

    componentDidUpdate() {
        if (this.props.alertType === "alert-success") {
            this.registerSuccessInfo();
        } else if (this.props.alertType === "alert-danger") {
            this.registerFailureInfo();
        } else {
            // this.generalFailureInfo();
        }
    }

    registerSuccessInfo() {
        Modal.info({
            title: 'New Schedule has been added successfully',
            content: (
                <div>
                    <p>New schedule has been added, you can the update in the report section of the app</p>
                </div>
            ),
            onOk: () => {
                this.props.alertClear();
                history.push('/login')
            },
        });
    }

    registerFailureInfo() {
        Modal.info({
            title: 'New Schedule has been added successfully',
            content: (
                <div>
                    <p>New schedule has been added, you can the update in the report section of the app</p>
                </div>
            ),
            onOk() {

            },
        });
    }

    generalFailureInfo() {
        Modal.info({
            title: 'New Schedule has been added successfully',
            content: (
                <div>
                    <p>New schedule has been added, you can the update in the report section of the app</p>
                </div>
            ),
            onOk() {

            },
        });
    }

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
            <Layout>
                <section className="hero">
                    <Button className="hero__ctaButton" type="primary" onClick={this.showLoginModal}> Create new schedule</Button>
                </section>
                <Footer className='footer'> @WeCare LLC</Footer>
                <RegisterModal registerModalVisible={this.state.registerModalVisible} hideRegisterModal={this.hideRegisterModal}></RegisterModal>
            </Layout>
        )
    }
}


// store state to component props
function mapState(state) {
    const { type } = state.alert;
    return { alertType: type };
}

// action required for register functionality
const actionCreators = {
    alertClear: alertActions.clear
}

const connectedLandingPage = connect(mapState, actionCreators)(LandingPage);

export default connectedLandingPage;
