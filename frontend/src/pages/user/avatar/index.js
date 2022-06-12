import './style.scss'
import { Row, Col, Image, Button } from "antd"
import axios from "axios"
import React, {useState, useEffect} from "react"
import { useAuthState } from "../../../hooks/useAuth"
import { Link } from "react-router-dom"

const AvatarSide = ({userEmail, userImage}) => {

    const { user, cookies } = useAuthState()

    const [userImageAvata,setUserImageAvatar] = useState(null);

    useEffect(()=> {
        const getUsers = async () => {
            const res = await axios.get(
                `/api/users?email=${userEmail}`
            )
            setUserImageAvatar(res?.data[user.id-1]?.userImage);
        }

        getUsers()
    },[userEmail])

    return (
        <React.Fragment>
            <Col className="user-avatar">
                <Row className="user-avatar-title">
                    <h2><b>Trang cá nhân</b></h2>
                </Row>
                <br/>
                <Row className="user-avatar-content" 
                    gutter={{ xs: 10, sm: 32, md: 120}}
                    >
                    <Col className="user-avatar-content-img" >
                        <Row>
                            <Image id = "avatar" 
                                className="img-fluid" 
                                src = {userImageAvata}
                            />  
                        </Row>
                        <Row>
                        {cookies['gp_token']? (
                            <Link to="/profile">
                                <Button className="user-avatar-button">
                                    Chỉnh sửa trang cá nhân
                                </Button>
                            </Link>
                        ):(
                            <Link>
                                <Button className="user-avatar-button">
                                    Liên hệ
                                </Button>
                            </Link>
                        )
                        }
                        </Row>
                    </Col>
                    
                    <Col className="user-avatar-content-info">
                        <h3><b>{user.username}</b></h3>
                        <h6><i>{user.name}</i></h6>
                        <Row>
                            <h5><b>Thông tin liên hệ: </b>{user.userPhoneNumber}</h5>
                        </Row>
                        <br/>
                        <Row >
                            <h5><b>Email: </b>{user.email}</h5>
                        </Row>
                        <br/>
                        <Row >
                            <h5><b>Địa chỉ: </b>{user.userProvinceID.userProvinceName}</h5>
                        </Row>
                        <br/>
                        <Row>
                            <h5><b>Xếp hạng: </b>5/5</h5>
                        </Row>
                    </Col>
                </Row>
                
                
            </Col>
        </React.Fragment>
    )
}

export default AvatarSide