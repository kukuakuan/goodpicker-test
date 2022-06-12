import './style.scss'

import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { withTranslation } from '../../../translate/init';
import {
    Table, 
    Tag, 
    Layout,
} from 'antd'
import { Header } from 'antd/lib/layout/layout'
import { useRouter } from 'next/router'
import AuthGuard from '../../../guards/auth'

const BackupTemplate = (props) => {

    const { t } = props;

    const Route = useRouter();

    let [ servers, setServers ] = useState([]);

    useEffect(() => {
        bindListServer();
    }, [])

    const bindListServer = () => {

        let data = JSON.parse(t('backupPage.list_server'))

        setServers(data);
    }

    const columns = [
        {
            title: t('backupPage.name'),
            dataIndex: 'serverName',
            key: 'serverName',
        },
        {
            title: t('backupPage.status'),
            dataIndex: 'status',
            key: 'status',
            render: status => {

                if (status == 'active') {
                    return (
                        <Tag color='green'>{ t('backupPage.active') }</Tag>
                    );
                } else if (status == 'inactive') {
                    return (
                        <Tag color='red'>{ t('backupPage.inactive') }</Tag>
                    );
                }
            }
        }
    ];

    return (
        <React.Fragment>
            <Layout className="header-container">
                <Header className='page-header'>
                    <h2 className='page-title'>{ t('backupPage.title') }</h2>
                </Header>
            </Layout>
            <Table
                dataSource={ servers }
                columns={ columns }
                onRow={(record, rowIndex) => ({
                    onClick: () => {
                        Route.push(`/backup/detail?id=${record.id}&name=${record.serverName}&alias=${record.alias}`) 
                    },
                })}
            />
        </React.Fragment>
    );
};

BackupTemplate.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BackupTemplate);
