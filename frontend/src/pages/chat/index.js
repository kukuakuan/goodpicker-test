import './style.scss'

import React from 'react'
import axios from 'axios'
import WebSocketInstance from '../../service/websocket'
import SiteLayout from '../../components/layouts/site-layout'
import { useAuthState } from '../../hooks/useAuth'
import TimeAgo from 'javascript-time-ago'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Input, Avatar, Row, Col } from 'antd'
import { SendOutlined } from '@ant-design/icons'

const Chat = () => {
	const { user, cookies } = useAuthState()
	const timeAgo = new TimeAgo('vi-VN')
	const { chatID } = useParams()
	const prevChatIDRef = React.useRef(null)
	const messageBoxRef = React.useRef(null)
	const unmountedRef = React.useRef(false)
	const inputRef = React.useRef(null)
	const [messages, setMessages] = React.useState([])
	const navigate = useNavigate();
	const [form] = Form.useForm()

	const addMessage = React.useCallback(
		message => {
			setMessages([...messages, message])
		},
		[messages]
	)

	const waitForSocketConnection = React.useCallback(() => {
		setTimeout(() => {
			if (WebSocketInstance.state() === 1) {
				return
			} else {
				waitForSocketConnection()
			}
		}, 100)
	}, [])

	React.useLayoutEffect(() => {
		messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight
	})

	React.useEffect(() => {
		WebSocketInstance.addCallbacks(addMessage)
	}, [addMessage])

	React.useEffect(() => {
		if (!user || !cookies['gp_token']) {
			navigate('/')
		} else {
			unmountedRef.current = false
			const checkIfParticipants = async () => {
				try {
					const res = await axios.get(`/api/chats/${chatID}`, {
						headers: {
							Authorization: `Bearer ${cookies['gp_token']}`
						}
					})

					if (prevChatIDRef.current !== chatID) {
						if (prevChatIDRef.current != null) {
							WebSocketInstance.disconnect()
						}
						waitForSocketConnection()
						WebSocketInstance.connect(chatID)
						prevChatIDRef.current = chatID
					}

					if (!unmountedRef.current) {
						console.log(res.data.messages)
						setMessages(res.data.messages)
					}
				} catch (e) {
					navigate('/')
				}
			}

			checkIfParticipants()
		}

		return () => {
			WebSocketInstance.disconnect()
			unmountedRef.current = true
		}
	}, [chatID, cookies, navigate, user, waitForSocketConnection])

	const sendMessageHandler = value => {
		if (value.message) {
			const messageObject = {
				from: user.username,
				content: value.message,
				chatId: chatID
			}
			WebSocketInstance.newChatMessage(messageObject)
			form.resetFields()
			inputRef.current.focus()
		}
	}

	const renderContacts = () => {
		return user.contacts.map(({ partner, chatId }) => (
			<Link
				key={`${partner.username}${chatId}`}
				className={`chatpage-contact${
					Number(chatId) === Number(chatID) ? ' chatpage-contact--active' : ''
				}`}
				to={`/chat/${chatId}`}
			>
				{partner.userImage ? (
					<Avatar
						size="large"
						src={partner.userImage}
						className="chatpage-contact__avatar"
					/>
				) : (
					<Avatar
						size="large"
						className="chatpage-contact__avatar chatpage-contact__avatar--default"
					>
						{partner.username[0].toUpperCase()}
					</Avatar>
				)}
				<div className="chatpage-contact__name">{partner.username}</div>
			</Link>
		))
	}

	const renderMessages = () => {
		return messages.map(message => (
			<div
				className={`chatpage-message chatpage-message${
					user.username === (message.author ?? message.user.username)
						? '--right'
						: ''
				}`}
				key={`${message.author ?? message.user.username}${message.timestamp}`}
			>
				<div className="chatpage-message__content">{message.content}</div>

				<div className="chatpage-message__ago">
					{timeAgo.format(
						Date.now() - (new Date() - new Date(message.timestamp))
					)}
				</div>
			</div>
		))
	}

	return (
		<SiteLayout>
			<div className="chatpage">
				<Row className="chatpage-row">
					<Col xs={24} md={5} className="chatpage-contact-list">
						{user && renderContacts()}
					</Col>

					<Col xs={20} md={14} className="chatpage-main">
						<div
							id="messageList"
							className="chatpage-message-list"
							ref={messageBoxRef}
						>
							{user && renderMessages()}
						</div>

						<Form
							form={form}
							className="chatpage-input"
							layout="inline"
							onFinish={sendMessageHandler}
						>
							<Form.Item name="message">
								<Input ref={inputRef} placeholder="Gửi tin nhắn" />
							</Form.Item>

							<button type="submit">
								<SendOutlined />
							</button>
						</Form>
					</Col>

					<Col xs={4} md={5}>
						<div className="chatpage-link-list">
							<Link
								className="chatpage-link"
								to={`/users/${
									user.contacts.find(
										contact => Number(contact.chatId) === Number(chatID)
									).partner.id
								}`}
							>
								Xem trang cá nhân
							</Link>
						</div>
					</Col>
				</Row>
			</div>
		</SiteLayout>
	)
}

export default Chat
