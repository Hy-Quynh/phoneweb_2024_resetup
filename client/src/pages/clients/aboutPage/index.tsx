import React from "react";
import AboutStoneWeb from "../../../assets/img/about-img.jpeg";

export default function AboutPage() {
  return (
    <div>
      {/* About Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
              <div className="about-img position-relative overflow-hidden p-5 pe-0">
                <img className="img-fluid w-100" src={AboutStoneWeb} alt='about'/>
              </div>
            </div>
            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
              <h1
                className="display-5 mb-4 text-3xl"
                style={{ color: "#FFD334" }}
              >
                PDF SHOP
              </h1>
              <p className="mb-4">
                Chúng tôi tự hào là một đại lý bán lẻ chính thức của các thương
                hiệu hàng đầu trong ngành công nghệ. Với cam kết mang đến cho
                khách hàng những sản phẩm chất lượng nhất, chúng tôi chỉ bán các
                sản phẩm điện thoại di động và laptop chính hãng, được sản xuất
                và phân phối trực tiếp từ các nhà sản xuất uy tín trên toàn thế
                giới.
              </p>
              <p className="mb-4">
                Khi mua sắm tại trang web của chúng tôi, bạn sẽ có đảm bảo về
                chất lượng và tính xác thực của sản phẩm. Chúng tôi cam kết rằng
                mỗi sản phẩm điện thoại di động và laptop trên trang web của
                chúng tôi đều được kiểm tra và chứng nhận bởi các chuyên gia kỹ
                thuật và các tổ chức kiểm định độc lập. Điều này đảm bảo rằng
                bạn sẽ nhận được một sản phẩm chính hãng và đáng tin cậy mỗi khi
                mua sắm tại chúng tôi.
              </p>
            </div>
          </div>
          <div className="row g-5 align-items-center mt-2">
            <p style={{ marginTop: "10px" }}>
              Chúng tôi hiểu rằng mua sắm các sản phẩm công nghệ là một quyết
              định quan trọng, và chúng tôi luôn cam kết phục vụ bạn với sự
              chuyên nghiệp và tận tâm. Đội ngũ nhân viên chăm sóc khách hàng
              của chúng tôi sẽ luôn sẵn lòng giúp đỡ và tư vấn bạn về các sản
              phẩm phù hợp với nhu cầu và mong muốn của bạn. Chúng tôi tin rằng
              trải nghiệm mua sắm của bạn tại trang web chính hãng của chúng tôi
              sẽ là một trải nghiệm tuyệt vời mà bạn sẽ không hối tiếc.
            </p>
            <p style={{ marginTop: "10px" }}>
              Tại trang web của chúng tôi, bạn sẽ tìm thấy một bộ sưu tập đa
              dạng của các điện thoại di động và laptop từ các thương hiệu hàng
              đầu như Apple, Samsung, Dell, HP và nhiều thương hiệu khác. Bản đồ
              sản phẩm đáp ứng mọi nhu cầu từ người dùng cá nhân đến doanh
              nghiệp, từ những sản phẩm thông minh, nhẹ nhàng đến những sản phẩm
              mạnh mẽ và chuyên nghiệp.
            </p>
            <p style={{ marginTop: "10px" }}>
              Hãy tin tưởng và đặt niềm tin vào chúng tôi khi mua sắm các sản
              phẩm công nghệ. Với chất lượng hàng đầu, dịch vụ tuyệt vời và đội
              ngũ nhân viên chuyên nghiệp, chúng tôi cam kết sẽ mang đến cho bạn
              trải nghiệm mua sắm tuyệt vời và những sản phẩm công nghệ chính
              hãng tốt nhất. Hãy khám phá trang web của chúng tôi ngay bây giờ
              và trở thành chủ sở hữu của những thiết bị công nghệ xuất sắc
              nhất!
            </p>
          </div>
        </div>
      </div>
      {/* About End */}
    </div>
  );
}
