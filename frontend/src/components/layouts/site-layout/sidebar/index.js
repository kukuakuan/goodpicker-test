import './style.scss';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import {
    Layout,
    Menu,
    Row,
    Col,
    Dropdown
} from 'antd';
import {
    DatabaseOutlined,
    FormOutlined,
    GlobalOutlined,
    UserOutlined,
    LogoutOutlined,
    ProfileOutlined,
} from '@ant-design/icons';
import { withTranslation } from '../../../../translate/init';
import PropTypes from 'prop-types';
import { changeLanguage } from '../../../../translate/index';
import { getUserProfile } from '../../../../utils/auth';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../../../store/user/action';
import UserManagementApi from '../../../../api/user-management'
import { getUrlFromBase64 } from '../../../../utils/common';

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

const ghostCmsHost = process.env.NEXT_PUBLIC_GHOST_CMS_HOST;

const AppSidebar = ({ t }) => {
    const dispatch = useDispatch();

    let [ currentUser, setCurrentUser ] = useState({})

    const Route = useRouter();

    useEffect( async () => {
        const uid = getUserProfile()?.uid

        await getCurrentUser(uid)
    }, [])

    const handleClick = e => {
        switch (e.key) {

            case 'vietnamese':
                changeLanguage('vi')
                break;

            case 'english':
                changeLanguage('en')
                break;

            default:
                Route.push(`/${e.key}`)
                break;
        }
    };

    const getCurrentUser = async (uid) => {
        let result = await UserManagementApi.fetchAll({
            query: [['user_id', '=', uid]],
            pageSize: 10,
            pageIndex: 1,
            model: 'hr.employee',
            fields: ['name', 'work_email', "image_128"],
        })

        if (result.result) {
            setCurrentUser(result.result.records[0])
        }
    }

    const userOption = () => (
        <Menu>
            <Menu.Item
                key='1'
                icon={ <ProfileOutlined /> }
                onClick={() => Route.push(`/user/profile?id=${currentUser.id}`)}>
                { t('sidebar.profile') }
            </Menu.Item>

            <Menu.Divider />
            
            <Menu.Item
                key='2'
                icon={ <LogoutOutlined /> }
                onClick={
                    () => {
                        dispatch(userLogout(), (res, err) => {
                            console.log(res, err);
                        });

                        Route.push(`/login`);
                    }
                }>
                { t('signOut') }
            </Menu.Item>
        </Menu>
    );

    return (
        <Sider
            width='12.5rem'
            breakpoint='lg'
            theme='light'
            className='sidebar-container'>
            <Header className='header'>
                <div className='title'>
                    <img
                        className='logo'
                        src='/images/geophysics.jpg'
                    />
                    <span className='text-title'>
                        Geophysics
                    </span>
                </div>
            </Header>

            <Menu
                onClick={ handleClick }
                className='menu'
                theme='light'
                defaultSelectedKeys={['user']}
                mode='vertical'>
                <Menu.ItemGroup title={ t('sidebar.manage') }>
                    <Menu.Item 
                        key='employees' 
                        icon={ <UserOutlined /> }>
                        { t('sidebar.user') }
                    </Menu.Item>
                </Menu.ItemGroup>

                <Menu.ItemGroup title={ t('sidebar.setting') }>
                    <SubMenu
                        key='language'
                        icon={ <GlobalOutlined /> }
                        title={ t('sidebar.language') }>
                        <Menu.Item key='vietnamese'>
                            { t('sidebar.vietnamese') }
                        </Menu.Item>

                        <Menu.Item key='english'>
                            { t('sidebar.english') }
                        </Menu.Item>
                    </SubMenu>
                </Menu.ItemGroup>
            </Menu>

            <div className='footer'>
                <div style={{ padding: '15px' }}>
                    <Dropdown
                        overlay={ userOption }
                        placement='topRight'
                        arrow>
                        <Row gutter={{ xs: 16, sm: 16, md: 12, lg: 12 }}>
                            <Col span={ 6 }>
                                <img
                                    className='user-avatar relative'
                                    src={ currentUser.image_128 ? getUrlFromBase64(currentUser.image_128) : '/images/default-user-avatar.png' }
                                />
                            </Col>

                            <Col span={ 18 }>
                                <Row>
                                    <span className='user-name'>
                                        { `${currentUser?.name}` }
                                    </span>
                                </Row>

                                <Row>
                                    <span className='user-email'>
                                        { currentUser?.work_email }
                                    </span>
                                </Row>
                            </Col>
                        </Row>
                    </Dropdown>
                </div>
            </div>
        </Sider>
    );
};

AppSidebar.propTypes = {
    t: PropTypes.func.isRequired,
};

export default withTranslation('common')(AppSidebar);
