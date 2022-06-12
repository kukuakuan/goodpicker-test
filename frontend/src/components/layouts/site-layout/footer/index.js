import './style.scss'

import React from 'react'
import { Footer } from 'antd/lib/layout/layout'

const AppFooter = () => {
	return (
		<React.Fragment>
			<Footer className="footer">
				<div className="footer-content">© 2022 Copyright: GoodsPicker</div>
			</Footer>
		</React.Fragment>
	)
}

export default AppFooter
