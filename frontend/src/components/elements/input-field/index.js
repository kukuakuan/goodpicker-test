import './style.scss';

import { Form, Input } from 'antd';
import PropTypes from 'prop-types';

const CustomInputField = (props) => {
    const { Item } = Form;
    const { name, placeholder, rules, label, type } = props;

    return (
        <Item className='field-wrapper' label={label} name={name} rules={rules}>
            <Input
                className='inputField'
                placeholder={placeholder}
                type={type}
            />
        </Item>
    );
};

CustomInputField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string,
    rules: PropTypes.array,
};

export default CustomInputField;
