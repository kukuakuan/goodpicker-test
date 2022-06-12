import { customAxios } from '../../utils/custom-axios';
import axios from 'axios';

const endpoint = process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

export default {

    fetch_all: (data) => 
        customAxios({
            method: 'get',
            url: `${endpoint}/api/v1/backup/${data.alias}/`,
            params: {
                page: data.page,
                pageSize: data.pageSize
            }
        })
        .then(res => { return res.data })
        .catch(error => console.log(error)),

    create: (data) =>
        customAxios({})
        .then(res => { return res.data })
        .catch(error => console.log(error)),

}