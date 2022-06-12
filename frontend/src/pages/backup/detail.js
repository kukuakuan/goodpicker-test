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
import { 
    RightOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import BackupApi from '../../../api/backup'
import { useRouter } from 'next/router'
import { STATUS_CODE } from '../../../constants';
import AuthGuard from '../../../guards/auth'

const BackupDetailTemplate = (props) => {

    const { t } = props;

    const Route = useRouter();
    const { id, name, alias} = Route.query;

    let [ backupFiles, setBackupFiles ] = useState([]);
    let [ paginationArgs, setPaginationArgs ] = useState({
        page: 1,
        pageSize: 10,
        totalItems: 0
    });

    useEffect(async () => {
        await getBackupFiles(paginationArgs);
    }, [])

    useEffect(async () => {
        await getBackupFiles({
            ...paginationArgs,
            page: 1,
            pageSize: 10,
        });
    }, [])

    const getBackupFiles = async (data) => {

        let result = await BackupApi.fetch_all({
            page: data.page,
            pageSize: data.pageSize,
            alias: alias
        })

        if (result?.code == STATUS_CODE.success) {
            setPaginationArgs({
                totalItems: result.data.totalItems,
                page: result.data.page, 
                pageSize: result.data.pageSize 
            })

            setBackupFiles(result.data.listRecord);
        }
    }

    const columns = [
        {
            title: t('backupPage.fileName'),
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: t('backupPage.type'),
            dataIndex: 'type',
            key: 'type',
            render: record => record == 'auto' ? t('backupPage.auto') : t('backupPage.manual')
        },
        {
            title: t('backupPage.createdAt'),
            dataIndex: 'created_at',
            key: 'created_at',
            render:record => {
                const date= new Date(record*1000);
                return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
            }
        },
        {
            title: t('backupPage.creator'),
            dataIndex: 'creator',
            key: 'creator',
        },
        {
            title: t('backupPage.download'),
            dataIndex: 'url',
            key: 'download',
            render: record =>{
                return <a href={record}><DownloadOutlined /></a>
            }
        }
    ];

    const onShowSizeChange = (current, pageSize) =>  {
        
        getBackupFiles({
            ...paginationArgs,
            page: current,
            pageSize: pageSize
        })

        setPaginationArgs({
            ...paginationArgs,
            page: current,
            pageSize: pageSize
        })
    }

    const onPageChange = (page, pageSize) => {

        getBackupFiles({
            ...paginationArgs,
            page: page,
            pageSize: pageSize
        })

        setPaginationArgs({
            ...paginationArgs,
            page: page,
            pageSize: pageSize
        })
    }

    return (
        <React.Fragment>
            <AuthGuard>
                <Layout className="header-container">
                    <Header className='page-header'>
                        <h2 className='page-title'>{ `${t('backupPage.backup_list')} ${name.toLowerCase()}` }</h2>
                    </Header>
                </Layout>
                <Table
                    dataSource={ backupFiles }
                    columns={ columns }
                    pagination={{
                        defaultCurrent: 1,
                        showSizeChanger: true,
                        defaultPageSize: paginationArgs.pageSize,
                        total: paginationArgs.totalItems,
                        current: paginationArgs.page,
                        showTotal: total => `${t('total')} ${total} ${t('backupPage.file').toLowerCase()}`,
                        onShowSizeChange: onShowSizeChange,
                        onChange: onPageChange
                    }}
                />
            </AuthGuard>
        </React.Fragment>
    );
};

BackupDetailTemplate.propTypes = {
    t: PropTypes.func.isRequired,
}

export default withTranslation('common')(BackupDetailTemplate);
