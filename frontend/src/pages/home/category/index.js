import './style.scss'

import React from 'react'
import axios from 'axios'
import TimeAgo from 'javascript-time-ago'
import { Col, Row, Skeleton } from 'antd'
import { Link } from 'react-router-dom'

const Category = ({ categoryId, categoryName }) => {
	const [goods, setGoods] = React.useState([])
	const timeAgo = new TimeAgo('vi-VN')
	const unmountedRef = React.useRef(false)

	React.useEffect(() => {
		return () => {
			unmountedRef.current = true
		}
	})

	React.useEffect(() => {
		const getGoods = async () => {
			const res = await axios.get(
				`/api/goods?goodsCategoryID=${categoryId}&goodsStatus=false&limit=6&ordering=-goodsUpdatedTime`
			)

			if (!unmountedRef.current) {
				setGoods(res.data.results)
			}
		}

		getGoods()
	}, [categoryId])

	const renderSkeleton = () => {
		var skeletons = []
		for (let i = 0; i < 4; i++)
			skeletons.push(
				<Col
					key={`categoryItemSke#${i + 1}`}
					md={6}
					className="homepage-newest-category-item"
				>
					<Skeleton.Input
						className="homepage-newest-category-item-skeleton__img"
						active
					/>

					<Skeleton active paragraph={{ rows: 3 }} />
				</Col>
			)
		return <>{skeletons}</>
	}

	return (
		<div className="homepage-newest-category">
			<div className="homepage-newest-category__title">{categoryName}</div>

			<Row className="homepage-newest-category-row">
				{goods.length !== 0
					? goods.map((item, i) => (
							<Col
								key={`${item.goodsID}${item.goodsUpdatedTime}`}
								xs={24}
								md={6}
								className={`homepage-newest-category-item${
									i % 3 === 0 ? ' homepage-newest-category-item--first' : ''
								}`}
							>
								<Link to={`/goods/${item.goodsID}`}>
									<div className="homepage-newest-category-item-img-wrapper">
										<img
											src={
												item.images.find(image => image.isMain === true).image
											}
											alt={item.goodsName}
										/>
									</div>
									<div className="homepage-newest-category-item__ago">
										{timeAgo.format(
											Date.now() -
												(new Date() - new Date(item.goodsUpdatedTime))
										)}
									</div>
									<div className="homepage-newest-category-item__name">
										{item.goodsName}
									</div>
									<div className="homepage-newest-category-item__price">
										{item.goodsPrice.toLocaleString()}₫
									</div>
								</Link>
							</Col>
					  ))
					: renderSkeleton()}
			</Row>
		</div>
	)
}

export default Category
