import './style.scss'

import React from 'react'
import { Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Logo from '../../../components/elements/logo'

const CustomCarousel = () => {
	const CustomNextArrow = ({ className, onClick }) => (
		<div className={`${className} carousel-arrow`} onClick={onClick}>
			<RightOutlined />
		</div>
	)

	const CustomPrevArrow = ({ className, onClick }) => (
		<div className={`${className} carousel-arrow`} onClick={onClick}>
			<LeftOutlined />
		</div>
	)

	const settings = {
		nextArrow: <CustomNextArrow />,
		prevArrow: <CustomPrevArrow />
	}

	const renderSection = (type, ...titles) => (
		<div className={`carousel-section carousel-section--${type}`}>
			<div className="carousel-section-cover">
				<div className="carousel-section-cover-content">
					{titles.map(title => (
						<span key={title} className="carousel-section-cover__title">
							{title}
						</span>
					))}
				</div>
			</div>
			<Logo className="logo--watermark" alt="small-logo" />
		</div>
	)

	return (
		<Carousel
			className="carousel"
			autoplay
			autoplaySpeed={2000}
			effect="fade"
			arrows
			{...settings}
		>
			{renderSection('clothes', 'Quần áo')}
			{renderSection('cosmetics', 'Mỹ phẩm')}
			{renderSection('gears', 'Phụ kiện', 'máy tính')}
			{renderSection('electronics', 'Thiết bị', 'điện tử')}

			<div className="carousel-section carousel-section--others">
				<div className="carousel-section-cover carousel-section-cover--unclipped">
					<span className="carousel-section-cover__title carousel-section-cover__title--logo">
						<Logo className="logo--main" />
					</span>
				</div>
			</div>
		</Carousel>
	)
}

export default CustomCarousel
