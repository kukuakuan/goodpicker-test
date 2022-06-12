import './style.scss'

import React from 'react'
import { Image } from 'antd'

const ImageShow = ({ images }) => {
	const [mainSrc, setMainSrc] = React.useState(
		() => images.find(image => image.isMain).image
	)

	const setMainImg = ({ target }) => {
		setMainSrc(target.hasChildNodes() ? target.firstChild.src : target.src)
	}

	return (
		<div className="image-show">
			<div className="image-show-main-wrapper">
				<Image src={mainSrc} />
			</div>
			<div className="image-show-sub-list">
				{images &&
					images.map(obj => (
						<div
							key={obj.image}
							className={`image-show-sub${
								mainSrc === obj.image ? ' image-show-sub--active' : ''
							}`}
							onClick={setMainImg}
						>
							<img src={obj.image} alt="anh mon do" />
						</div>
					))}
			</div>
		</div>
	)
}

export default ImageShow
