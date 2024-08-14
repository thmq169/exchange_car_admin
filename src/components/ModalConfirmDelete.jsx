import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { useClickOutside } from '../hooks/use-click-outside'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { setLoading } from '../store/reducers/app-slice'
import { showToastError, showToastSuccess } from '../helpers'
import { postsService } from '../services/post.service'
import { getLocalStorageAcceToken } from '../utils'
import { selectPostsUser, setPostsUser } from '../store/reducers/post-slice'

const ModalConfirmDelete = ({ setShow, data, handleClick }) => {
  const dispatch = useAppDispatch()
  const postsUser = useAppSelector(selectPostsUser)
  const nodeRef = useClickOutside(() => {
    setShow(false)
  })

  const handleOffModal = useCallback(() => {
    setShow(false)
  }, [setShow])

  const handleDelete = async (post_id, handleClick) => {
    dispatch(setLoading(true))
    try {
      const res = await postsService.deletePost({ post_id: post_id, access_token: getLocalStorageAcceToken() })

      if (res.status === 200) {
        const newListPostUser = postsUser.filter((post) => post.id !== post_id)
        dispatch(setPostsUser(newListPostUser))
        handleOffModal()
        showToastSuccess({ message: res.data.data.message })
        if (handleClick) {
          handleClick()
        }
      }
    } catch (error) {
      showToastError({ message: error.message })
    } finally {
      dispatch(setLoading(false))
    }
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
        className='max-w-auto min-h-[316px] h-auto border-l-[6px] shadow-lg border-[#f97316] rounded-3xl gap-5 flex flex-col items-center justify-between p-10 bg-[#FFFFFF] m-auto z-20 '
      >
        <div className=' font-semibold text-lg text-right cursor-pointer w-full'>
          <button className='p-2 rounded-xl text-[#3B3B3B] font-bold' onClick={() => handleOffModal()}>
            &#x2715;
          </button>
        </div>
        <h2 className='font-semibold text-2xl text-center capitalize text-[#3B3B3B]'>Are you sure?</h2>

        <p className='text-lg'>
          Do you want really want to delete <strong>{data.car.car_name}</strong>?
        </p>

        <div className='w-full flex items-center gap-4 z-[1000]'>
          <button
            className='rounded-xl p-4 text-[#6e7071] bg-[#d5d3d3] bg-opacity-25 flex-1 text-lg '
            onClick={() => handleOffModal()}
          >
            Cancel
          </button>
          <button
            className='rounded-xl p-4 text-[#EDF5FF] flex-1 text-lg bg-[#f97316]'
            onClick={() => {
              handleDelete(data.id, handleClick)
            }}
          >
            Delete Now
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default ModalConfirmDelete
