import "./styles.scss";
import {
  Button,
  Table,
  Row,
  Col,
  Input,
  Dropdown,
  Menu,
  Space,
  Popconfirm,
} from "antd";
import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import {
  DownloadOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  DownOutlined,
  SearchOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import EditBudget from "../edit-budget";

const actionEdit = {
  title: "Trạng thái",
  dataIndex: "action",
  width: '5%',
  key: "9",
  render: () => (
    <Dropdown
      overlay={
        <Menu
          items={[
            {
              label: "Xem",
              key: "1",
            },
            {
              label: "Sửa",
              key: "2",
            },
            {
              label: "Xóa",
              key: "3",
            },
          ]}
        />
      }
    >
      <a onClick={(e) => e.preventDefault()}>
        <MoreOutlined 
          style={{color: 'black'}}
        />
      </a>
    </Dropdown>
  ),
};

const itemDropdown = [
  {
    title: "Mã ngân sách dự án",
    key: "1",
  },
  {
    title: "Phiên bản",
    key: "2",
  },
  {
    title: "Trạng thái",
    key: "3",
  },
];

const RenderBudget = (props) => {
  //     const colSTT = {
  //     title: 'STT',
  //     key: '1',
  //     render: (text, record, index) => index+1,
  //     // render: (value, item, index) => (page - 1) * 10 + index +1
  // }
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const handleRenderIndex = useCallback((pagination) => {
    // console.log(pagination.current);
    // setPagination(pagination)
    // console.log(pagination)
    // return pagination.current
    return (...[, , index]) => {
    // console.log(pagination.current)

        if (pagination) {
          const { current = 1, pageSize = 10 } = pagination;
          return index + 1 + (current - 1) * pageSize;
        }
        return index + 1;
      };
  }, []);
  const columns = useMemo(() => {
    return [
      {
        title: "STT",
        dataIndex: "stt",
        key: "1",
       width: '5%',
        ellipsis: true,
        render: handleRenderIndex(pagination),
      },
      {
        title: "Mã ngân sách dự án",
        dataIndex: "budgetId",
        key: "2",
        width: "12,5%",
        sorter: (a, b) => a.budgetId - b.budgetId,
        // sortOrder: sortedInfo.columnKey === 'budgetId' ? sortedInfo.order : null,
        ellipsis: true,
      },
      {
        title: "Tên ngân sách dự án",
        dataIndex: "budgetProjectName",
        key: "3",
        width: "24%",
      },
      {
        title: "Phiên bản",
        dataIndex: "version",
        key: "4",
        width: "8.5%",
      },
      {
        title: "Tổng ngân sách",
        dataIndex: "totalBudgetAfterTax",
        width: "12,5%",
        key: "5",
      },
      {
        title: "Ngày tạo",
        dataIndex: "createDate",
        width: "12,5%",
        key: "6",
      },
      {
        title: "Người tạo",
        dataIndex: "createUser",
        // width: '12,5%',
        key: "7",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        width: '5%',
        key: "8",
      },
    ];
  }, [handleRenderIndex, pagination]);
  const [getBudgetId, setGetBudgetId] = useState();
  const [data, setData] = useState();
  const [columnsTable, setColumnsTable] = useState([...columns, actionEdit]);
  const [checkEdit, setCheckEdit] = useState(false);
  const [editPage, setEditPage] = useState(true);
  const [loading, setLoading] = useState(false);

  // const [dropdownSort, setDropdownSort] = useState();
  const [dropdownTitle, setDropdownTitle] = useState(itemDropdown[0].title);

  const getData = async (params = {}) => {
    setLoading(true);
    const res = await axios.get("/api/budgets");
    setData(res.data);
    setLoading(false);
    setPagination({
      ...params.pagination,
      total: res.data.length,
      showSizeChanger: true,
    });
  };

  const handleTableChange = (newPagination, filters, sorter) => {
    getData({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination: newPagination,
      ...filters,
    });
  };

  const onSearch = (searchText) => {
    const filterEvents = data.filter(({ budgetProjectName }) => {
      budgetProjectName = budgetProjectName.toLowerCase();
      return budgetProjectName.includes(searchText);
    });

    setData(filterEvents);
  };

  const onExportXlsx = () => {
    var wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "TestSheet1");
    XLSX.writeFile(wb, "TestExcel.xlsx");
  };

  const onEdit = () => {
    const itemEdit = {
      title: "Chỉnh sửa",
      dataIndex: "edit",
      // width: '12,5%',
      key: "9",
      render: (text, record, index) => (
        <Space>
          <Button
            type="text"
            onClick={async (e) => {
              try {
                await axios.delete(`/api/budgets/${record.budgetId}/`);
              } catch (error) {
              } finally {
                console.log("done");
              }
            }}
          >
            Delete
          </Button>
          <Button type="text" onClick={() => onHandleEdit(record)}>
            Edit
          </Button>
        </Space>
      ),
    };
    setCheckEdit(!checkEdit);
    if (checkEdit) {
      setColumnsTable([...columnsTable, itemEdit]);
    } else {
      setColumnsTable(columns);
    }
  };
  const onHandleEdit = useCallback((record) => {
    setGetBudgetId(record.budgetId);
  }, []);

  const onHandleChangeSort = ({ ...params }) => {
    setDropdownTitle(itemDropdown[params.key].title);
  };

  const menuFilter = (
    <Menu onClick={onHandleChangeSort}>
      {[
        ...Array.from(
          {
            length: itemDropdown.length,
          },
          (_, i) => i
        ),
      ].map((i) => (
        <Menu.Item key={i}>{itemDropdown[i].title}</Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    getData({
      pagination,
    });
  }, []);

  return (
    <div className="budget-tables">
      <Col>
        <Row className="table-action">
          <Col span={12}>
            <Row gutter={[10, 0]}>
              <Col>
                <Dropdown overlay={menuFilter}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {dropdownTitle}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </Col>
              <Col>
                <Dropdown overlay={<Input.Search onSearch={onSearch} />}>
                  <a onClick={(e) => e.preventDefault()}>
                    <SearchOutlined />
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </Col>

          <Col className="budget-download-xlsx" span={12}>
            <Row gutter={[20, 0]}>
              <Col className="item-right">
                <Row gutter={[8, 0]}>
                  <Col className="button-export-xlsx">
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={onExportXlsx}
                    />
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      icon={<PlusCircleOutlined />}
                      shape="circle"
                      onClick={props.onClick}
                    />
                  </Col>
                  <Col>
                    <Button
                      type="default"
                      icon={<DeleteOutlined />}
                      onClick={onEdit}
                      danger
                      shape="circle"
                      color="red"
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Table
          columns={columnsTable}
          dataSource={data}
          pagination={{
            pagination,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
          loading={loading}
          onChange={handleTableChange}
          size="small"
        />
      </Col>
    </div>
  );
};

export default RenderBudget;
