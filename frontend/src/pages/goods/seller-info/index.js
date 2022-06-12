import './style.scss'

import React from 'react'
import axios from 'axios'
import { Skeleton, Avatar } from 'antd'
import { MessageOutlined, PhoneOutlined } from '@ant-design/icons'
import AuthService from '../../../service/AuthService'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState, useAuthenticate } from '../../../hooks/useAuth'

const SellerInfo = ({ sellerId }) => {
	const [seller, setSeller] = React.useState(null)
	const unmountedRef = React.useRef(false)

	React.useEffect(() => {
		unmountedRef.current = false
		const getSeller = async () => {
			try {
				const res = await axios.get(`/api/users/${sellerId}`)

				if (!unmountedRef.current) {
					setSeller(res.data)
				}
			} catch (error) {
				setSeller({
					message: 'Đã xảy ra lỗi trong quá trình lấy thông tin người đăng'
				})
			}
		}

		getSeller()

		return () => {
			unmountedRef.current = true
		}
	}, [sellerId])

	const renderSkeleton = () => <Skeleton active />

	const { user, cookies } = useAuthState()
	const authenticate = useAuthenticate()
	const navigate = useNavigate();
	const createChatRoom = async () => {
		const contact = user.contacts.find(
			({ partner }) => partner.id === seller.id
		)

		if (contact) {
			navigate(`/chat/${contact.chatId}`)
		} else {
			try {
				const chatRes = await axios.post(
					'/api/chats/',
					{
						participants: [user.id, seller.id]
					},
					{
						headers: {
							Authorization: `Bearer ${cookies['gp_token']}`
						}
					}
				)

				const userRes = await AuthService.getMe(cookies['gp_token'])

				authenticate({ user: userRes.data, token: cookies['gp_token'] })

				navigate(`/chat/${chatRes.data.id}`)
			} catch (error) {
				navigate('/login')
			}
		}
	}

	return (
		<div className="seller-card">
			{seller ? (
				seller.message ? (
					<div className="seller-card__error">{seller.message}</div>
				) : (
					<>
						<div className="seller-card-info">
							{seller.userImage ? (
								<Avatar
									size={60}
									src={seller.userImage}
									className="seller-card-info__avatar"
								/>
							) : (
								<Avatar
									size={60}
									className="seller-card-info__avatar seller-card-info__avatar--default"
								>
									{seller.username[0].toUpperCase()}
								</Avatar>
							)}
							<div>
								<div className="seller-card-info__username">
									{seller.username}
								</div>
								<div className="seller-card-info__location">
									{seller.userProvinceID.userProvinceName}
								</div>
							</div>
						</div>

						<div className="seller-card-contact">
							<Link
								to={`/users/${seller.id}`}
								className="seller-card-contact__btn"
							>
								Xem hồ sơ
							</Link>

							{seller.id !== user.id ? (
								<button
									className="seller-card-contact__btn"
									onClick={createChatRoom}
								>
									Liên hệ <MessageOutlined />
								</button>
							) : null}

							{seller.userPhoneNumber ? (
								<div className="seller-card-contact__btn seller-card-contact__btn--phone">
									{seller.userPhoneNumber} <PhoneOutlined />
								</div>
							) : null}
						</div>
					</>
				)
			) : (
				renderSkeleton()
			)}
		</div>
	)
}

export default SellerInfo
