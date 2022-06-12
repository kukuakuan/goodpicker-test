import './style.scss'
import { Row, Col, Form, Button, Tabs, Select } from 'antd'
import React, { useState } from 'react'
import CustomInputField from '../../components/elements/input'
import { useNavigate } from 'react-router-dom'
import SiteLayout from '../../components/layouts/site-layout'
import { useAuthenticate, useAuthState } from '../../hooks/useAuth'
import Custom404 from '../404'
import axios from 'axios'
import { Alert, Modal } from 'antd'
import Loader from '../../components/elements/loader'
import UploadAvatar from './upload-avatar'
// import Avatar from './test/abc'

const {TabPane} = Tabs;

const newAvatar = (state, action) => {
	switch (action.type) {
		case 'get_provinces':
			return { ...state, provinces: action.provinces }
		case 'update_files':
			return { ...state, fileImg: action.fileImg }
		case 'update_index':
			return { ...state, mainIndex: action.mainIndex }
		case 'upload_success':
			return {
				...state,
				status: 'success',
				message: 'Cập nhật thành công',
				clear: true
			}
		case 'upload_fail':
			return {
				...state,
				status: 'error',
				message:
					'Đã có lỗi trong quá trình cập nhật. Vui lòng kiểm tra thông tin đã nhập'
			}
		case 'reset_status':
			return { ...state, status: 'idle' }
		case 'reset_images':
			return { ...state, clear: false }
		case 'error_phone' :
			return {
				...state,
				status:'error',
				message:
					'Số điện thoại nhập không hợp lệ. Vui lòng kiểm tra lại'
			}
		// case 'no_images':
		// 	return {
		// 		...state,
		// 		status: 'error',
		// 		message: 'Bài đăng cần kèm theo ảnh. Vui lòng thêm ảnh vào bài đăng.'
		// 	}
		default:
			throw new Error('Impossible!')
	}
}


const UserProfilePage = () => {
	
	const rules = {
        email: [
            {
                type: 'email',
                required: true,
                message: 'Vui lòng nhập Email'
            }
        ],
        name: [
            {
                required: true,
                message: 'Vui lòng nhập Họ và Tên'
            }
        ],
        username: [
            {
                required: true,
                message: 'Vui lòng nhập tên người dùng'
            }
        ],
		phone: [
            {
				
                // required: true,
                message: 'Vui lòng nhập Số điện thoại'
            },
			({ getFieldValue }) => ({
				validator(_, value) {
					if ((value.length == 10 ) && value[0] === '0' && /^\d+$/.test(value)) {
						return Promise.resolve()
					}

					return Promise.reject(new Error('Số điện thoại nhập không hợp lệ. Vui lòng kiểm tra lại'))
				}
			})
        ],
        address: [
            {
                required: true,
                message: 'Vui lòng nhập địa chỉ'
            }
        ]
    }


	const { user, cookies } = useAuthState()
	
	const [state, dispatch] = React.useReducer(newAvatar, {
		status: 'idle',
		clear: false,
		message: null,
		fileImg: [],
		mainIndex: 0,
		provinces: [],
		initialValues: {
            username:'', 
            email:user.email, 
			name:'',
			phone:'',
            address:'', 
			image:'',// user.userImage,
		}
	})
	
	const [form] = Form.useForm()
	const unmountedRef = React.useRef(false)
	const navigate = useNavigate();
	const authenticate = useAuthenticate()

	const [file,setFile] = useState(null);

	React.useEffect(() => {
		return () => {
			unmountedRef.current = true
		}
	}, [])


	React.useLayoutEffect(() => {
		if (!user) {
			navigate('/')
		}

		const getProvinces = async () => {
			const res = await axios.get('/api/provinces')
			if (!unmountedRef.current) {
				dispatch({ type: 'get_provinces', provinces: res.data })
			}
		}
		getProvinces()
	}, [user, navigate])

	

	const onFinish = async values => {


		let formData = new FormData()

		for (const key in values) {
			formData.append(key, values[key] ?? '')
		}



		formData.append('userImage',file);

		formData.append('userId', user.id)
		formData.append('mainIndex', state.mainIndex)
		
		// state.fileImg.forEach((file, i) => formData.append(`images${i}`, file))

		const modal = Modal.info({
			className: 'new-user-modal',
			title: <span className="new-user-modal__title">Đang xử lý</span>,
			content: (
				<div className="new-user-modal-content">
					<div>
						Đang xử lý cập nhật của bạn, vui lòng chờ trong giây lát.
					</div>
					<Loader size={150} />
				</div>
			),
			icon: null,
			okButtonProps: { hidden: true }
		})

		try {
			await axios.patch(`/api/users/${user.id}/`, formData, {
				// headers: {
				// 	Authorization: `Bearer ${cookies['gp_token']}`
				// }
			})
			.then(res => {
				// console.log(res.data)
				authenticate({user: res.data, token: cookies['gp_token']})
			})

			if (!unmountedRef.current) {
				form.resetFields()
				dispatch({ type: 'upload_success' })
			}
		} catch (error) {
			if (!unmountedRef.current) {
				dispatch({ type: 'upload_fail' })
			}
		} finally {
			window.scrollTo(0, 0)

			if (!unmountedRef.current) {
				modal.destroy()
			}
		}
	}



	const onAlertClose = () => {
		dispatch({ type: 'reset_status' })
	}

	
	return (
		<SiteLayout>
		<div>
		{cookies['gp_token']? (
			<Row className="profile-page">
				<Col xs={24} lg={24}>
					<div className="app-profile-content">
						<Row className="w-100" justify="center">
							<Col span={12} className="c-2">
									<Tabs defaultActiveKey="1" size="large" tabBarGutter = "40px">
										<TabPane tab="Thông tin người dùng" key="1" className="info-user-tab">
											<div>
												{state.message ? (
													<Alert
														className={`update-user__alert update-user__alert--${state.status}`}
														message={state.message}
														type={state.status}
														closable
														onClose={onAlertClose}
													/>
												) : null}
											<div className="profile-acount-page">
												<Col>
													
												<Form 
													className ="update-user-info"
													layout="vertical"
													form={form}
													onFinish={onFinish}
													scrollToFirstError
													initialValues={state.initialValues}
												>
													<Col className="profile-item">
														<Col className="profile-avatar"
															span={6}
															push={9}
															justify="center">
																<Form.Item
																	name = "userImage">
																	<UploadAvatar

																	setFile={setFile}
																		name = "userImage"
																	/>
																</Form.Item>
														</Col>
														<Form.Item
															className="m-0"
															name="name"
															rules={rules.name}
															label="Họ và Tên"
															>
															<CustomInputField
																// placeholder="Họ và Tên"
																customStyle="style#2"
															/>
														</Form.Item>

														<Form.Item
															className="m-0"
															name="username"
															rules={rules.username}
															label="Tên người dùng"
															>
															<CustomInputField
																// placeholder="Tên người dùng"
																customStyle="style#2"
															/>
														</Form.Item>
														

														<Form.Item
															className="m-0"
															name="email"
															rules={rules.email}
															label="Email"
															>
															<CustomInputField
																// placeholder="Email"
																customStyle="style#2"
																disabled
																// defaultValue={user.email}
															/>
														</Form.Item>

														<Form.Item
															className="m-0"
															name="userPhoneNumber"
															rules={rules.phone}
															label="Số điện thoại"
															>
															<CustomInputField
																// placeholder="Số điện thoại"
																customStyle="style#2"
																maxLength={10}
																
															/>
															</Form.Item>
															
															

															<Form.Item
																label="Địa chỉ"
																name="userProvinceID"
																rules={rules.address}
																>
																<Select className="low-bradius-formpage-form__selectprofile">
																	{state.provinces.map(address => (
																	<Select.Option
																		key={address.userProvinceName}
																		value={address.userProvinceID}
																	>
																		{address.userProvinceName}
																	</Select.Option>
																	))}
																</Select>
															</Form.Item>

															<Form.Item
															className="">
																<Button
																	name="submit"
																	className="submit-button"
																	htmlType="submit"
																	type="primary"																	>
																	<span>Hoàn tất</span>
																</Button>
															</Form.Item>
														</Col>							
													</Form>
												</Col>

											</div>
										</div>

									</TabPane>

									{/* <TabPane tab="Thay đổi mật khẩu" key="2" className="info-user-tab" disabled>
										<ChangePassword/>
									</TabPane> */}
								</Tabs>
								
							</Col>
						</Row>
					</div>
				</Col>
			</Row>
			) : (
				<Custom404/>
			)
			}
			</div>
		</SiteLayout>
	)
}

export default UserProfilePage