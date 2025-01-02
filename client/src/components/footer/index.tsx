export default function Footer() {
  return (
    <div>
      {/* Footer Start */}
      <div className="container-fluid bg-dark text-secondary mt-5 pt-5">
        <div className="row px-xl-5 pt-5">
          <div className="col-lg-8 col-md-12 mb-5 pr-3 pr-xl-5">
            <h5 className="text-secondary text-uppercase mb-4">PDF SHOP</h5>
            <p className="mb-4">
              Với sự kết hợp giữa niềm đam mê với công nghệ và tận tâm với khách
              hàng, chúng tôi luôn cung cấp những sản phẩm hàng đầu từ các
              thương hiệu nổi tiếng. Điện thoại thông minh và laptop mạnh mẽ từ
              các nhà sản xuất hàng đầu thế giới đều có mặt tại đây. Chúng tôi
              cam kết mang đến cho bạn trải nghiệm mua hàng thuận tiện, nhanh
              chóng và an toàn với đội ngũ chăm sóc khách hàng tận tâm của chúng
              tôi
            </p>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-primary mr-3" />
              123 Street, New York, USA
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope text-primary mr-3" />
              info@example.com
            </p>
            <p className="mb-0">
              <i className="fa fa-phone-alt text-primary mr-3" />
              +012 345 67890
            </p>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="row">
              <div className="col-12 mb-5">
                <h5 className="text-secondary text-uppercase mb-4">
                  Quick Shop
                </h5>
                <div className="d-flex flex-column justify-content-start">
                  <a className="text-secondary mb-2" href="/">
                    <i className="fa fa-angle-right mr-2" />
                    Home
                  </a>
                  <a className="text-secondary mb-2" href="/about">
                    <i className="fa fa-angle-right mr-2" />
                    Về chúng tôi
                  </a>
                  <a className="text-secondary mb-2" href="/product">
                    <i className="fa fa-angle-right mr-2" />
                    Sản phẩm
                  </a>
                  <a className="text-secondary mb-2" href="/post">
                    <i className="fa fa-angle-right mr-2" />
                    Bài viết
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer End */}
      {/* Back to Top */}
      <a href="#" className="btn btn-primary back-to-top">
        <i className="fa fa-angle-double-up" />
      </a>
    </div>
  );
}
