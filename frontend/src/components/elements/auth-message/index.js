import './style.scss'
import { message } from 'antd'

export const openMessage = content => {
	message.success({ content, className: 'auth-message', duration: 2 })
}
