import './style.scss';

import { InputNumber } from 'antd';
import PropTypes from 'prop-types'; 

const CustomInput = (props) => {

    const { 
        name,
        classNames,
        style,
        formatter,
        type,
        placeholder,
        rules,
        addonAfter,
        addonBefore,
        allowClear,
        bordered,
        defaultValue,
        disabled,
        id,
        maxLength,
        prefix,
        size,
        suffix,
        value,
        onChange,
        onPressEnter,
        children,
        parser,
        readOnly
    } = props;

    let overrideClassNames = ['atn-input-number-custom']

    const initArgs = () => {
        if (classNames.length > 0) {
            overrideClassNames = overrideClassNames.concat(classNames)
        } 
    }

    initArgs();

    return (
        <InputNumber
            name={ name }
            className={ overrideClassNames.join(' ') }
            style={ style }
            formatter={ formatter }
            type={ type }
            placeholder={ placeholder }
            rules={ rules }
            addonAfter={ addonAfter }
            addonBefore={ addonBefore }
            allowClear={ allowClear }
            bordered={ bordered }
            defaultValue={ defaultValue }
            disabled={ disabled }
            id={ id }
            maxLength={ maxLength }
            prefix={ prefix }
            size={ size }
            suffix={ suffix }
            value={ value }
            onChange={ onChange }
            onPressEnter={ onPressEnter }
            parser={ parser }
            readOnly={ readOnly }>
            { suffix }
        </InputNumber>
    )
}

CustomInput.propTypes = {
    name: PropTypes.string,
    children: PropTypes.any,
    formatter: PropTypes.any,
    classNames: PropTypes.array,
    style: PropTypes.any,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    rules: PropTypes.array,
    addonAfter: PropTypes.node,
    addonBefore: PropTypes.node,
    allowClear: PropTypes.bool,
    bordered: PropTypes.bool,
    defaultValue: PropTypes.any,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    maxLength: PropTypes.number,
    prefix: PropTypes.node,
    size: PropTypes.string,
    suffix: PropTypes.node,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onPressEnter: PropTypes.func,
    parser: PropTypes.func
}

CustomInput.defaultProps = {
    classNames: []
}

export default CustomInput;
