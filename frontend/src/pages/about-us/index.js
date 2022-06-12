import './style.scss'

import React from 'react'
import Logo from '../../components/elements/logo'
import imgTwo from '../../img/about-us/2.png'
import imgOne from '../../img/about-us/1.png'
import SiteLayout from '../../components/layouts/site-layout'
import { Row, Col } from 'antd'

const AboutUs = () => {
	return (
		<SiteLayout>
			<div className="about-page">
				<Logo className="logo-heading logo-heading--about-us" />

				<div className="about-page-section">
					<div className="about-page-section-body">
						<div className="about-page-section-body__title">Về dự án</div>

						<div className="about-page-section-body__sub">GoodsPicker</div>

						<div className="about-page-section-body__content">
							GoodsPicker là bài toán được xây dựng nhằm mục đích giúp người
							dùng có thể bán lại những sản phẩm, đồ dùng đã qua sử dụng nhưng
							vẫn hoạt động tốt. Qua đó nhằm đem những đồ vật đến với những
							người cần chúng, giúp người bán kiếm được thu nhập thụ động và
							giảm tác động xấu đối với môi trường.
						</div>

						<div className="about-page-section-body__content">
							Trước khi có công nghệ hiện đại như hiện nay, việc trao đổi hàng
							hoá giữa các bên luôn gặp nhiều khó khăn trong việc tìm nguồn
							hàng, lên lịch vận chuyển và giảm thiểu rủi ro. Cụ thể, A muốn bán
							một món đồ, nhưng lại không có cách nào để tìm người B cần mua.
							Ngược lại, B cần mua món đồ với một chi phí hợp lý nhưng lại không
							thể tìm một người A bán. Sự gián đoạn về thông tin cũng làm nảy
							sinh thêm vấn đề về độ tin cậy khi có các bên thứ ba sinh ra làm
							cầu nối.
						</div>

						<div className="about-page-section-body__content">
							Chính vì vậy, GoodsPicker sẽ là một giải pháp toàn diện cho mọi
							người, để người bán có thể trở thành người mua và người mua cũng
							có thể trở thành người bán.
						</div>
					</div>
				</div>

				<img
					src={imgTwo}
					className="about-page-img about-page-img--two"
					alt="logo"
				/>

				<div className="about-page-section">
					<div className="about-page-section-body">
						<div className="about-page-section-body__sub">
							Triết lý thiết kế
						</div>
						<p className="about-page-section-body__content">
							GoodsPicker tự xây dựng triết lý làm việc của mình trên bộ nguyên
							tắc bộ 3 – rất thông minh và dễ tuân thủ, bảo trì:
						</p>
						<p className="about-page-section-body__content">
							<span>1. Thân thiện:</span>
							GoodsPicker được cấu thành từ các đặc trưng: Chi phí hợp lý, đơn
							giản, dễ sử dụng và linh hoạt, trong sử dụng phát triển thiết kế
							web. Lượng nội dung được sắp xếp vừa đủ, dễ nhìn, dễ thao tác.
						</p>
						<p className="about-page-section-body__content">
							<span>2. Thiết thực:</span>
							GoodsPicker được xây dựng từ những nhu cầu cơ bản nhất của con
							người, không thừa và không thiếu.
						</p>
						<p className="about-page-section-body__content">
							<span>3. Thích ứng:</span>
							GoodsPicker có thể hoạt động đa nền tảng, với nhiều kích cỡ màn
							hình, tạo thuận lợi tốt đa cho người sử dụng.
						</p>
					</div>
				</div>

				<div className="about-page-section">
					<Row>
						<Col md={8}>
							<img
								src={imgOne}
								className="about-page-img about-page-img--one"
								alt="..."
							/>
						</Col>
						<Col md={16}>
							<div className="about-page-section-body">
								<div className="about-page-section-body__title">
									Chỉn chu từ những điều nhỏ nhất
								</div>

								<p className="about-page-section-body__content">
									Từ khung trang, kích cỡ đến những nút tương tác, GoodsPicker
									luôn cố gắng làm cẩn thận đến từng chi tiết. Bởi chúng tôi
									biết, đây sẽ là những điều người dùng thường xuyên sử dụng, và
									đó cũng chính là điều quyết định đến trải nghiệm của các bạn.
								</p>

								<p className="about-page-section-body__content about-page-section-body__content--sub">
									<span>- Đội ngũ phát triển dự án</span>
								</p>
							</div>
						</Col>
					</Row>
				</div>

				<div className="about-page-section">
					<div className="about-page-section-body">
						<h3 className="about-page-section-body__title">
							Về đội ngũ phát triển
						</h3>
						<div className="about-page-section-body__sub">
							Những nhân tố không thể thiếu
						</div>
						<p className="about-page-section-body__content">
							GoodsPicker là một dự án được xây dựng bởi nhóm 4 sinh viên đến từ
							Trường Đại học Công nghệ - Đại học Quốc gia Hà Nội. Dự án được sử
							dụng đa dạng các công cụ và ngôn ngữ, bao gồm ReactJS, Django
							Framework cùng với Python, HTML và CSS. Thành viên của dự án:
						</p>
					</div>

					<table className="about-page-table">
						<tbody>
							<tr>
								<th className="striped" scope="row">
									1
								</th>
								<td className="striped">Nguyễn Hồng Quân</td>
								<td className="striped">kukuakuan</td>
								<td className="striped">Front-end Developer</td>
							</tr>
							<tr>
								<th scope="row">2</th>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<th className="striped" scope="row">
									3
								</th>
								<td className="striped"></td>
								<td className="striped"></td>
								<td className="striped"></td>
							</tr>
							<tr>
								<th scope="row">4</th>
								<td></td>
								<td></td>
								<td></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</SiteLayout>
	)
}

export default AboutUs
