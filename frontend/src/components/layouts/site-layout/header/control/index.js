import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Menu, Dropdown, Tooltip, Skeleton } from 'antd'
import { FileAddOutlined, MessageOutlined } from '@ant-design/icons'
import { useAuthState, useLogout } from '../../../../../hooks/useAuth'
import AuthService from '../../../../../service/AuthService'
import { openMessage } from '../../../../elements/auth-message'

const HeaderControl = () => {
	const { user, cookies } = useAuthState()
	const logout = useLogout()

	const onLogOut = async () => {
		AuthService.logout(cookies['gp_token']).then(() => {
			logout()
			openMessage('Bạn đã đăng xuất.')
		})
	}

	const menu = (
		<Menu>
			<Link to="/users">
				<Menu.Item className="header-dropdown-first-li" key="profile">
					Quản lí tài khoản
				</Menu.Item>
			</Link>
			<Menu.Divider />
			<Menu.Item
				className="header-dropdown-last-li"
				key="logout"
				onClick={onLogOut}
			>
				Đăng xuất
			</Menu.Item>
		</Menu>
	)

	return (
		<div className="header-section header-section--right">
			<Link to="/about-us" className="header-link">
				Về chúng tôi
			</Link>

			<div className="d-flex">
				{cookies['gp_token'] ? (
					user ? (
						<>
							{user.contacts.length !== 0 ? (
								<Link
									to={`/chat/${user.contacts[0].chatId}`}
									className="header-icon"
								>
									<Tooltip mouseEnterDelay={0.4} title="Tin nhắn">
										<button className="header-btn header-btn--icon">
											<MessageOutlined />
										</button>
									</Tooltip>
								</Link>
							) : null}

							<Link to="/new-post" className="header-icon">
								<Tooltip mouseEnterDelay={0.4} title="Đăng bài">
									<button className="header-btn header-btn--icon">
										<FileAddOutlined />
									</button>
								</Tooltip>
							</Link>

							<div className="header-auth">
								<Dropdown
									overlay={menu}
									trigger={['click']}
									placement="bottomLeft"
									arrow
								>
									{user.userImage ? (
										<Avatar
											size="large"
											src={user.userImage}
											className="header-auth__avatar"
										/>
									) : (
										<Avatar
											size="large"
											className="header-auth__avatar header-auth__avatar--default"
										>
											{user.username[0].toUpperCase()}
										</Avatar>
									)}
								</Dropdown>
							</div>
						</>
					) : (
						<div>
							<Skeleton.Avatar
								className="header-skeleton"
								shape="circle"
								size="large"
								active
							/>
							<Skeleton.Avatar
								className="header-skeleton"
								shape="circle"
								size="large"
								active
							/>
							<Skeleton.Avatar
								className="header-skeleton"
								shape="circle"
								size="large"
								active
							/>
						</div>
					)
				) : (
					<Link to="/login">
						<div className="header-auth">
							<button className="header-btn header-btn--auth">Đăng nhập</button>
						</div>
					</Link>
				)}
			</div>
		</div>
	)
}

export default HeaderControl
