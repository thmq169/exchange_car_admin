import moment from 'moment'
import React from 'react'
import { useAppSelector } from '../hooks/hook'
import { selectUser } from '../store/reducers/auth-slice'

const TemplateContract = ({ ref, className, print }) => {
  const day = moment().date()
  const month = moment().month()
  const year = moment().year()
  const user = useAppSelector(selectUser)
  return (
    <>
      <div>
        <h1 className='text-center font-bold text-lg mt-1.5'>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h1>
        <p className='text-center mt-2.5'>Độc lập – Tự do – Hạnh phúc</p>
        <div className='flex justify-center mt-2'>
          {/* <img src='mau-giay-uy-quyen-ban-xe_files/Image_001.png' alt='image' className='h-0.5 w-12' />
          <img src='mau-giay-uy-quyen-ban-xe_files/Image_002.png' alt='image' className='h-0.5 w-12' /> */}
        </div>
        <p className='text-center mt-1.5'>o0o</p>
        <h1 className='text-center font-bold text-lg mt-1.5'>GIẤY ỦY QUYỀN MUA BÁN XE</h1>

        <ul className='list-disc list-inside mt-4 ml-28'>
          <li className='italic'>Căn cứ Bộ luật Dân sự năm 2015 nước Cộng hòa xã hội chủ nghĩa Việt Nam.</li>
          <li className='italic'>Căn cứ vào các văn bản hiến pháp hiện hành.</li>
        </ul>

        <p className='italic mt-4 ml-28'>
          TP Hồ Chí Minh , ngày <b>{day}</b> tháng <b>{month + 1}</b> năm <b>{year}</b>; chúng tôi gồm có:
        </p>

        <div className='list-decimal list-inside mt-4 ml-2'>
          <div>
            <h2 className='font-bold'>1. BÊN ỦY QUYỀN</h2>
            <p className='mt-4 ml-2'>
              Họ
              tên:..........................................................................................................................................................
            </p>
            <p className='mt-4 ml-2'>
              Địa
              chỉ:..........................................................................................................................................................
            </p>
            <p className='mt-4 ml-2'>
              Số CMND:.......................... Cấp ngày:........................ Nơi
              cấp:.................................................................
            </p>
            <p className='mt-4 ml-2'>
              Quốc
              tịch:.....................................................................................................................................................
            </p>
            <p className='italic mt-4 text-lg font-bold'>Và</p>
          </div>
          <div>
            <h2 className='font-bold mt-4'>2. BÊN ĐƯỢC ỦY QUYỀN</h2>
            <p className='mt-4 ml-2'>
              Doanh nghiệp:.... <b>Công ty Cổ phần Đầu tư Công nghệ ExchangeCar</b>{' '}
              .............................................
            </p>
            <p className='mt-4 ml-2'>
              Cá nhân phụ trách:....{' '}
              <b>
                {user.first_name} {user.last_name}
              </b>{' '}
              ......................................................................................................
            </p>
            <p className='mt-4 ml-2'>
              Địa chỉ:....<b>Số 19, Nguyễn Hữu Thọ, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh</b>
              .........................
              {/* 19 Nguyen Huu Tho Street, Tan Hung, District 7, Ho Chi Minh City */}
            </p>
            <p className='mt-4 ml-2'>
              Số CMND:.. <b>123456789</b>... Cấp ngày:...<b>13/05/2021</b>..... Nơi cấp:.... <b>Tp Hồ Chí Minh</b>{' '}
              ............................
            </p>
            <p className='mt-4 ml-2'>
              Quốc tịch:......... <b>Việt Nam</b>{' '}
              ..........................................................................................................................
            </p>
          </div>
        </div>

        <h1 className='font-bold mt-6 ml-2'>ĐIỀU 1. NỘI DUNG ỦY QUYỀN:</h1>
        <p className='mt-4 ml-2'>Nay ủy quyền cho Bên được ủy quyền mua bán xe nhãn hiệu: ..........................</p>
        <p className='mt-4 ml-2'>Loại xe: ................</p>
        <p className='mt-4 ml-2'>Màu sơn: .........</p>
        <p className='mt-4 ml-2'>Số máy: .............</p>
      </div>
      <div>
        <p className='mt-4 ml-2'>Số khung: .............</p>
        <p className='mt-4 ml-2'>Biển số đăng ký: ........................... theo "Đăng ký xe" số .................</p>
        <p className='mt-4 ml-2'>
          Do Phòng Cảnh sát Giao thông - Công an ...................... cấp ngày .............. (đăng ký lần đầu ngày).
        </p>
        <p className='mt-4 ml-2'></p>
        {/* <p className='mt-4 ml-2'>Nhân danh Bên ủy quyền, Bên được ủy quyền thực hiện các việc sau đây:</p>
        <p className='mt-4 ml-2'>
          .........................................................................................................................................................................
        </p>
        <p className='mt-4 ml-2'>
          .........................................................................................................................................................................
        </p>
        <p className='mt-4 ml-2'>
          .........................................................................................................................................................................
        </p> */}

        <h1 className='font-bold mt-6 ml-2'>ĐIỀU 2. QUYỀN VÀ NGHĨA VỤ CÁC BÊN:</h1>
        <ul className='list-none ml-2 mt-4'>
          <li className='flex'>
            <span>- </span>
            <p className='ml-2'>
              Hai bên cam kết sẽ hoàn toàn chịu trách nhiệm trước Pháp luật về mọi thông tin ủy quyền ở trên.
            </p>
          </li>
          <li className='flex mt-4'>
            <span>- </span>
            <p className='ml-2'>
              Mọi tranh chấp phát sinh giữa bên ủy quyền và bên được ủy quyền sẽ do hai bên tự giải quyết.
            </p>
          </li>
        </ul>

        <p className='italic mt-4 ml-2'>
          Giấy ủy quyền trên được lập thành .... <b>2</b>.... bản, mỗi bên giữ .... <b>1</b> .... bản.
        </p>

        <div className='flex justify-around mt-8'>
          <div>
            <p className='font-bold text-center'>BÊN ỦY QUYỀN</p>
            <p className='italic text-center'>(Ký, họ tên)</p>
            <p className='h-32'></p>
          </div>
          <div>
            <p className='font-bold text-center'>BÊN ĐƯỢC ỦY QUYỀN</p>
            <p className='italic text-center'>(Ký, họ tên)</p>
            <p className='h-32'></p>
          </div>
        </div>

        <h1 className='font-bold mt-8 ml-2'>XÁC NHẬN CỦA CƠ QUAN NHÀ NƯỚC CÓ THẨM QUYỀN</h1>
        <p className='mt-4 ml-2'>
          ......................................................................................................................................
        </p>
        <p className='mt-4 ml-2'>
          ......................................................................................................................................
        </p>
      </div>
    </>
  )
}

export default TemplateContract
