import { motion } from 'framer-motion'
import { useCallback, useState } from 'react'
import { useClickOutside } from '../hooks/use-click-outside'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { selectPostsUser } from '../store/reducers/post-slice'
import UploadContract from './UploadContract'
import { showToastSuccess } from '../helpers'

const ModalUploadContract = ({ setShow, data, setShowModalViewContract, setContractPost, setIsUploadContract }) => {
  const dispatch = useAppDispatch()
  const postsUser = useAppSelector(selectPostsUser)
  const [formData, setFormData] = useState(null)
  const [listContractItem, setListContractItem] = useState([])
  const [files, setFiles] = useState([])
  const nodeRef = useClickOutside(() => {
    setShow(false)
  })

  const handleOffModal = useCallback(() => {
    setShow(false)
  }, [setShow])

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })

    setFiles((previousImages) => previousImages.concat(imagesArray))
  }

  const deleteHandler = (image) => {
    setFiles(files.filter((e) => e !== image))
    URL.revokeObjectURL(image)
  }

  const handleUpload = () => {
    const listContracts = JSON.parse(localStorage.getItem('contracts-exchangecar'))

    const newContractByPost = {
      postId: data.id,
      listContractItems: [...files],
    }

    setContractPost([...files])

    let newListContract = []
    if (listContracts !== null) {
      newListContract = [...listContracts, newContractByPost]
    } else newListContract = [newContractByPost]

    localStorage.setItem('contracts-exchangecar', JSON.stringify(newListContract))
    handleOffModal()
    setShowModalViewContract(true)
    setIsUploadContract(true)

    showToastSuccess({ message: `Upload contract success!` })
  }

  return (
    <div className='fixed inset-0 z-[200] flex px-4 md:p-0'>
      <div className='absolute inset-0 bg-[rgba(244,244,244,0.30)] backdrop-blur-custom'></div>
      <motion.div
        ref={nodeRef}
        key={3}
        variants={{
          hidden: { opacity: 0, y: 120 },
          visible: { opacity: 1, y: 0, transition: { delayChildren: 1.5, staggerChildren: 1 } },
        }}
        initial='hidden'
        whileInView='visible'
        className='max-w-[1000px] min-h-[316px] h-auto border-l-[6px] shadow-lg border-[#f97316] rounded-3xl gap-5 flex flex-col items-center justify-between p-10 bg-[#FFFFFF] m-auto z-20 '
      >
        <div className=' font-semibold text-lg text-right cursor-pointer w-full'>
          <button className='p-2 rounded-xl text-[#3B3B3B] font-bold' onClick={() => handleOffModal()}>
            &#x2715;
          </button>
        </div>
        <h2 className='font-semibold text-2xl text-center capitalize text-[#3B3B3B]'>Upload Authority Contract</h2>

        <UploadContract
          id='file-contract'
          selectedFiles={files}
          onSelectFile={onSelectFile}
          deleteHandler={deleteHandler}
        />

        <div className='w-full flex items-center gap-4 z-[1000]'>
          <button onClick={() => handleUpload()} className='rounded-xl p-4 text-[#EDF5FF] flex-1 text-lg bg-[#f97316]'>
            Upload
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ModalUploadContract
