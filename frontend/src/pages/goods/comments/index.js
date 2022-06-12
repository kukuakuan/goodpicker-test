import './style.scss'

import React from 'react'
import axios from 'axios'
import TimeAgo from 'javascript-time-ago'
import { Link } from 'react-router-dom'
import { Avatar, Form, Input, Comment, Skeleton } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useAuthState } from '../../../hooks/useAuth'

const Comments = ({ goodsId }) => {
	const { user, cookies } = useAuthState()
	const [comments, setComments] = React.useState([])
	const [form] = Form.useForm()
	const inputRef = React.useRef(null)
	const timeAgo = new TimeAgo('vi-VN')

	React.useEffect(() => {
		const getComments = async () => {
			const res = await axios.get('/api/comments')

			setComments(res.data)
		}

		getComments()
	}, [])

	const renderSkeleton = () => (
		<div className="comment-section-list-skeleton">
			<Skeleton active avatar paragraph={{ rows: 2 }} />
			<Skeleton active avatar paragraph={{ rows: 2 }} />
			<Skeleton active avatar paragraph={{ rows: 2 }} />
		</div>
	)

	const sendComment = async value => {
		if (value.commentContent) {
			const res = await axios.post(
				'/api/comments/',
				{
					userID: user.id,
					goodsID: goodsId,
					commentContent: value.commentContent
				},
				{
					headers: {
						Authorization: `Bearer ${cookies['gp_token']}`
					}
				}
			)

			setComments([...comments, res.data])
			form.resetFields()
			inputRef.current.focus()
		}
	}

	return (
		<div className="comment-section">
			<div className="comment-section__title">Bình luận</div>

			<div className="comment-section-list">
				{comments
					? comments.map(comment => (
							<Comment
								key={comment.id}
								author={
									<Link to={`/users/${comment.userID.id}`}>
										{comment.userID.username}
									</Link>
								}
								avatar={
									<Link to={`/users/${comment.userID.id}`}>
										{comment.userID.userImage ? (
											<Avatar size="large" src={comment.userID.userImage} />
										) : (
											<Avatar size="large" className="">
												{comment.userID.username[0].toUpperCase()}
											</Avatar>
										)}
									</Link>
								}
								content={
									<p className="comment-section-list-item__content">
										{comment.commentContent}
									</p>
								}
								datetime={timeAgo.format(
									Date.now() - (new Date() - new Date(comment.commentTime))
								)}
							/>
					  ))
					: renderSkeleton()}
			</div>

			{user ? (
				<Form
					form={form}
					className="comment-section-input"
					layout="inline"
					onFinish={sendComment}
				>
					<Form.Item name="commentContent">
						<Input ref={inputRef} placeholder="Thêm bình luận" />
					</Form.Item>

					<button type="submit">
						<SendOutlined />
					</button>
				</Form>
			) : null}
		</div>
	)
}

export default Comments
