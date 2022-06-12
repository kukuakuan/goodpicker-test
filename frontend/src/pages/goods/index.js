import './style.scss'

import React from 'react'
import axios from 'axios'
import TimeAgo from 'javascript-time-ago'
import { useParams, useNavigate } from 'react-router-dom'
import { Skeleton, Row, Col, Popconfirm, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import ImageShow from './image-show'
import SiteLayout from '../../components/layouts/site-layout'
import SellerInfo from './seller-info'
import { useAuthState } from '../../hooks/useAuth'
import Comments from './comments'

const GoodsPage = () => {
	const { goodsId } = useParams()
	const navigate = useNavigate();
	const [goods, setGoods] = React.useState(null)
	const timeAgo = new TimeAgo('vi-VN')
	const unmountedRef = React.useRef(false)
	const { user, cookies } = useAuthState()

	React.useEffect(() => {
		unmountedRef.current = false
		const getGoods = async () => {
			try {
				const res = await axios.get(`/api/goods/${goodsId}`)

				if (!unmountedRef.current) {
					setGoods(res.data)
				}
			} catch (error) {
				navigate('/404')
			}
		}

		getGoods()

		return () => {
			unmountedRef.current = true
		}
	}, [goodsId, navigate])

	const renderSkeleton = () => (
		<div className="goodspage-skeleton">
			<Skeleton.Input className="goodspage-skeleton__image" active />
			<Skeleton.Input className="goodspage-skeleton__detail" active />
			<Skeleton.Input className="goodspage-skeleton__seller" active />
		</div>
	)

	const onDelete = async () => {
		await axios.delete(`/api/goods/${goodsId}`, {
			headers: {
				Authorization: `Bearer ${cookies['gp_token']}`
			}
		})

		navigate('/profile')
	}

	return (
		<SiteLayout>
			{goods ? (
				<div className="goodspage">
					<Row>
						<Col xs={18} md={8}>
							<ImageShow images={goods.images} />
						</Col>

						<Col xs={24} md={12}>
							<div className="goodspage-detail">
								<div className="goodspage-detail-header">
									<div className="goodspage-detail-header__title">
										{goods.goodsName}
									</div>
									{user.id === goods.goodsCreateId ? (
										<div className="goodspage-detail-header-control">
											<Popconfirm
												title="Bạn có chắc muốn xóa bài đăng này?"
												onConfirm={onDelete}
												okText="Xác nhận"
												cancelText="Hủy"
											>
												<Tooltip title="Xóa bài đăng" placement="top">
													<button className="goodspage-detail-header-control-btn">
														<DeleteOutlined />
													</button>
												</Tooltip>
											</Popconfirm>
										</div>
									) : null}
								</div>

								<div className="goodspage-detail__price">
									{goods.goodsPrice.toLocaleString()}₫
								</div>

								<div className="goodspage-detail__ago">
									{timeAgo.format(
										Date.now() - (new Date() - new Date(goods.goodsUpdatedTime))
									)}
								</div>

								<div className="goodspage-detail__des">
									<span className="goodspage-detail__des--big">
										Mô tả chi tiết
									</span>
									{goods.goodsDescription
										? goods.goodsDescription
										: 'Không có mô tả'}
								</div>

								<Comments goodsId={goodsId} />
							</div>
						</Col>

						<Col xs={6} md={4}>
							<SellerInfo sellerId={goods.goodsCreateId} />
						</Col>
					</Row>
				</div>
			) : (
				renderSkeleton()
			)}
		</SiteLayout>
	)
}

export default GoodsPage
