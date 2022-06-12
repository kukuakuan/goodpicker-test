import './style.scss'

import React, { Suspense } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Skeleton, Input } from 'antd'
import CustomCarousel from './carousel'
import SiteLayout from '../../components/layouts/site-layout'
const Category = React.lazy(() => import('./category'))

const HomePage = () => {
	const [categories, setCategories] = React.useState(null)
	const unmountedRef = React.useRef(false)

	React.useLayoutEffect(() => {
		const getCategories = async () => {
			const res = await axios.get('/api/categories')

			if (!unmountedRef.current) {
				setCategories(res.data)
			}
		}

		getCategories()
	}, [])

	React.useEffect(() => {
		return () => {
			unmountedRef.current = true
		}
	}, [])

	const renderSkeleton = () => {
		return (
			<div className="homepage-newest-category-skeleton">
				<Skeleton.Input
					active
					className="homepage-newest-category-skeleton__title"
				/>
				<Skeleton.Input
					active
					className="homepage-newest-category-skeleton__divider"
				/>
				<Skeleton.Input
					active
					className="homepage-newest-category-skeleton__content"
				/>
			</div>
		)
	}

	const navigate = useNavigate();

	const onSearchSubmit = name => {
		navigate(`/search${name ? `?search=${name}&` : '?'}goodsStatus=false`)
	}

	return (
		<SiteLayout>
			<div className="homepage">
				<CustomCarousel />

				<div className="homepage__title">Tìm món đồ phù hợp</div>

				<div className="homepage-search">
					<Input.Search onSearch={onSearchSubmit} placeholder="Tìm kiếm" />
				</div>

				<div className="homepage__title homepage__title--left">
					Các bài đăng mới nhất
				</div>

				<div className="homepage-newest">
					{categories
						? categories.map(category => (
								<Suspense
									key={category.goodsCategoryName}
									fallback={renderSkeleton()}
								>
									<Category
										categoryId={category.goodsCategoryID}
										categoryName={category.goodsCategoryName}
									/>

								</Suspense>
						  ))
						: renderSkeleton()}
				</div>
			</div>
		</SiteLayout>
	)
}

export default HomePage