import './style.scss';

import { Typography } from 'antd';
import PropTypes from 'prop-types'; 

const CustomTypographyParagraph = (props) => {

    const { 
        code,
        classNames, 
        copyable, 
        disabled, 
        editable, 
        ellipsis, 
        mark, 
        strong, 
        type,
        underline, 
        onChange,
        children
    } = props;

    let overrideClassNames = ['ant-typography-custom'];

    const initArgs = () => {

        if (copyable?.style == 'style#1') {
            overrideClassNames.push('ant-typography-copy-custom-style-1')
        }

        if (classNames.length > 0) {
            overrideClassNames = overrideClassNames.concat(classNames)
        } 
    }

    initArgs();

    return (
        <Typography.Paragraph
            className={ overrideClassNames.join(' ') }
            code={ code }
            copyable={ copyable }
            disabled={ disabled } 
            editable={ editable } 
            ellipsis={ ellipsis } 
            mark={ mark } 
            strong={ strong } 
            type={ type }
            underline={ underline } 
            onChange={ onChange }>
            { children }
        </Typography.Paragraph>
    )
}

CustomTypographyParagraph.propTypes = {
    code: PropTypes.any,
    classNames: PropTypes.any, 
    copyable: PropTypes.any, 
    delete: PropTypes.any, 
    disabled: PropTypes.any, 
    editable: PropTypes.any, 
    ellipsis: PropTypes.any, 
    mark: PropTypes.any, 
    strong: PropTypes.any, 
    type: PropTypes.any,
    underline: PropTypes.any, 
    onChange: PropTypes.any,
    children: PropTypes.any
}

CustomTypographyParagraph.defaultProps = {
    color: 'pink',
    classNames: []
}

export default CustomTypographyParagraph;
