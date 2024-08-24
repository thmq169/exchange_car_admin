import React from 'react'
import { FaFileUpload } from 'react-icons/fa'
import Button from './Button'
import { MdOutlineCancel } from 'react-icons/md'

const UploadContract = ({ id, selectedFiles, onSelectFile, deleteHandler }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 '>
      <label className='col-span-1 w-full flex flex-col gap-8 justify-center items-center bg-[#f97316] bg-opacity-10 border-2 border-dashed border-[#f97316] rounded-[20px] h-52 cursor-pointer text-lg'>
        <span className='rounded-full p-4 bg-[#f97316] text-white'>
          <FaFileUpload className='w-10 h-10' />
        </span>
        <span className='font-semibold text-sm px-4'>Upload contract here</span>
        <input
          type='file'
          className='hidden'
          multiple
          id={id}
          onChange={onSelectFile}
          accept='image/png , image/jpeg, image/webp'
        />
      </label>

      <div
        className='col-span-1 md:col-span-3 images w-full flex gap-2 overflow-auto relative h-52 '
        style={{ scrollbarWidth: 'thin' }}
      >
        {selectedFiles
          ? selectedFiles.map((file, index) => (
              <div
                key={file}
                className='image min-w-[50%] max-w-[50%] md:min-w-[40%] md:max-w-[40%] h-full relative rounded-[16px] overflow-hidden border-2 border-[#f97316] flex-1 flex justify-center items-center'
              >
                <img src={file} className='h-full w-auto object-contain' alt='upload' />
                {/* <iframe src={file} width='100%' height='100%' className='file-contract-preview' /> */}
                <Button
                  icon={<MdOutlineCancel />}
                  color='rgb(153, 171, 180)'
                  bgColor='light-gray'
                  size='2xl'
                  borderRadius='50%'
                  onClick={() => deleteHandler(file)}
                  className='absolute top-0 right-0'
                />
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default UploadContract
