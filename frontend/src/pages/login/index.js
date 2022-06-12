import './style.scss'
import { Row, Col, Form, Button, Select } from 'antd'
import React, { useLayoutEffect, useState } from 'react'
import CustomInputField from '../../components/elements/input'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../components/elements/logo'
import SiteLayout from '../../components/layouts/site-layout'
import AuthService from '../../service/AuthService'
import { useAuthenticate, useAuthState } from '../../hooks/useAuth'
import { openMessage } from '../../components/elements/auth-message'
import axios from 'axios'

const LoginPage = () => {
	const rules = {
		email: [
			{ type: 'email', message: 'Địa chỉ email không hợp lệ.' },
			{ required: true, message: 'Vui lòng nhập email.', whitespace: true }
		],
		name: [
			{
				required: true,
				message: 'Vui lòng nhập tên của bạn.',
				whitespace: true
			}
		],
		username: [
			{
				required: true,
				message: 'Vui lòng nhập tên người dùng.',
				whitespace: true
			}
		],
		password: [
			{ required: true, message: 'Vui lòng nhập mật khẩu.', whitespace: true }
		],
		confirmPassword: [
			{
				required: true,
				message: 'Vui lòng nhập lại mật khẩu'
			},
			({ getFieldValue }) => ({
				validator(_, value) {
					if (!value || getFieldValue('password') === value) {
						return Promise.resolve()
					}

					return Promise.reject(new Error('Mật khẩu nhập lại không khớp'))
				}
			})
		],
		userProvinceID: [
			{ required: true, message: 'Vui lòng chọn một tỉnh thành' }
		]
	}

	const authenticate = useAuthenticate()
	const navigate = useNavigate();
	const authState = useAuthState()
	const unmountedRef = React.useRef(false)

	const [error, setError] = useState(null)
	const [provinces, setProvinces] = useState([])

	React.useEffect(() => {
		return () => {
			unmountedRef.current = true
		}
	})

	useLayoutEffect(() => {
		if (authState.cookies['gp_token']) {
			navigate('/')
		}

		const getProvinces = async () => {
			const res = await axios.get('/api/provinces')

			if (!unmountedRef.current) {
				setProvinces(res.data)
			}
		}

		getProvinces()
	}, [authState.cookies, navigate])

	const onFinishLogin = async values => {
		AuthService.login({
			email: values.email,
			password: values.password
		})
			.then(res => {
				onAuthenticate(res.data)
			})
			.catch(err => {
				if (err.response.data.non_field_errors) {
					setError(err.response.data.non_field_errors[0])
				} else {
					setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.')
				}
			})
	}

	const onFinishRegister = async values => {
		AuthService.register({
			email: values.email,
			password: values.password,
			username: values.username,
			name: values.name,
			userProvinceID: values.userProvinceID
		})
			.then(res => {
				onAuthenticate(res.data)
			})
			.catch(err => {
				if (err.response.data) {
					const errMsgs = []

					if (err.response.data.email) {
						errMsgs.push('Email này đã được sử dụng.')
					}

					if (err.response.data.username) {
						errMsgs.push('Tên người dùng này đã được sử dụng.')
					}

					if (!err.response.data.email && !err.response.data.username) {
						errMsgs.push('Đã có lỗi xảy ra. Vui lòng thử lại sau.')
					}

					setError(errMsgs)
				} else {
					setError('Đã có lỗi xảy ra. Vui lòng thử lại sau.')
				}
			})
	}

	const onAuthenticate = authData => {
		authenticate(authData)
		navigate('/')
		openMessage('Bạn đã đăng nhập.')
	}

	const [activeTab, setActiveTab] = useState('login')

	const onSwitchTab = tab => {
		setError(null)
		setActiveTab(tab)
	}

	return (
		<SiteLayout>
			<div className="signup-page">
				<div className="app-signup-sidebar"></div>
				<div className="app-signup-content">
					<Row justify="end" className="w-100">
						<Col xs={24} md={16}>
							<div className="login-slogan">
								<Link to="/">
									<Logo className="logo--slogan" />
								</Link>

								<div className="login-slogan__content">
									Đem giá trị&nbsp;
									<span className="login-slogan__content--new">mới</span> đến
									với đồ vật&nbsp;
									<span className="login-slogan__content--old">cũ</span>.
								</div>
							</div>
						</Col>
						<Col xs={24} md={8} className="c-2">
							<div className="form-header"></div>

							{error ? (
								Array.isArray(error) && error.length > 1 ? (
									<div className="form-error-message">
										<ul>
											{error.map(msg => (
												<li key={msg}>{msg}</li>
											))}
										</ul>
									</div>
								) : (
									<div className="form-error-message">{error}</div>
								)
							) : null}

							{activeTab === 'login' ? (
								<Form name="login" onFinish={onFinishLogin}>
									<Form.Item className="m-0" name="email" rules={rules.email}>
										<CustomInputField
											placeholder="Email"
											customStyle="style#2"
										/>
									</Form.Item>

									<Form.Item
										className="m-0"
										name="password"
										rules={rules.password}
									>
										<CustomInputField
											placeholder="Mật khẩu"
											customStyle="style#2"
											type="password"
										/>
									</Form.Item>

									<Form.Item>
										<Link className="forgot-password" to="/forgot-password">
											<span>Quên mật khẩu?</span>
										</Link>
									</Form.Item>

									<Form.Item>
										<Button
											name="login"
											className="signup-button"
											htmlType="submit"
											type="primary"
										>
											<span>Đăng nhập</span>
										</Button>
									</Form.Item>
									<div className="auth-alt">
										<span className="auth-alt auth-alt--sub">hoặc</span>
										<span
											className="auth-alt auth-alt--main"
											onClick={() => onSwitchTab('register')}
										>
											Tạo tài khoản
										</span>
									</div>
								</Form>
							) : (
								<Form name="register" onFinish={onFinishRegister}>
									<Form.Item className="m-0" name="name" rules={rules.name}>
										<CustomInputField
											placeholder="Họ và Tên"
											customStyle="style#2"
										/>
									</Form.Item>

									<Form.Item
										className="m-0"
										name="username"
										rules={rules.username}
									>
										<CustomInputField
											placeholder="Tên người dùng"
											customStyle="style#2"
										/>
									</Form.Item>

									<Form.Item className="m-0" name="email" rules={rules.email}>
										<CustomInputField
											placeholder="Email"
											customStyle="style#2"
										/>
									</Form.Item>

									<Form.Item
										className="m-0"
										name="userProvinceID"
										rules={rules.userProvinceID}
									>
										<Select className="round-select" placeholder="Tỉnh thành">
											{provinces
												? provinces.map(province => (
														<Select.Option
															key={province.userProvinceName}
															value={province.userProvinceID}
														>
															{province.userProvinceName}
														</Select.Option>
												  ))
												: null}
										</Select>
									</Form.Item>

									<Form.Item
										className="m-0"
										name="password"
										rules={rules.password}
									>
										<CustomInputField
											placeholder="Mật khẩu"
											customStyle="style#2"
											type="password"
										/>
									</Form.Item>

									<Form.Item
										className="m-0"
										name="confirmPassword"
										rules={rules.confirmPassword}
									>
										<CustomInputField
											placeholder="Nhập lại mật khẩu"
											customStyle="style#2"
											type="password"
										/>
									</Form.Item>

									<Form.Item>
										<Button
											name="signup"
											className="signup-button"
											htmlType="submit"
										>
											<span>Đăng ký</span>
										</Button>
									</Form.Item>

									<div className="auth-alt">
										<span className="auth-alt auth-alt--sub">hoặc</span>
										<span
											className="auth-alt auth-alt--main"
											onClick={() => onSwitchTab('login')}
										>
											Đăng nhập
										</span>
									</div>
								</Form>
							)}
						</Col>
					</Row>
				</div>
			</div>
		</SiteLayout>
	)
}

LoginPage.propTypes = {}

export default LoginPage
