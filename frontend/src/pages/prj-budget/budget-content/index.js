import './styles.scss'
import { Col, Breadcrumb } from "antd"
import RenderBudget from './render-budget';
import { useState } from 'react';
import NewBudget from './create-new-budget';

const BudgetContent = () =>{
    const [visible, setVisible] = useState(false);

    const onClick = () => {
        setVisible(!visible)
    }
    return (
        <div className="budget-content-content">
        <Col>
            <div className="budget-content-content-header">
                <Col>
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                            fontSize:'14px'
                        }}>
                        <Breadcrumb.Item>Dự án</Breadcrumb.Item>
                        <Breadcrumb.Item
                            style={{color:'blue'}}
                        >
                            Opal skyview
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <span style={{fontSize: 'xx-large'}}>Ngân sách dự án</span>
                </Col>
            </div>
            <div className="budget-content-content-body">
                <Col>
                    <div className="budget-content-content-sort-budget"></div>
                    <div className="budget-content-content-budget-table">
                        {!visible && <RenderBudget onClick = {onClick}/>}
                        {visible && <NewBudget onClick={onClick}/>}
                    </div>
                </Col>
            </div>
        </Col>
    </div>
    )
}

export default BudgetContent