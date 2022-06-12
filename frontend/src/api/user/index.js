import { customAxios } from '../../utils/custom-axios';
import axios from 'axios';
import { APP_NAME } from '../../constants'
import Odoo from 'odoo-xmlrpc'

const endpoint = process.env.NEXT_PUBLIC_ODOO_SERVER_ENDPOINT;
const db_name = process.env.NEXT_PUBLIC_DB_NAME;
const server_port = process.env.NEXT_PUBLIC_ODOO_SERVER_PORT;
const client_endpoint = process.env.NEXT_PUBLIC_CLIENT_ENDPOINT;

export default {

    login: credentials => axios({
        method: 'post',
        url: `${endpoint}:3003/api/auth`,
        data: {
            login: credentials.username,
            password: credentials.password,
        },
        // withCredentials: true
    })
    .then(res => { 
        return res
    }),

    logout: () => customAxios({
        method: 'post',
        url: `${endpoint}/web/session/destroy`,
        data: {
            jsonrpc: "2.0",
            params: {},
        }
    }),

    register: async credentials => {

        let _new_user_data = {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
            first_name: credentials.firstName,
            last_name: credentials.lastName,
        }

        const response = await customAxios({
            method: 'post',
            url: `${endpoint}/api/v1/user/register`,
            data: _new_user_data
        })

        return response
    },

    facebookLogin: async code => {

        const response = await axios({
            method: 'get',
            url: `${endpoint}/api/v1/auth/facebook-callback?code=${encodeURIComponent(code)}`,
        })

        return response.data
    },

    resetPassword: (data) => customAxios({
        method: 'post',
        url: `${endpoint}/api/v1/user/reset_password`,
        data: data
    })
    .then(res => { return res.data }),

    getUserProfile: (id=null) => customAxios({
        method: 'post',
        url: `${endpoint}/web/dataset/search_read`,
        data: {
            jsonrpc: "2.0",
            method: "call",
            id: 1,
            params: {
                model: "hr.employee",
                domain: [
                    ["id", "=", id]
                ],
                fields: [

                ],
                limit: 1,
                offset: 0,
                sort: "",
                context: {}
            }
        }
    })
    .then(res => { return res.data })
    .catch(error => { console.log(error); }),

    ////xml-rpc
    // getUserProfile: (id=null) => {
    //     const data = {
    //         query: [['user_id', '=', id]],
    //         pageSize: 10,
    //         pageIndex: 1,
    //         model: 'hr.employee',
    //         fields: ['name', 'work_email'],
    //     }

    //     const odoo = new Odoo({
    //         url: endpoint,
    //         port: server_port,
    //         db: db_name,
    //         username: 'admin',
    //         password: 'admin'
    //     })

    //     odoo.connect(function (err) {
    //         if (err) { return console.log(err); }
    //         console.log('Connected to Odoo server.');
    //         var inParams = []; 
    //         inParams.push(data.query); //key search, vd: ['id', '=', '2']
    //         inParams.push((data.pageIndex - 1) * data.pageSize);  //offset
    //         inParams.push(data.pageIndex * data.pageSize);  //Limit
    //         var params = [];
    //         params.push(inParams);
    //         return odoo.execute_kw(data.model, 'search', params, function (err, value) {
    //             if (err) { return console.log(err); }
    //             var inParams = [];
    //             inParams.push(value); //ids
    //             inParams.push(data.fields); //fields
    //             var params = [];
    //             params.push(inParams);
    //             odoo.execute_kw(data.model, 'read', params, function (err2, value2) {
    //                 if (err2) { return console.log(err2); }
    //                 console.log('Result: ', value2);
    //                 return value2
    //             });
    //         });
    //     });

    // },

    putUserProfile: async (data) => {
        const response = await customAxios({
            method: 'put',
            url: `${endpoint}/api/v1/users`,
            data: data
        })

        return response.data
    },

    requestResetPassword: async (email) => {

        const response = await customAxios({
            method: 'post',
            url: `${endpoint}/api/v1/user/forgot_password`,
            data: {
                ...email,
                app_name: APP_NAME.web_app
            }
        })
        return response
    },

    changePassword: async (data) => {
        
        const response = await customAxios({
            method: 'post',
            url: `${endpoint}/api/v1/users/change-password`,
            data: data
        })

        return response
    },

    verifyUser: async (data) => {
        
        const response = await customAxios({
            method: 'get',
            url: `${endpoint}/api/v1/auth/verify?user_id=${data.user_id}&activate_code=${data.activate_code}`,
        })

        return response.data
    },
}
