import './styles.scss'
import { useState } from 'react';
import {Menu} from 'antd'
import BudgetContent from '../budget-content';
import UserAvatar from './user-info';


const tabPanesName = [
    {
        'title':'Quản lý dự án',
        'content':'content here'
    },
    {
        'title':'Cấu hình dự án',
        'content':'content here'
    },
    {
        'title':'Ngân sách dự án',
        'content':<BudgetContent/>
    },
    {
        'title':'Khai toán',
        'content':'content here'
    },
    {
        'title':'Tiến độ tổng thể',
        'content':'content here'
    },
    {
        'title':'Dự toán',
        'content':'content here'
    },
    {
        'title':'Quản lý hợp đồng',
        'content':'content here'
    },
    {
        'title':'Nghiệm thu',
        'content':'content here'
    },
    {
        'title':'Thanh quyết toán',
        'content':'content here'
    },
    {
        'title':'Bảo lãnh',
        'content':'content here'
    },
    {
        'title':'Hồ sơ tài liệu',
        'content':'content here'
    },
    {
        'title':'Báo cáo',
        'content':'content here'
    }
]

const BudgetSiderMenu = ({setContent}) => {

    const onSelectMenu = ({...params}) => {
        setContent(tabPanesName[params.key].content)
    }

    return (
        <div className='menu-board-root'>
            <Menu
                mode="inline"
                style={{
                width: 200
                }}
                onSelect={onSelectMenu}
                
            >
            <Menu.Item
                className='user-avatar_on-default'
                >
                <UserAvatar/>
            </Menu.Item>
            <Menu.Divider />
            {[
                ...Array.from(
                    {
                    length: tabPanesName.length,
                    },
                    (_, i) => i,
                ),
            ].map((i) => (
                <Menu.Item key={i} 
                    style={{
                        height:27
                    }}
                >
                    {tabPanesName[i].title}
                </Menu.Item>
            ))}
            </Menu>
        </div>
    )
}

export default BudgetSiderMenu