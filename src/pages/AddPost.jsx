import React, { useEffect, useState } from 'react'
import { Header } from '../components'
import Breadcrumbs from '../components/Breadcrumbs'
import UploadImage from '../components/Upload'
import DropDown from '../components/DropDown'
import useGetData from '../hooks/use-get-data'
import { carService } from '../services/car.service'
import { useTransition, animated } from '@react-spring/web'
import { showToastError, yearRange } from '../helpers'
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from '@syncfusion/ej2-react-richtexteditor'
import { calculateCostForPublisDay, formatContent } from '../utils'
import { postsService } from '../services/post.service'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { addPost, selectPosts } from '../store/reducers/post-slice'
import { setLoading } from '../store/reducers/app-slice'

const TOOLBAR_SETTINGS = {
  items: [
    'Bold',
    'Italic',
    'Underline',
    'StrikeThrough',
    'FontName',
    'FontSize',
    'FontColor',
    'BackgroundColor',
    'LowerCase',
    'UpperCase',
    '|',
    'Formats',
    'Alignments',
    'UnorderedList',
    'Outdent',
    'Indent',
    '|',
    'CreateLink',
    'Image',
    '|',
    'ClearFormat',
    'Print',
    'SourceCode',
    '|',
    'Undo',
    'Redo',
  ],
}

export const Input = ({ label, name, value, placeholder, type, min, max, handleChange, className, options }) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full gap-1 ${className}`}>
      <p className='w-full font-medium text-secondary '>{label}</p>
      <div className='relative h-16 w-full'>
        <input
          {...options}
          name={name}
          value={value}
          placeholder={placeholder}
          type={type}
          min={min && Number(min)}
          max={max && Number(max)}
          maxLength={max}
          onBlur={(e) => handleChange(e.target.value)}
          className='py-2 px-4 border-[#f97316] ring-[#f97316] ring-1 block peer rounded-[5px] w-full mt-3 focus:outline-none'
        />
      </div>
    </div>
  )
}

const AddPost = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectPosts)
  const { brands, queryTable } = useGetData()
  const [showCarSpecs, setShowCarSpecs] = useState(false)
  const [showMileage, setShowMileage] = useState(true)
  const [showStep1, setShowStep1] = useState(true)
  const [showStep2, setShowStep2] = useState(false)
  const [showStep3, setShowStep3] = useState(false)
  const [selectedImages, setSelectedImages] = useState([])
  const [models, setModels] = useState(null)
  const [variants, setVariants] = useState(null)
  const [formData, setFormData] = useState(null)
  const [cities, setCities] = useState(null)
  const [districts, setDistricts] = useState(null)
  const [outColors, setOutColors] = useState(null)
  const [origins, setOrigins] = useState(null)
  const [status, setStatus] = useState(null)
  const [years, setYears] = useState(null)
  const [dayPublished, setDayPublished] = useState(null)
  const [costDays, setCostDays] = useState(calculateCostForPublisDay(7))

  useEffect(() => {
    setYears(yearRange.reverse())
  }, [])

  const transitionShowStep2 = useTransition(showStep2, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    },
  })

  const transitionShowStep3 = useTransition(showStep3, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 200,
    },
  })

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files
    const selectedFilesArray = Array.from(selectedFiles)
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file)
    })
    setSelectedImages((previousImages) => previousImages.concat(imagesArray))
  }

  const deleteHandler = (image) => {
    setSelectedImages(selectedImages.filter((e) => e !== image))
    URL.revokeObjectURL(image)
  }

  const getModels = async (brand) => {
    setModels(null)
    setShowCarSpecs(false)
    const res = await carService.getModels({ brand_name: brand })
    setModels(res.data.data.car_brands)
    setFormData((pre) => ({ ...pre, car_brand: brand }))
  }

  const setModel = (model_name) => {
    setFormData((pre) => ({ ...pre, car_model: model_name }))
    setVariants(null)
  }

  const getVariant = async (manufacturing_date) => {
    setVariants(null)
    setShowCarSpecs(false)
    const response = await carService.getVariants({
      model_name: formData.car_model,
      manufacturing_date: Number(manufacturing_date),
    })
    setVariants(response.data.data.car_variants)
    setFormData((pre) => ({ ...pre, manufacturing_date: Number(manufacturing_date) }))
  }

  const getCarSpecs = async (variant_name) => {
    const response = await carService.getCarSpecs({
      variant_name: variant_name,
      manufacturing_date: formData.manufacturing_date,
    })
    setFormData((pre) => ({ ...pre, car_variant: variant_name }))
    setFormData((pre) => ({ ...pre, ...response.data.data.car_specs }))
    setShowCarSpecs(true)
  }

  const setCityToForm = async (city) => {
    setDistricts(null)
    await getDistricts(city)
    setFormData((pre) => ({ ...pre, city: city }))
  }

  const getCities = async () => {
    const response = await carService.getCities()
    const cities = response.data.data.cities
    setCities(cities)
    setCityToForm(cities[0])
  }

  const setDistrictToForm = (district) => {
    setFormData((pre) => ({ ...pre, district: district }))
  }

  const getDistricts = async (city) => {
    const response = await carService.getDistrict({ city_name: city })
    const districts = response.data.data.districts
    setDistricts(districts)
    setDistrictToForm(districts[0])
  }

  const setOutColorToForm = (out_color) => {
    setFormData((pre) => ({ ...pre, out_color: out_color }))
  }

  const getOutColors = () => {
    const options = queryTable.out_color.options
    const out_colors = Object.keys(options).map((key) => options[key].value)
    setOutColors(out_colors)
    setOutColorToForm(out_colors[0])
  }

  const getOrigins = () => {
    const options = queryTable.car_origin.options
    const car_origin = Object.values(options).filter((value) => typeof value === 'string')
    setOrigins(car_origin)
    setFormData((pre) => ({ ...pre, car_origin: car_origin[0] }))
  }

  const getStatus = () => {
    const options = queryTable.car_status.options
    const status = Object.values(options).filter((value) => typeof value === 'string')
    setStatus(status)
    setFormData((pre) => ({ ...pre, car_status: status[0] }))
  }

  const handleNextStep2 = () => {
    setShowStep1(false)
    setShowStep2(true)
    getCities()
    getDistricts()
    getOutColors()
    getOrigins()
    getStatus()
    setDayPublished([7, 15, 20, 30])
  }

  const handlePost = async () => {
    if (formData.selling_price > 99999) {
      showToastError({ message: 'Your selling price must be lower than 99999' })
      return
    }

    if (formData.selling_price === 0) {
      showToastError({ message: 'Please fill your selling price' })
      return
    }

    const newFormData = new FormData()
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        newFormData.append(key, formData[key])
      }
    }

    let fileInput = document.getElementById('fileInput')
    if (fileInput && fileInput.files.length > 0) {
      for (let i = 0; i < fileInput.files.length; i++) {
        newFormData.append('car_galleries', fileInput.files[i])
      }
    }

    dispatch(setLoading(true))
    try {
      const response = await postsService.createPost({ data: newFormData })

      if (response.status === 201) {
        const newPost = response.data.data.newCarPost
        newPost.car.car_galleries = response.data.data.carGalleries
        dispatch(addPost(newPost))
        navigate('/posts/' + newPost.car.car_slug)
      }

      console.log(response)
    } catch (error) {
      showToastError({ message: 'Failed to add post' })
      console.error(error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  let rteObj
  function created() {
    const instance = rteObj
    rteObj.contentModule.getDocument().addEventListener('keydown', (e) => {
      if (e.key === 's' && e.ctrlKey === true) {
        e.preventDefault()
        instance.updateValue()
        const text = formatContent(instance.value)
        setFormData((pre) => ({ ...pre, description: text }))
      }
    })
  }

  function saveDescription() {
    const instance = rteObj
    instance.updateValue()
    const text = formatContent(instance.value)
    console.log(text)
    setFormData((pre) => ({ ...pre, description: text }))
  }

  return (
    brands.car_brands && (
      <>
        <div className='m-2 md:mx-10 mt-24 md:mt-10 p-2 '>
          <Breadcrumbs />
        </div>
        <div className='m-2 mt-10 md:mt-4 md:mx-10 p-2 md:p-10 bg-white rounded-3xl'>
          <div className='flex justify-between items-center'>
            <Header category='Page' title='Add Car Post' />
          </div>
          <div>
            <div className='w-full'>
              <UploadImage selectedImages={selectedImages} onSelectFile={onSelectFile} deleteHandler={deleteHandler} />
            </div>
            <div className='flex h-full flex-1 pt-10 relative' style={{ scrollbarWidth: 'none' }}>
              {/* Step 01 */}
              <div className={`flex h-auto flex-col outline-none w-full ${showStep1 ? 'opacity-100' : 'opacity-0'}`}>
                <h2 className='text-2xl font-semibold mb-4'>Step 1</h2>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                  <DropDown label='Brands' options={brands.car_brands} onSelect={getModels} className='z-50' />
                  <DropDown label='Models' options={models} className='z-[49]' onSelect={setModel} />
                  <DropDown label='Manufacturing Date' options={years} className='z-[48]' onSelect={getVariant} />
                  <DropDown label='Car Variants' options={variants} className='z-[47]' onSelect={getCarSpecs} />

                  {showCarSpecs && (
                    <>
                      <DropDown
                        label='Body Type'
                        options={[formData.body_type]}
                        onSelect={() => {}}
                        className='z-[46]'
                      />
                      <DropDown
                        label='Transmission'
                        options={[formData.transmission]}
                        onSelect={() => {}}
                        className='z-[46]'
                      />
                      <DropDown
                        label='Drivetrain'
                        options={[formData.drivetrain]}
                        onSelect={() => {}}
                        className='z-[46]'
                      />
                      <DropDown
                        label='Engine'
                        options={[formData.engine_type]}
                        onSelect={() => {}}
                        className='z-[46]'
                      />
                      <DropDown
                        label='Seatings'
                        options={[formData.total_seating]}
                        onSelect={() => {}}
                        className='z-[46]'
                      />
                      <DropDown label='Doors' options={[formData.total_doors]} onSelect={() => {}} className='z-[46]' />
                    </>
                  )}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-4 justify-end items-center pt-10 gap-4 rounded-2xl'>
                  <div className='hidden md:block'></div>
                  <div className='hidden md:block'></div>
                  <div className='hidden md:block'></div>
                  <button
                    className='rounded-full bg-[#f97316] text-[#F5F7FF] w-full p-3  hover:bg-opacity-80'
                    // disabled={!showCarSpecs}
                    onClick={() => handleNextStep2()}
                  >
                    Next
                  </button>
                </div>
              </div>
              {/* End Step 01 */}
              {/* Step 02 */}
              {transitionShowStep2(
                (style, item) =>
                  item && (
                    <animated.div
                      style={style}
                      className='absolute left-0 top-0 z-[100] h-fit w-auto -mx-10 right-0 bg-white pt-10 pb-10 md:pb-0 px-10 rounded-br-[16px] rounded-bl-[16px]'
                    >
                      <div className='flex h-auto flex-col outline-none w-full'>
                        <h2 className='text-2xl font-semibold mb-4'>Step 2</h2>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                          <DropDown label='City' options={cities} onSelect={setCityToForm} className='z-50' />
                          <DropDown
                            label='District'
                            options={districts}
                            onSelect={setDistrictToForm}
                            className='z-[49]'
                          />
                          <DropDown
                            label='Origin'
                            options={origins}
                            className='z-[48]'
                            onSelect={(car_origin) => setFormData((pre) => ({ ...pre, car_origin: car_origin }))}
                          />
                          <DropDown
                            label='Out Color'
                            options={outColors}
                            className='z-[47]'
                            onSelect={setOutColorToForm}
                          />
                          <DropDown
                            label='Status'
                            options={status}
                            onSelect={(status) => {
                              if (String(status).toLowerCase() === 'new') {
                                setShowMileage(false)
                              } else setShowMileage(true)
                              setFormData((pre) => ({ ...pre, car_status: status }))
                            }}
                            className='z-[46]'
                          />
                          {showMileage && (
                            <Input
                              label='Mileage'
                              name='car_mileage'
                              placeholder='Ex: 2000000'
                              type='number'
                              min={0}
                              max={9999999}
                              handleChange={(car_mileage) =>
                                setFormData((pre) => ({ ...pre, car_mileage: Number(car_mileage) }))
                              }
                              className='z-[45]'
                            />
                          )}

                          <Input
                            label='Selling price (million VND)'
                            name='selling_price'
                            placeholder='Ex: 2000000000'
                            type='number'
                            min={0}
                            handleChange={(selling_price) =>
                              setFormData((pre) => ({ ...pre, selling_price: Number(selling_price) }))
                            }
                            className='z-[43]'
                          />
                          <DropDown
                            label='Days published'
                            options={dayPublished}
                            onSelect={(date) => {
                              setFormData((pre) => ({ ...pre, date_published: date }))
                              setCostDays(Number(date) * 2000)
                            }}
                            className='z-[44]'
                          />
                          <div></div>
                          <div></div>
                          <div></div>
                          <div className='text-right text-sm font-semibold italic'>
                            Cost: {Number(costDays).toLocaleString('en-US')} VND
                          </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 py-10 rounded-2xl'>
                          <button
                            className='rounded-full bg-[#f97316] text-[#F5F7FF]  p-3 w-full  hover:bg-opacity-80'
                            onClick={() => {
                              setShowStep1(true)
                              setShowStep2(false)
                              setShowMileage(true)
                            }}
                          >
                            Back
                          </button>
                          <div className='hidden md:block'></div>
                          <div className='hidden md:block'></div>
                          <button
                            className='rounded-full bg-[#f97316] text-[#F5F7FF]  p-3 w-full  hover:bg-opacity-80'
                            onClick={() => {
                              setShowStep3(true)
                              setShowStep2(false)
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </animated.div>
                  )
              )}
              {/* End Step 02 */}
              {/* Step 03 */}
              {transitionShowStep3(
                (style, item) =>
                  item && (
                    <animated.div
                      style={{ ...style, width: '-webkit-fill-available' }}
                      className='absolute left-0 top-0 z-[101] h-fit -mx-10 bg-white pt-10 pb-10 md:pb-0 px-10 rounded-br-[16px] rounded-bl-[16px]'
                    >
                      <div className='flex h-auto flex-col outline-none w-full'>
                        <h2 className='text-2xl font-semibold mb-4'>Step 3</h2>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 relative'>
                          <div className='col-span-4 ' id='edittor'>
                            <RichTextEditorComponent
                              toolbarSettings={TOOLBAR_SETTINGS}
                              height='300px'
                              ref={(richtexteditor) => {
                                rteObj = richtexteditor
                              }}
                              created={created.bind(this)}
                            >
                              <p>Your description here</p>

                              <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                            </RichTextEditorComponent>
                            <button
                              className='rounded-[16px] z-50 bg-[#f97316] text-[#F5F7FF] absolute bottom-2 left-2  px-4 py-3 w-fit  hover:bg-opacity-80'
                              onClick={() => {
                                saveDescription()
                              }}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-4 gap-4 py-10 rounded-2xl'>
                          <button
                            className='rounded-full bg-[#f97316] text-[#F5F7FF]  p-3 w-full  hover:bg-opacity-80'
                            onClick={() => {
                              setShowStep2(true)
                              setShowStep3(false)
                            }}
                          >
                            Back
                          </button>
                          <div className='hidden md:block'></div>
                          <div className='hidden md:block'></div>
                          <button
                            className='rounded-full bg-[#f97316] text-[#F5F7FF]  p-3 w-full  hover:bg-opacity-80'
                            onClick={() => {
                              handlePost()
                            }}
                          >
                            Post
                          </button>
                        </div>
                      </div>
                    </animated.div>
                  )
              )}
              {/* End Step 03 */}
            </div>
          </div>
        </div>
      </>
    )
  )
}

export default AddPost
