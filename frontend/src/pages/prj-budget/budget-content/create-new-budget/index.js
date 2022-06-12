import "./styles.scss";
import { Form, Input, Col, Row, Button, DatePicker, Space, Tabs } from "antd";
import { useReducer, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewBudget = (props) => {
  const rules = {
    budgetId: [{ require: true, whitespace: true }],
    version: [{ require: true, whitespace: true }],
    company: [{ require: true, whitespace: true }],
    status: [{ require: true }],
    createUser: [{ require: true, whitespace: true }],
    createDate: [{ require: true, type: Date, format: "YYYY-MM-DD" }],
    editUser: [{ require: true, whitespace: true }],
    editDate: [{ require: true, type: Date, format: "YYYY-MM-DD" }],
    project: [{ require: true, whitespace: true }],
    voucherNumber: [{ require: true, whitespace: true }],
    budgetProjectName: [{ require: true, whitespace: true }],
    note: [{ whitespace: true }],
    totalBudgetBeforeTax: [{ require: true, whitespace: true }],
    totalBudgetAfterTax: [{ require: true, whitespace: true }],
    totalValueTax: [{ require: true, whitespace: true }],
    currencyType: [{ require: true, whitespace: true }],
  };

  // const [state, dispatch] = useReducer({
  //     budgetId:0,
  //     version:0,
  //     company:[],
  //     status:'idle',
  //     createUser:'',
  //     createDate:`YYYY-MM-DD`,
  //     editUser:'',
  //     editDate:`YYYY-MM-DD`,
  //     project:'',
  //     voucherNumber:'',
  //     budgetProjectName:'',
  //     note:'',
  //     totalBudgetBeforeTax:'',
  //     totalBudgetAfterTax:'',
  //     totalValueTax:'',
  //     currencyType:[]
  // })

  // const [currencyType, setCurrencyType] = useState();

  const navigate = useNavigate();

  const onFinishFill = async (values) => {
    let formData = new FormData();

    for (let key in values) {
      formData.append(key, values[key] ?? "");
    }
    try {
      await axios.post("/api/budgets/", formData, {});
      navigate('/project-budget')
    } catch (error) {
      console.log(error.response);
    } finally {
			window.scrollTo(0, 0)
    }
  };

  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Thông tin chung" key="1">
          <Form className="create-new-budget-form" onFinish={onFinishFill}>
            <Col>
              <Row gutter={[24, 0]}>
                <Col span={6}>
                  <Form.Item
                    className="f-0"
                    name="budgetId"
                    rules={rules.budgetId}
                    label="Mã ngân sách dự án"
                    style={{ display: "block" }}
                  >
                    <Input placeholder="Budget Index"></Input>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    className="f-0"
                    name="version"
                    rules={rules.version}
                    label="Phiên bản"
                    style={{ display: "block" }}
                  >
                    <Input placeholder="version"></Input>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    className="f-0"
                    name="company"
                    rules={rules.company}
                    label="Công ty"
                    style={{ display: "block" }}
                  >
                    <Input placeholder="company"></Input>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    className="f-0"
                    name="status"
                    rules={rules.status}
                    label="Trạng thái"
                    style={{ display: "block" }}
                  >
                    <Input placeholder="status"></Input>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col span={6}>
                  <Form.Item
                    className="f-0"
                    name="createUser"
                    rules={rules.createUser}
                    label="Người tạo"
                    style={{ display: "block" }}
                  >
                    <Input placeholder="createUser"></Input>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    className="f-0"
                    name="createDate"
                    rules={rules.createDate}
                    label="Ngày tạo"
                    style={{ display: "block" }}
                  >
                    {/* <DatePicker format="YYYY-MM-DD" /> */}
                    <Input placeholder="YYYY-MM-DD"></Input>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    className="f-0"
                    name="editUser"
                    rules={rules.editUser}
                    label="Người chỉnh sửa gần nhất"
                    style={{ display: "block" }}
                  >
                    <Input placeholder="editUser"></Input>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    className="f-0"
                    name="editDate"
                    rules={rules.editDate}
                    label="Ngày chỉnh sửa gần nhất"
                    style={{ display: "block" }}
                  >
                    {/* <DatePicker
                    format="YYYY-MM-DD"
                  /> */}
                    <Input placeholder="YYYY-MM-DD"></Input>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[24, 0]}>
                <Col span={6}>
                  <Form.Item
                    className="f-0"
                    name="project"
                    rules={rules.project}
                    label="Dự án"
                    style={{ display: "block" }}
                  >
                    <Input placeholder="project"></Input>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    className="f-0"
                    name="voucherNumber"
                    rules={rules.voucherNumber}
                    label="Số chứng từ ngân sách dự án tham chiếu"
                    style={{ display: "block" }}
                  >
                    <Input placeholder="voucherNumber"></Input>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    className="f-0"
                    name="budgetProjectName"
                    rules={rules.budgetProjectName}
                    label="Tên ngân sách dự án"
                    style={{ display: "block" }}
                  >
                    <Input placeholder="budgetProjectName"></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Row>
              <Col span={24}>
                <Form.Item
                  className="f-0"
                  name="note"
                  rules={rules.note}
                  label="Ghi chú"
                  style={{ display: "block" }}
                >
                  <Input.TextArea placeholder="note"></Input.TextArea>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[24, 0]}>
              <Col span={6}>
                <Form.Item
                  className="f-0"
                  name="totalBudgetBeforeTax"
                  rules={rules.totalBudgetBeforeTax}
                  label="Tổng giá trị ngân sách trước thuế"
                  style={{ display: "block" }}
                >
                  <Input placeholder="totalBudgetBeforeTax"></Input>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  className="f-0"
                  name="totalBudgetAfterTax"
                  rules={rules.totalBudgetAfterTax}
                  label="Tổng giá trị thuế"
                  style={{ display: "block" }}
                >
                  <Input placeholder="totalBudgetAfterTax"></Input>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  className="f-0"
                  name="totalValueTax"
                  rules={rules.totalValueTax}
                  label="Tổng giá trị ngân sách (sau thuế)"
                  style={{ display: "block" }}
                >
                  <Input placeholder="totalValueTax"></Input>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  className="f-0"
                  name="currencyType"
                  rules={rules.currencyType}
                  label="Đơn vị tiền tệ"
                  style={{ display: "block" }}
                >
                  <Input placeholder="currencyType"></Input>
                </Form.Item>
              </Col>
            </Row>
            <Row className='button-action-success' justify='end'>
            <Space>
              <Form.Item className="f-0" name="currencyType">
                <Button
                  name="create-budget"
                  className="create-budget-button"
                  htmlType="submit"
                  type="primary"
                >
                  <span>Create</span>
                </Button>
              </Form.Item>
              <Form.Item className="f-0" name="currencyType">
                <Button
                  name="create-budget"
                  className="create-budget-button"
                  htmlType="cancle"
                  type="danger"
                  onClick={props.onClick}
                >
                  <span>Cancle</span>
                </Button>
              </Form.Item>
              </Space>
            </Row>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Chi tiết ngân sách" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default NewBudget;
