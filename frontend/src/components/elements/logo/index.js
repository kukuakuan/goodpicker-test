import './style.scss'

import logo from '../../../img/logo_full.png'
import miniLogo from '../../../img/logo_mini.png'
import PropTypes from 'prop-types'

const Logo = ({ className = '', alt = 'logo', type = 'full' }) => {
	return type === 'full' ? (
		<img className={className} src={logo} alt={alt} />
	) : type === 'mini' ? (
		<img className={className} src={miniLogo} alt={alt} />
	) : null
}

Logo.propTypes = {
	className: PropTypes.string,
	alt: PropTypes.string,
	type: PropTypes.oneOf(['full', 'mini']),
	width: PropTypes.number
}

export default Logo
