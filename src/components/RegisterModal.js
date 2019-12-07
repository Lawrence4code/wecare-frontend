import React, { Component } from 'react';
import { Modal, Form, Icon, Input, Button, TimePicker, InputNumber, DatePicker } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

// internal imports
import { userActions } from '../_actions';
import '../styles/RegisterModal.scss';

// to show field error and disable button
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class RegisterModal extends Component {
    state = {
        username: '',
        email: '',
        password: ''
    };

    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }


    onTimeChange(time, timeString) {
        console.log(time, timeString);
    }

    onQuantityChange(time, timeString) {
        console.log(time, timeString);
    }

    onDateChange(time, timeString) {
        console.log(time, timeString);
    }

    handleSubmitForRegister = e => {
        e.preventDefault();
        this.props.form.validateFields((err, { name, email, password }) => {
            if (!err) {
                this.props.register({ name, email, password })
            }
            this.props.form.resetFields()
            this.props.hideRegisterModal(false);
        });
    };

    onNameInputChange = e => {
        const { value } = e.target;
        this.setState(() => {
            return { name: value }
        })
    }

    onEmailInputChange = e => {
        const { value } = e.target;
        this.setState(() => {
            return { email: value }
        })
    }
    onPasswordInputChange = e => {
        const { value } = e.target;
        this.setState(() => {
            return { password: value }
        })
    }

    handleCancel = () => {
        this.setState(() => {
            return {
                username: '',
                email: '',
                password: '',
            };
        })
        this.props.form.resetFields();
        this.props.hideRegisterModal(false);
    };


    render() {
        const { registerModalVisible } = this.props;
        const { getFieldDecorator, getFieldsError, isFieldTouched, getFieldError } = this.props.form;
        const medicineError = isFieldTouched('medicine') && getFieldError('medicine');
        const colorError = isFieldTouched('color') && getFieldError('color');
        const expiryError = isFieldTouched('expiry') && getFieldError('expiry');
        const timeError = isFieldTouched('time') && getFieldError('time');
        const quantityError = isFieldTouched('quantity') && getFieldError('quantity');

        return (
            <Modal
                visible={registerModalVisible}
                title="Please fill up below details to setup new schedule."
                onCancel={this.handleCancel}
                footer={null}
                style={{ top: 200 }}
            >
                <Form onSubmit={this.handleSubmitForRegister} className="register-form">
                    <Form.Item validateStatus={medicineError ? 'error' : ''} help={medicineError || ''}>
                        {getFieldDecorator('medicine', {
                            rules: [{ required: true, message: 'Medicine Name.' }, { min: 4, max: 10, message: 'Medicine name must between 4 to 10 characters.' }],
                        })(
                            <Input
                                prefix={<Icon type="right-square" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Medicine Name"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={colorError ? 'error' : ''} help={colorError || ''}>
                        {getFieldDecorator('color', {
                            rules: [{ required: true, message: 'Medicine Color.' }, { min: 3, max: 10, message: 'Medicine color must between 3 to 10 characters.' }],
                        })(
                            <Input
                                prefix={<Icon type="right-square" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Medicine Color"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={expiryError ? 'error' : ''} help={expiryError || ''}>
                        {getFieldDecorator('expiry', {
                            rules: [{ required: true, message: 'Please select expiry date of the medicine'}],
                        })(
                            <DatePicker onChange={this.onDateChange} />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={quantityError ? 'error' : ''} help={quantityError || ''}>
                        {getFieldDecorator('quantity', {
                            rules: [{ required: true, message: 'Please enter quantity of the medicine in stock.' }],
                        })(
                            <InputNumber min={1} max={10} defaultValue={0} onChange={this.onQuantityChange} />,
                        )}
                    </Form.Item>
                    <Form.Item validateStatus={timeError ? 'error' : ''} help={timeError || ''}>
                        {getFieldDecorator('time', {
                            rules: [{ required: true, message: 'Please time the medicine needs to taken.' }],
                        })(
                            <TimePicker onChange={this.onQuantityChange} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,
                        )}
                    </Form.Item>

                    <Button type="primary" htmlType="submit" className="register-form-button">Create Schedule</Button>
                </Form>
            </Modal>
        )
    }
}

// antd form wrapper
const WrappedRegisterModal = Form.create({ name: 'normal_register' })(RegisterModal);


// action required for register functionality
const actionCreators = {
    register: userActions.register
}

const connectedRegisterModal = connect(null, actionCreators)(WrappedRegisterModal);

export default connectedRegisterModal;
