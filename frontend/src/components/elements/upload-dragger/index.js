import './style.scss';

import { Upload } from 'antd';
import PropTypes from 'prop-types'; 

const CustomUploadDragger = (props) => {
    
    const { 
        accept,
        classNames,
        action,
        beforeUpload,
        customRequest,
        data,
        defaultFileList,
        directory,
        disabled,
        fileList,
        headers,
        iconRender,
        isImageUrl,
        itemRender,
        listType,
        method,
        multiple,
        name,
        openFileDialogOnClick,
        previewFile,
        progress,
        showUploadList,
        transformFile,
        withCredentials,
        onChange,
        onDownload,
        onPreview,
        onRemove,
        children,
    } = props;

    let overrideClassNames = ['atn-upload-dragger-custom']

    const initArgs = () => {
        if (classNames.length > 0) {
            overrideClassNames = overrideClassNames.concat(classNames)
        } 
    }

    initArgs();

    return (
        <Upload.Dragger
            accept={ accept }
            className={ overrideClassNames.join(' ') }
            action={ action }
            beforeUpload={ beforeUpload }
            customRequest={ customRequest }
            data={ data }
            defaultFileList={ defaultFileList }
            directory={ directory }
            disabled={ disabled }
            fileList={ fileList }
            headers={ headers }
            iconRender={ iconRender }
            isImageUrl={ isImageUrl }
            itemRender={ itemRender }
            listType={ listType }
            method={ method }
            multiple={ multiple }
            name={ name }
            openFileDialogOnClick={ openFileDialogOnClick }
            previewFile={ previewFile }
            progress={ progress }
            showUploadList={ showUploadList }
            transformFile={ transformFile }
            withCredentials={ withCredentials }
            onChange={ onChange }
            onDownload={ onDownload }
            onPreview={ onPreview }
            onRemove={ onRemove }>
            { children }
        </Upload.Dragger>
    )
}

CustomUploadDragger.propTypes = {
    accept: PropTypes.string,
    classNames: PropTypes.array,
    action: PropTypes.any,
    children: PropTypes.any,
    beforeUpload: PropTypes.any,
    customRequest: PropTypes.func,
    data: PropTypes.any,
    defaultFileList: PropTypes.any,
    directory: PropTypes.bool,
    disabled: PropTypes.bool,
    fileList: PropTypes.any,
    headers: PropTypes.any,
    iconRender: PropTypes.any,
    isImageUrl: PropTypes.any,
    itemRender: PropTypes.any,
    listType: PropTypes.string,
    method: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    openFileDialogOnClick: PropTypes.bool,
    previewFile: PropTypes.any,
    progress: PropTypes.any,
    showUploadList: PropTypes.any,
    transformFile: PropTypes.any,
    withCredentials: PropTypes.bool,
    onChange: PropTypes.func,
    onDownload: PropTypes.func,
    onPreview: PropTypes.func,
    onRemove: PropTypes.func
}

CustomUploadDragger.defaultProps = {
    classNames: []
}

export default CustomUploadDragger;
