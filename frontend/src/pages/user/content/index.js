import './style.scss'
import { Row, Col, List } from "antd"
import axios from "axios"
import React from "react"
import { useAuthState } from "../../../hooks/useAuth"
import { Link } from 'react-router-dom'


const ContentSide = ({goodsID, goodsName}) => {

    const {user} = useAuthState()
    const unmountedRef = React.useRef(false)
    const [goods, setGoods] = React.useState([])
    const [count,setCount] = React.useState(0)

    React.useEffect(()=> {
        return () => {
            unmountedRef.current = true
        }
    })

    React.useEffect(()=> {
        const getGoods = async () => {
            const res = await axios.get (
                `/api/goods?goodsCreateId=${user.id}&ordering=-goodsUpdatedTime`
            )
            .then(res => {
                setCount(res.data.length)
				setGoods(res.data)
            	}
            )
        }
        getGoods()
    },[goodsID])


	const listData = [];
	if(goods && goods.length !== 0) {
		for (let i = 0; i < count; i++) {
			let goodImg;
			goodImg = goods[i].images.find(image => image.isMain === true).image;
			let des;
			if(goods[i].goodsDescription) des = goods[i].goodsDescription;
			else des = `Đây là sản phẩm của ` + user.name

			listData.push({
				key: goods[i].goodsID,
				title: goods[i].goodsName,
				description: goods[i].goodsPrice,
				content: des,
				image: goodImg,
				updateTime: goods[i].goodsUpdatedTime,
				linkGoods: `/goods/${goods[i].goodsID}`
				// linkGoods: `/`
			});
		}
	}
    

	

    return (
        <React.Fragment>
            <Col className = "user-category">
				<Row className="user-category-title">
					<h2><b>Sản phẩm đã đăng</b></h2>
				</Row>
				<Row className="user-category-content"> 
					<List
						itemLayout="vertical"
						size="large"
						dataSource={listData}
						pagination={{
						onChange: page => {
							console.log(page);
						},
						pageSize: 3,
						}}
						
						renderItem={item => (
						<List.Item
							key={item.key}
						
							extra={
								<img
									className = "user-category-content-category-img"
									width={200}
									height={200}
									alt="logo"
									src={item.image}
								/>
							}
						>
							<List.Item.Meta
								//   avatar={<Avatar src={item.avatar} />}
								title={<Link to ={item.linkGoods}><h4><b>{item.title}</b></h4></Link>}
								description={<h6><i>{item.description}</i></h6>}
								/>
								<h6><i>{item.content}</i></h6>
							</List.Item>
						)}
					/>
				</Row>
			</Col>
        </React.Fragment>
    )
}

export default ContentSide