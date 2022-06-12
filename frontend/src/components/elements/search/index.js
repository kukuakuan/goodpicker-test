import { Input, Form } from "antd";
import React, { useEffect } from "react";
import { SearchOutlined } from '@ant-design/icons';
import { messageService } from "../../../utils/message-service";

const Search = () => {

    // let aaa = (new Date()).getTime();

    const initialValues = {
        filterByName: ''
    }



    const sendMessage = (value) => {
        messageService.sendMessage(value);
    }

    const onFinish = (values) => {
        let _values = {
            filterByName: values.filterByName,
        }
        sendMessage(_values);
    }

    return (
        <Form
            initialValues={initialValues}
            onFinish={onFinish}
        >
            <Form.Item name="filterByName">
                <Input
                    placeholder="Search..."
                    suffix={
                        <SearchOutlined />
                    }
                // htmlType="submit"
                // onPressEnter={(e) => sendMessage(e.target.value)}
                />
            </Form.Item>
        </Form>
    )
}

export default Search;