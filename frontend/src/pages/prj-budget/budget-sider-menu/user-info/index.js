import './styles.scss'
import {Avatar, Menu, Col, Space} from 'antd'
import { useState } from 'react';
const UserAvatar = () => {
    const [user,setUser] = useState('Opal Skyview');
    console.log(user[0].toUpperCase)
    return (
        <div>
            <Space>
                <Avatar 
                    shape='square'
                    size='default'
                    className='user-avatar__prjbudget user-avatart__prjbudget--defautl'
                >
                    {user[0].toUpperCase()}
                </Avatar>
                <span>{user}</span>
            </Space>
        </div>
    )
}

export default UserAvatar