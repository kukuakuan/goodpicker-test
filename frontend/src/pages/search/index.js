import './style.scss'

import React from 'react'
import axios from 'axios'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import {
	Form,
	Row,
	Col,
	Input,
	Select,
	DatePicker,
	InputNumber,
	Skeleton
} from 'antd'
import Timeago from 'javascript-time-ago'
import SiteLayout from '../../components/layouts/site-layout'

const searchReducer = (state, action) => {
	switch (action.type) {
		case 'get_categories':
			return { ...state, categories: action.categories }
		case 'get_goods':
			return { ...state, goods: action.goods, loading: false }
		case 'set_loading':
			return { ...state, loading: true }

		default:
			throw new Error('Impossible!')
	}
}

const SearchPage = () => {
	const timeAgo = new Timeago('vi-VN')
	const [state, dispatch] = React.useReducer(searchReducer, {
		categories: [],
		goods: [],
		loading: false
	})
	const unmountedRef = React.useRef(false)

	React.useEffect(() => {
		return () => {
			unmountedRef.current = true
		}
	}, [])

	React.useLayoutEffect(() => {
		const getCategories = async () => {
			const res = await axios.get('/api/categories')

			if (!unmountedRef.current) {
				dispatch({ type: 'get_categories', categories: res.data })
			}
		}
		getCategories()
	}, [])

	const location = useLocation()

	React.useEffect(() => {
		const getGoods = async () => {
			if (!unmountedRef.current) {
				dispatch({ type: 'set_loading' })
			}
			const res = await axios.get(`/api/goods${location.search}`)

			if (!unmountedRef.current) {
				dispatch({ type: 'get_goods', goods: res.data })
			}
		}

		getGoods()
	}, [location.search, state.categories])

	const navigate = useNavigate();

	const onFinish = async values => {
		var queryString = '?goodsStatus=false'

		for (const key in values) {
			if (values[key] && key !== 'goodsUpdatedTime') {
				queryString = queryString.concat(`&${key}=${values[key]}`)
			}
		}

		if (values['goodsUpdatedTime']) {
			queryString = queryString.concat(
				`&goodsUpdatedTime__gte=${new Date(
					values.goodsUpdatedTime[0]._d
				).toISOString()}&goodsUpdatedTime__lte=${new Date(
					values.goodsUpdatedTime[1]
				).toISOString()}`
			)
		}

		navigate(`/search${queryString}`)
	}

	const renderSkeleton = () => (
		<div className="search-page-result-card">
			<Skeleton.Input
				active
				className="search-page-result-card__img-wrapper search-page-result-card__img-wrapper--skeleton"
			/>
			<Skeleton
				active
				paragraph={3}
				className="search-page-result-card-content"
			/>
		</div>
	)

	return (
		<SiteLayout>
			<div className="search-page">
				<div className="low-bradius-formpage__title">Kết quả tìm kiếm</div>

				<Form
					className="low-bradius-formpage-form"
					layout="vertical"
					onFinish={onFinish}
				>
					<Row gutter={{ xs: 0, md: 4, lg: 8 }}>
						<Col xs={24} md={12}>
							<Form.Item name="search" label="Tên món đồ">
								<Input className="low-bradius-formpage-form__input" />
							</Form.Item>
						</Col>

						<Col xs={24} md={6}>
							<Form.Item name="goodsCategoryID" label="Danh mục">
								<Select className="low-bradius-formpage-form__select">
									{state.categories.map(category => (
										<Select.Option
											key={category.goodsCategoryName}
											value={category.goodsCategoryID}
										>
											{category.goodsCategoryName}
										</Select.Option>
									))}
								</Select>
							</Form.Item>
						</Col>

						<Col xs={24} md={6}>
							<Form.Item name="ordering" label="Sắp xếp theo">
								<Select className="low-bradius-formpage-form__select">
									<Select.Option value="goodsPrice">Giá tăng dần</Select.Option>
									<Select.Option value="-goodsPrice">
										Giá giảm dần
									</Select.Option>
									<Select.Option value="-goodsUpdatedTime">
										Mới nhất
									</Select.Option>
									<Select.Option value="goodsUpdatedTime">
										Cũ nhất
									</Select.Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={{ xs: 0, md: 4, lg: 8 }}>
						<Col xs={24} md={12}>
							<Form.Item name="goodsUpdatedTime" label="Ngày cập nhật">
								<DatePicker.RangePicker
									className="low-bradius-formpage-form__input"
									format="DD-MM-YYYY"
								/>
							</Form.Item>
						</Col>

						<Col xs={24} md={6}>
							<Form.Item label="Giá từ" name="goodsPrice__gte">
								<InputNumber
									className="low-bradius-formpage-form__input"
									min={0}
									step={10000}
									formatter={value =>
										`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
									parser={value => value.replace(/[^\d]/g, '')}
								/>
							</Form.Item>
						</Col>

						<Col xs={24} md={6}>
							<Form.Item name="goodsPrice__lte" label="đến">
								<InputNumber
									className="low-bradius-formpage-form__input"
									min={0}
									step={10000}
									formatter={value =>
										`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
									}
									parser={value => value.replace(/[^\d]/g, '')}
								/>
							</Form.Item>
						</Col>
					</Row>

					<div className="low-bradius-formpage-form-submit">
						<button
							className="low-bradius-formpage-form-submit__btn low-bradius-formpage-form-submit__btn--submit"
							type="submit"
						>
							Tìm kiếm
						</button>
					</div>
				</Form>

				<div className="search-page-divider"></div>

				<div className="search-page-result-set">
					{!state.loading ? (
						state.goods.length === 0 ? (
							<div className="search-page-result-empty">
								Không tìm thấy kết quả nào
							</div>
						) : (
							state.goods.map(item => (
								<div
									className="search-page-result-card"
									key={`${item.goodsID}${item.goodsUpdatedTime}`}
								>
									<div className="search-page-result-card__img-wrapper">
										<img
											src={item.images.find(image => image.isMain).image}
											alt={item.goodsName}
										/>
									</div>

									<div className="search-page-result-card-content">
										<div className="search-page-result-card-content__title">
											{item.goodsName.length > 40
												? `${item.goodsName.substr(0, 40).trim()}...`
												: item.goodsName}
										</div>

										<div className="search-page-result-card-content__price">
											{item.goodsPrice.toLocaleString()}₫
										</div>

										<div className="search-page-result-card-content__ago">
											{timeAgo.format(
												Date.now() -
													(new Date() - new Date(item.goodsUpdatedTime))
											)}
										</div>

										<div className="search-page-result-card-content__location">
											{item.goodsLocation}
										</div>

										<div className="search-page-result-card-content__button-wrapper">
											<Link to={`/goods/${item.goodsID}`}>Chi tiết</Link>
										</div>
									</div>
								</div>
							))
						)
					) : (
						renderSkeleton()
					)}
				</div>
			</div>
		</SiteLayout>
	)
}

export default SearchPage
