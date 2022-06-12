import './style.scss'

import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/elements/logo'

const Custom404 = () => {
	return (
		<div className="custom-404">
			<Logo type="mini" className="logo-heading logo-heading--404" />

			<span className="custom-404__title">404. Đã có lỗi xảy ra</span>
			<span className="custom-404__message">
				Chúng tôi rất tiếc nhưng trang bạn đang tìm kiếm hiện không tồn tại.
			</span>

			<Link to="/">
				<button type="button" className="custom-404__button">
					Quay về trang chủ
				</button>
			</Link>
		</div>
	)
}

export default Custom404
