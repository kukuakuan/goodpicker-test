import './style.scss';

import { Input } from 'antd';
import PropTypes from 'prop-types'; 

import Password from 'antd/lib/input/Password';

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
        customStyle
    } = props;

    let overrideClassNames = []

    const initArgs = () => {

        if (customStyle === 'style#1') {
            overrideClassNames.push('ant-input-custom-style-1')
        }

        if (customStyle === 'style#2') {
            overrideClassNames.push('ant-input-custom-style-2')
        }

        if (classNames.length > 0) {
            overrideClassNames = overrideClassNames.concat(classNames)
        } 
    }

    initArgs();

    const renderComp = () => {
        if (type === 'password') {
            return (
                <Password 
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
                    parser={ parser }>
                    { children }
                </Password>
            )
        } else {
            return (
                <Input 
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
                    parser={ parser }>
                    { children }
                </Input>
            )
        }
    }

    return renderComp();
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
    parser: PropTypes.func,
    customStyle: PropTypes.any 
}

CustomInput.defaultProps = {
    classNames: [],

    customStyle: 'style#1'
}

export default CustomInput;
