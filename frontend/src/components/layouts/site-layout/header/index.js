import './style.scss'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Layout } from 'antd'
import Logo from '../../../elements/logo'
import HeaderControl from './control'
import CustomSearchInput from '../../../elements/input-search'

const AppHeader = () => {
	const navigate = useNavigate();

	const onSearchSubmit = name => {
		navigate(`/search${name ? `?search=${name}&` : '?'}goodsStatus=false`)
	}

	return (
		<Layout.Header className="header">
			<div className="header-section header-section--left">
				<CustomSearchInput
					onSearch={onSearchSubmit}
					placeholder="Tìm tên món đồ"
				/>
			</div>

			<Link to="/">
				<Logo type="mini" className="logo--header" />
			</Link>

			<HeaderControl />
		</Layout.Header>
	)
}

export default AppHeader
