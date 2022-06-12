import './style.scss';

import { Select } from 'antd';
import PropTypes from 'prop-types'; 

const CustomSelect = (props) => {

    const { 
        name,
        allowClear,
        autoClearSearchValue,
        autoFocus,
        bordered,
        clearIcon,
        defaultActiveFirstOption,
        defaultOpen,
        defaultValue,
        dropdownClassName,
        dropdownMatchSelectWidth,
        dropdownRender,
        dropdownStyle,
        filterOption,
        getPopupContainer,
        labelInValue,
        listHeight,
        loading,
        maxTagCount,
        maxTagPlaceholder,
        maxTagTextLength,
        menuItemSelectedIcon,
        mode,
        notFoundContent,
        open,
        optionFilterProp,
        optionLabelProp,
        options,
        placeholder,
        removeIcon,
        searchValue,
        showArrow,
        showSearch,
        size,
        suffixIcon,
        tagRender,
        tokenSeparators,
        value,
        virtual,
        onBlur,
        onChange,
        onClear,
        onDeselect,
        onDropdownVisibleChange,
        onFocus,
        onInputKeyDown,
        onMouseEnter,
        onMouseLeave,
        onPopupScroll,
        onSearch,
        onSelect,
        className,
        disabled,
        title,
        key,
        label,

        classNames,
        children,
        styleName
    } = props;

    let overrideClassNames = []
    let overrideDropdownClassNames = []

    if (styleName === 'style#1') {
        overrideClassNames = ['atn-select-custom']
        overrideDropdownClassNames = ['custom-dropdown']
    }

    const initArgs = () => {
        if (classNames.length > 0) {
            overrideClassNames = overrideClassNames.concat(classNames)
        } 

        if (dropdownClassName) {
            overrideDropdownClassNames.push(dropdownClassName)
        } 
    }

    initArgs();

    return (
        <Select 
            name={ name }
            allowClear={ allowClear }
            autoClearSearchValue={ autoClearSearchValue }
            autoFocus={ autoFocus }
            bordered={ bordered }
            clearIcon={ clearIcon }
            defaultActiveFirstOption={ defaultActiveFirstOption }
            defaultOpen={ defaultOpen }
            defaultValue={ defaultValue }
            disabled={ disabled }
            dropdownClassName={ overrideDropdownClassNames.join(' ') }
            dropdownMatchSelectWidth={ dropdownMatchSelectWidth }
            dropdownRender={ dropdownRender }
            dropdownStyle={ dropdownStyle }
            filterOption={ filterOption }
            getPopupContainer={ getPopupContainer }
            labelInValue={ labelInValue }
            listHeight={ listHeight }
            loading={ loading }
            maxTagCount={ maxTagCount }
            maxTagPlaceholder={ maxTagPlaceholder }
            maxTagTextLength={ maxTagTextLength }
            menuItemSelectedIcon={ menuItemSelectedIcon }
            mode={ mode }
            notFoundContent={ notFoundContent }
            open={ open }
            optionFilterProp={ optionFilterProp }
            optionLabelProp={ optionLabelProp }
            options={ options }
            placeholder={ placeholder }
            removeIcon={ removeIcon }
            searchValue={ searchValue }
            showArrow={ showArrow }
            showSearch={ showSearch }
            size={ size }
            suffixIcon={ suffixIcon }
            tagRender={ tagRender }
            tokenSeparators={ tokenSeparators }
            value={ value }
            virtual={ virtual }
            onBlur={ onBlur }
            onChange={ onChange }
            onClear={ onClear }
            onDeselect={ onDeselect }
            onDropdownVisibleChange={ onDropdownVisibleChange }
            onFocus={ onFocus }
            onInputKeyDown={ onInputKeyDown }
            onMouseEnter={ onMouseEnter }
            onMouseLeave={ onMouseLeave }
            onPopupScroll={ onPopupScroll }
            onSearch={ onSearch }
            onSelect={ onSelect }
            title={ title }
            key={ key }
            label={ label }
            
            className={ overrideClassNames.join(' ') + ` ${className}` }>
            { children }
        </Select>
    )
}

CustomSelect.propTypes = {
    name: PropTypes.any,
    allowClear: PropTypes.any,
    autoClearSearchValue: PropTypes.any,
    autoFocus: PropTypes.any,
    bordered: PropTypes.any,
    clearIcon: PropTypes.any,
    defaultActiveFirstOption: PropTypes.any,
    defaultOpen: PropTypes.any,
    defaultValue: PropTypes.any,
    disabled: PropTypes.any,
    dropdownClassName: PropTypes.any,
    dropdownMatchSelectWidth: PropTypes.any,
    dropdownRender: PropTypes.any,
    dropdownStyle: PropTypes.any,
    filterOption: PropTypes.any,
    getPopupContainer: PropTypes.any,
    labelInValue: PropTypes.any,
    listHeight: PropTypes.any,
    loading: PropTypes.any,
    maxTagCount: PropTypes.any,
    maxTagPlaceholder: PropTypes.any,
    maxTagTextLength: PropTypes.any,
    menuItemSelectedIcon: PropTypes.any,
    mode: PropTypes.any,
    notFoundContent: PropTypes.any,
    open: PropTypes.any,
    optionFilterProp: PropTypes.any,
    optionLabelProp: PropTypes.any,
    options: PropTypes.any,
    placeholder: PropTypes.any,
    removeIcon: PropTypes.any,
    searchValue: PropTypes.any,
    showArrow: PropTypes.any,
    showSearch: PropTypes.any,
    size: PropTypes.any,
    suffixIcon: PropTypes.any,
    tagRender: PropTypes.any,
    tokenSeparators: PropTypes.any,
    value: PropTypes.any,
    virtual: PropTypes.any,
    onBlur: PropTypes.any,
    onChange: PropTypes.any,
    onClear: PropTypes.any,
    onDeselect: PropTypes.any,
    onDropdownVisibleChange: PropTypes.any,
    onFocus: PropTypes.any,
    onInputKeyDown: PropTypes.any,
    onMouseEnter: PropTypes.any,
    onMouseLeave: PropTypes.any,
    onPopupScroll: PropTypes.any,
    onSearch: PropTypes.any,
    onSelect: PropTypes.any,
    className: PropTypes.any,
    title: PropTypes.any,
    key: PropTypes.any,
    label: PropTypes.any,

    classNames: PropTypes.any,
    children: PropTypes.any,
}

CustomSelect.defaultProps = {
    classNames: [],
    styleName: 'style#1'
}

export default CustomSelect;
