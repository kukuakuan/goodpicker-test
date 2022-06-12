import './styles.scss'
import {Row, Col, Dropdown,
        Layout, Avatar, Space} from 'antd'
import { useState } from 'react'
import {React} from 'react'
import { UserOutlined} from '@ant-design/icons';
import { DownOutlined, SearchOutlined, BellOutlined,
        UnorderedListOutlined, SettingOutlined } from '@ant-design/icons';

import BudgetContentMenu from './budget-content-menu';
import BudgetSiderMenu from './budget-sider-menu';

const { Header, Content, Footer, Sider } = Layout;


const ProjectBudget = () => {
    const [content, setContent] = useState();
    return (
        <div className='budget-content'>
            <div className='budget-header'>
                <Row gutter={[32,16]}>
                    {/* <Col className='budget-logo'>
                        <img
                            src="../../img/logo_datxanh1.png"
                            // shape="square"
                            // src = './logo_datxanh1.png'
                        />
                    </Col> */}
                    <Col className='content-budget-page' span={12}>
                        <Row gutter={[24,0]}>
                            <Col className='budget-project-list ctn-bgp'>
                                <Space align='center'>
                                    <span  className='title-header'>Dự án xây dựng</span>
                                    <DownOutlined className='title-dropdown'/>
                                </Space>
                            </Col>
                            <Col className='budget-report ctn-bgp'>
                                <Space align='center'>
                                    <span className='title-header'>Báo cáo</span>
                                    <DownOutlined className='title-dropdown'/>
                                </Space>
                            </Col>
                            <Col className='budget-category ctn-bgp'>
                                <Space align='center'>
                                    <span className='title-header'>Danh mục</span>
                                    <DownOutlined className='title-dropdown'/>
                                </Space>
                            </Col>
                        </Row>
                    </Col>
                    <Col className='budget-menu-item' 
                        span={12}
                        style={{
                            position: 'absolute',
                            right: '1rem'
                        }}
                        >
                        <Row gutter={[24,0]}>
                            <Col><SearchOutlined /></Col>
                            <Col><UnorderedListOutlined /></Col>
                            <Col><BellOutlined /></Col>
                            <Col><SettingOutlined /></Col>
                            <Col><UserOutlined /></Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className='budget-body'>
                <Layout>
                    <Content>
                        <Layout className="budget-site-layout-background">
                            <Sider className="budget-site-layout-background" width={200}>
                                <BudgetSiderMenu setContent = {setContent}/>
                            </Sider>
                            <Content 
                                style={{
                                    padding: '0 24px 24px 24px',
                                    }}
                                    >
                                <BudgetContentMenu content = {content}/>
                            </Content>
                        </Layout>
                    </Content>
                </Layout>
            </div>
        </div>
    )
}
export default ProjectBudget