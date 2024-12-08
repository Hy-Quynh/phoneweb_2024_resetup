import { useEffect, useState } from "react";
import { brandAPI } from "../../../../services/brand";

export default function HomepageBrand() {
  const [listBrand, setListBrand] = useState([])

  const getBrandList = async () => {
    try {
      const res = await brandAPI.getAllBrand(true);

      if (res?.data?.success) {
        setListBrand(res?.data?.payload?.brand);
      } 
    } catch (error) {
      console.log('get brand list error >>> ', error);
    }
  };

  useEffect(() => {
    getBrandList();
  }, []);

  return (
    <div className='container-fluid pt-5'>
      <h2 className='section-title position-relative text-uppercase mx-xl-5 mb-4'>
        <span className='bg-secondary pr-3'>Thương hiệu</span>
      </h2>
      <div className='row px-xl-5 pb-3'>
        {listBrand?.map((item: any, index) => {
          return (
            <div
              className='col-lg-3 col-md-4 col-sm-6 pb-1'
              key={`homepage_brand_${item?._id}`}
            >
              <a className='text-decoration-none' href={`/product?brand=${item?._id}`}>
                <div className='cat-item img-zoom d-flex align-items-center mb-4'>
                  <div
                    className='overflow-hidden flex flex-col justify-center'
                    style={{ width: 100, height: 100 }}
                  >
                    <img className='img-fluid w-full max-h-full' src={item?.image} alt='' />
                  </div>
                  <div className='flex-fill pl-3'>
                    <h6>{item?.name}</h6>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
