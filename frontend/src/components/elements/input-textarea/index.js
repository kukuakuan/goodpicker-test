import './style.scss';

import { Input } from 'antd';
import PropTypes from 'prop-types'; 

const CustomInput = (props) => {

    const { 
        name,
        autoSize,
        classNames,
        style,
        formatter,
        type,
        placeholder,
        rules,
        addonafter,
        addonbefore,
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
        parser
    } = props;

    let overrideClassNames = ['atn-input-textarea-custom']

    const initArgs = () => {
        if (classNames.length > 0) {
            overrideClassNames = overrideClassNames.concat(classNames)
        } 
    }

    initArgs();

    return (
        <Input.TextArea 
            name={ name }
            autoSize={ autoSize }
            className={ overrideClassNames.join(' ') }
            style={ style }
            formatter={ formatter }
            type={ type }
            placeholder={ placeholder }
            rules={ rules }
            addonafter={ addonafter }
            addonbefore={ addonbefore }
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
        </Input.TextArea>
    )
}

CustomInput.propTypes = {
    name: PropTypes.string,
    autoSize: PropTypes.bool,
    children: PropTypes.any,
    formatter: PropTypes.any,
    classNames: PropTypes.array,
    style: PropTypes.any,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    rules: PropTypes.array,
    addonafter: PropTypes.node,
    addonbefore: PropTypes.node,
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
