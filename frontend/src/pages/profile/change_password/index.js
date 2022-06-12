import './style.scss'
import React from 'react'
import { Form, message, Modal } from 'antd'
import { useHistory } from 'react-router-dom'
import { useAuthState, useAuthenticate } from '../../../hooks/useAuth'
import axios from 'axios'
import Loader from '../../../components/elements/loader'


const setPassword = (state, action) => {
	switch (action.type) {
		case 'change_success':
			return {
				...state,
				status: 'success',
				message: 'Cập nhật thành công',
				clear: true
			}
		case 'change_fail':
			return {
				...state,
				status: 'error',
				message:
					'Đã có lỗi trong quá trình cập nhật. Vui lòng kiểm tra thông tin đã nhập'
			}
		case 'reset_status':
			return { ...state, status: 'idle' }
		default:
			throw new Error('Impossible!')
	}
}


const ChangePassword = () => {

    const rules = {
        currentPassword: [
            {
                // type: "password",
                required: true,
                message: 'Vui lòng nhập mật khẩu cũ'
            }
        ],
        newPassword: [
            {
                // type: "password",
                required: true,
                message: 'Vui lòng nhập mật khẩu mới'
            }
        ],
        confirmNewPassword: [
            {
                // type: "password",
                required: true,
                message: 'Vui lòng nhập lại mật khẩu mới'
            },
			({ getFieldValue }) => ({
				validator(_, value) {
					if (!value || getFieldValue('password') === value) {
						return Promise.resolve()
					}

					return Promise.reject(new Error('Mật khẩu nhập lại không khớp'))
				}
			})
        ]
    }

    const {user, cookies} = useAuthState()

    // const history = useHistory()
    const [currentPassword, setCurrentPassword] = React.useState(user.password)

    const [checkPassword, setCheckPassword] = React.useState(false)
    
    const [state, dispatch] = React.useReducer(setPassword, {
        status: 'idle',
        intitialValues: {
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        }
    })

    const [form] = Form.useForm()
	const unmountedRef = React.useRef(false)
	const authenticate = useAuthenticate()
    
    const onFinishSubmit = async values => {

        let formData = new FormData()
        
        if (values.currentPassword === user.password) {
            formData.append('password', values.newPassword)
        }

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
            await axios.patch(`/api/users/${user.id}/`, formData ,{
                
            })
            .then(res => {
				console.log(res.data.password)
				authenticate({user: res.data, token: cookies['gp_token']})
			})

			if (!unmountedRef.current) {
				form.resetFields()
				dispatch({ type: 'change_success' })
			}
		} catch (error) {
			if (!unmountedRef.current) {
				dispatch({ type: 'change_fail' })
			}
		} finally {
			window.scrollTo(0, 0)

			if (!unmountedRef.current) {
				modal.destroy()
			}
		}

        message.success('Change password complete')
        // history.push('/')
    }
    return(
        <React.Fragment>
            
            {/* <Form
                form = {form}
                initialValues = {state.initialValues}
                onFinish={onFinishSubmit}
                >
                <Form.Item
                    className="m-0"
                    name="currentPassword"
                    rules={rules.currentPassword}
                    label="Mật khẩu cũ"
                >
                    <CustomInputField
                        
                        customStyle="style#2"
                    />
                </Form.Item>
            
                <Form.Item
                    className="m-0"
                    name="password"
                    rules={rules.newPassword}
                    label="Mật khẩu mới"
                >
                <CustomInputField
                    
                    customStyle="style#2"
                />
                </Form.Item>

                

                <Form.Item
                    className="m-0"
                    name="confirmNewPassword"
                    rules={rules.confirmNewPassword}
                    label="Nhập lại mật khẩu mới"
                    >
                    <CustomInputField
                        
                        customStyle="style#2"
                    />
                </Form.Item>


                <Form.Item>
                    <Button
                        name="submit"
                        className="submit-button"
                        htmlType="submit"
                        type="primary"
                    >
                        Hoàn tất
                    </Button>
                </Form.Item>
            </Form> */}
            <h1>Xin lỗi không thể thay đổi mật khẩu được.</h1>
        </React.Fragment>
    )
}

export default ChangePassword