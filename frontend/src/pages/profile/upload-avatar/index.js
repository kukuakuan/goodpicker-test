import './style.scss'
import React, {useState} from "react";
import {FileImageOutlined, CloseCircleTwoTone } from '@ant-design/icons'
import { Image, Input} from 'antd';




const UploadAvatar = ({name,setFile}) => {

    const [image, setImage] = React.useState('')
    const [isUploaded, setIsUploaded] = useState(false)


    const  handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          let reader = new FileReader();

          setFile(e.target.files[0]);
          
          reader.onload = function (e) {
            setImage(e.target.result);
            setIsUploaded(true);
          };
          // const oriFile = e.target.file[0];
          // updateFileImg(oriFile)
          reader.readAsDataURL(e.target.files[0]);
        }
      }
    return (
        <div className="upload-avatar">
          <div className="upload-avatar-container">
            <div className="upload-avatar-container-box">
              <div className="upload-avatar-container-box-img">
                {!isUploaded ? (
                  <>
                    <label htmlFor="upload-input">
                        <FileImageOutlined style={{fontSize: 60, color: '#b5b5b5'}} />
                    </label>

                    <Input
                      // name = {name}
                      id="upload-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </>
                ) : (
                  <div className="image-preview">
                    <CloseCircleTwoTone
                        className = "close-icon" 
                        onClick={() => {
                        setIsUploaded(false);
                        setImage(null);
                      }}
                    />
                    
                      <Image
                        className="uploaded-image"
                        src={image}
                        draggable={false}
                        alt="uploaded-img"
                      />
                  </div>
                )}
              </div>
            
            </div>
          </div>
        </div>
    )

}

UploadAvatar.protoTypes = {
    // updateFileImg: PropTypes.func.isRequired
} 

export default UploadAvatar