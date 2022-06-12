import './style.scss'
import { Row, Col, Form, Button, Divider, message } from 'antd'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import CustomInputField from '../../elements/input'
import PropTypes from 'prop-types'
import UserApi from '../../../api/user'
import { STATUS_CODE, RESULT_MESSAGE } from '../../constants'

const ResetPasswordPage = props => {
	const initialValues = {
		new_password: '',
		retype_password: ''
	}

	const router = useRouter()

	const rules = {
		password: [
			{
				required: true,
				message: 'requiredField'
			}
		]
	}

	const onFinish = async values => {
		const data = {
			...values,
			verify_code: props.code,
			email: props.email
		}

		const { new_password, retype_password } = values

		if (new_password != retype_password) {
			message.error('errors.passwordDontMatch')
		} else {
			let result = await UserApi.resetPassword(data)

			if (result && result.code == STATUS_CODE.success) {
				message.success('success.resetPassword')

				router.push('/login')
			} else {
				if (
					result &&
					result.message == RESULT_MESSAGE.errors.mailOrCodeIncorrect
				) {
					message.error('errors.mailOrCodeIncorrect')
				} else if (
					result &&
					result.message == RESULT_MESSAGE.errors.mailHasNotBeenSent
				) {
					message.error('errors.mailHasNotBeenSent')
				} else if (
					result &&
					result.message == RESULT_MESSAGE.errors.overNumOfAllowedAttemps
				) {
					message.error('errors.overNumOfAllowedAttemps')
				} else if (
					result &&
					result.message == RESULT_MESSAGE.errors.codeExpired
				) {
					message.error('errors.codeExpired')
				} else {
					message.error('errors.resetPassword')
				}
			}
		}
	}

	const onFinishFailed = () => {}

	return (
		<React.Fragment>
			<Row className="forgot-pasword-page">
				<Col xs={24} lg={24}>
					<div className="forgot-pasword-content">
						<Row className="w-100" justify="center">
							<Col span={8}>
								<Form
									name="forgot-pasword"
									initialValues={initialValues}
									onFinish={onFinish}
									onFinishFailed={onFinishFailed}
								>
									<div className="form-header">{'resetPassword'}</div>

									<Form.Item
										className="m-0"
										name="new_password"
										rules={rules.password}
									>
										<CustomInputField
											placeholder={'newPassword.newPassword'}
											customStyle="style#2"
											type="password"
										/>
									</Form.Item>

									<Form.Item
										className="m-0"
										name="retype_password"
										rules={rules.password}
									>
										<CustomInputField
											placeholder={'retypePassword'}
											customStyle="style#2"
											type="password"
										/>
									</Form.Item>

									<Form.Item>
										<Button
											name="reset-password"
											className="send-button"
											htmlType="submit"
										>
											{'resetPassword'}
										</Button>
									</Form.Item>
								</Form>
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
		</React.Fragment>
	)
}

ResetPasswordPage.propTypes = {
	code: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired
}

export default ResetPasswordPage
