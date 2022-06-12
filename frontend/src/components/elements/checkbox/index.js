import './style.scss';

import { Checkbox } from 'antd';
import PropTypes from 'prop-types'; 

const CustomCheckbox = (props) => {

    const { 
        autoFocus,
        classNames,
        checked,
        defaultChecked,
        disabled,
        id,
        indeterminate,
        label,
        value,
        onChange,
        children,
    } = props;

    let overrideClassNames = ['atn-checkbox-custom', 'd-flex', 'align-items-center']

    const initArgs = () => {
        if (classNames.length > 0) {
            overrideClassNames = overrideClassNames.concat(classNames)
        } 
    }

    initArgs();

    return (
        <Checkbox 
            autoFocus={ autoFocus }
            className={ overrideClassNames.join(' ') }
            checked={ checked }
            defaultChecked={ defaultChecked }
            disabled={ disabled }
            indeterminate={ indeterminate }
            label={ label }
            id={ id }
            value={ value }
            onChange={ onChange }>
            
            <div className='font-size-16px'>
                { children }
            </div>
        </Checkbox>
    )
}

CustomCheckbox.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.any,
    autoFocus: PropTypes.bool,
    checked: PropTypes.bool,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    onChange: PropTypes.func,
    classNames: PropTypes.array,
}

CustomCheckbox.defaultProps = {
    classNames: []
}

export default CustomCheckbox;
