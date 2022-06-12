import './style.scss';
import { Router, Link, withTranslation } from '../../../translate/init';
import { Row, Col, Form, Button, Divider, message } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import CustomInputField from '../../elements/input';
import { userResetPassword } from '../../../store/user/action';
import { STATUS_CODE, RESULT_MESSAGE } from '../../../constants'

const ForgotPasswordTemplate = (props) => {

    const dispatch = useDispatch();
    
    const initialValues = {
        email: '',
    };

    const { t } = props;
    const router = useRouter()

    const rules = {
        email: [
            {
                required: true,
                message: t('requiredField'),
            }
        ],
    };

    const onFinish = async values => { 

        message.loading({ content: t('progress.sendResetEmail'), key: 'send_mail' });
        
        const { email } = values
        
        dispatch(userResetPassword( { email } , (res, err) => {
            console.log(res, err);
            if (err) {
                message.error({ 
                    content: t('errors.sentResetEmail'), 
                    key: 'send_mail', 
                    duration: 2 
                })
            }
            
            if (res && res.code == STATUS_CODE.success) {
                message.success({ 
                    content: t('success.sentResetEmail'), 
                    key: 'send_mail', 
                    duration: 2 
                })
            } else {
                if (res.message == RESULT_MESSAGE.errors.emailNotFound) {
                    message.error({ 
                        content: t('errors.emailNotFound'), 
                        key: 'send_mail', 
                        duration: 2 
                    })
                } else {
                    message.error({ 
                        content: t('errors.sentResetEmail'), 
                        key: 'send_mail', 
                        duration: 2 
                    })
                }
            }
        }))

    };

    const onFinishFailed = () => { };

    return (
        <React.Fragment>
            <Row className="forgot-pasword-page">
                <Col xs={ 24 } lg={ 24 }>
                    <div className="forgot-pasword-content">
                        <Row className='w-100' justify="center">
                            <Col span={ 8 }>
                                <Form
                                    name="forgotPasword"
                                    initialValues={ initialValues }
                                    onFinish={ onFinish }
                                    onFinishFailed={ onFinishFailed }>
                                        
                                    <div className="form-header">
                                        { t('forgotPassword') }
                                    </div>

                                    <Form.Item 
                                        className='m-0' 
                                        name='email'
                                        rules={ rules.email }>
                                        <CustomInputField 
                                            placeholder={ t('email') } 
                                            customStyle='style#2'
                                            type='email'
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            name="sendMail"
                                            className="send-button"
                                            htmlType="submit">
                                            { t('sendResetEmail') }
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default withTranslation('common')(ForgotPasswordTemplate);
