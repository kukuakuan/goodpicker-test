import { customAxios } from '../../utils/custom-axios';
import axios from 'axios';
import Odoo from 'odoo-xmlrpc';

const endpoint = process.env.NEXT_PUBLIC_ODOO_SERVER_ENDPOINT;
const db_name = process.env.NEXT_PUBLIC_DB_NAME;
const server_port = process.env.NEXT_PUBLIC_ODOO_SERVER_PORT;

export default {
    // const data = {
    //     query: [['id', '=', '2'], []],
    //     pageSize: 10,
    //     pageIndex: 1,
    //     model: 'hr.employee',
    //     fields: ['name'],
    // }

    fetchAll: (data) => customAxios({
        method: 'post',
        url: `${endpoint}/web/dataset/search_read`,
        data: {
            jsonrpc: "2.0",
            method: "call",
            id: 1,
            params: {
                model: data.model,
                domain: data.query,
                fields: data.fields,
                limit: data.pageSize,
                offset: (data.pageIndex - 1) * data.pageSize,
                sort: "",
                context: {}
            }
        }
    })
    .then(res => { return res.data })
    .catch(error => { console.log(error); }),

    fetchById: (id) => customAxios({
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
                    "user_id",
                    "name",
                    "coefficients_salary",
                    "allowance_coefficient",
                    "academic_rank",
                    "is_party_member",
                    "religion",
                    "ethnic",
                    "image_128",
                    "birthday",
                    "job_title",
                    "gender",
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

    create: (data) => customAxios({
        method: 'post',
        url: `${endpoint}/web/dataset/call_kw`,
        data: {
            jsonrpc: "2.0",
            method: "call",
            id: 1,
            params: {
                context: {},
                model: data.model,
                method: "create",
                args: [data.object],
                kwargs: {
                    context: {}
                }
            }
        }
    })
    .then(res => { return res.data })
    .catch(error => { console.log(error); }),

    update: (id, data) => customAxios({
        method: 'post',
        url: `${endpoint}/web/dataset/call_kw`,
        data: {
            jsonrpc: "2.0",
            method: "call",
            id: 1,
            params: {
                context: {},
                model: data.model,
                method: "write",
                args: [
                    [id],
                    data.object
                ],
                kwargs: {
                    context: {}
                }
            }
        }
    })
    .then(res => { return res.data })
    .catch(error => { console.log(error); }),

    delete: (id, data) => customAxios({
        method: 'post',
        url: `${endpoint}/web/dataset/call_kw`,
        data: {
            jsonrpc: "2.0",
            method: "call",
            id: 1,
            params: {
                context: {},
                model: data.model,
                method: "unlink",
                args: [
                    [id]
                ],
                kwargs: {
                    context: {}
                }
            }
        }
    })
    .then(res => { return res.data })
    .catch(error => { console.log(error); }),

    //// xml-rpc
    // fetch_all: (data) => {

    //     // const data = {
    //     //     query: [['id', '=', '2'], []],
    //     //     pageSize: 10,
    //     //     pageIndex: 1,
    //     //     model: 'hr.employee',
    //     //     fields: ['name'],
            
    //     // }

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
    //         inParams.push(data.pageSize);  //Limit
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

    // fetchById: (id) => {
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
    //         inParams.push(data.pageSize);  //Limit
    //         var params = [];
    //         params.push(inParams);
    //         odoo.execute_kw(data.model, 'search', params, function (err, value) {
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
        

    // create: (data) => {
    //     // const data = {
    //     //     model: 'hr.employee',
    //     //     object: {
    //     //         name: 'Nhi Do',
    //     //         work_email: 'superphao@gmail.com'
    //     //     }
    //     // }

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
    //         inParams.push(data.object)
    //         var params = [];
    //         params.push(inParams);
    //         return odoo.execute_kw(data.model, 'create', params, function (err, value) {
    //             if (err) { return console.log(err); }
    //             console.log('Result: ', value);
    //             return value
    //         });
    //     });
    // },

    // update: ({ id, data }) => {
    //     // const data = {
    //     //     model: 'hr.employee',
    //     //     object: {
    //     //         name: 'Nhi Do Van',
    //     //         work_email: 'superphao1@gmail.com'
    //     //     }
    //     // }

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
    //         inParams.push([id]); //id to update
    //         inParams.push(data.object)
    //         var params = [];
    //         params.push(inParams);
    //         return odoo.execute_kw(data.model, 'write', params, function (err, value) {
    //             if (err) { return console.log(err); }
    //             console.log('Result: ', value);
    //             return value
    //         });
    //     });
    // },

    // delete: (id, model) => {

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
    //         inParams.push([id]); //id to delete
    //         var params = [];
    //         params.push(inParams);
    //         return odoo.execute_kw(model, 'unlink', params, function (err, value) {
    //             if (err) { return console.log(err); }
    //             console.log('Result: ', value);
    //             return value
    //         });
    //     });
    // }
}