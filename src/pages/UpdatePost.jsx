import React, { useEffect, useState } from 'react'
import UploadImage from '../components/Upload'
import DropDown from '../components/DropDown'
import useGetData from '../hooks/use-get-data'
import { carService } from '../services/car.service'
import { showToastError, showToastSuccess, yearRange } from '../helpers'
import {
  HtmlEditor,
  Image,
  Inject,
  Link,
  QuickToolbar,
  RichTextEditorComponent,
  Toolbar,
} from '@syncfusion/ej2-react-richtexteditor'
import { findObjectDifference, formatContent, getLocalStorageAcceToken } from '../utils'
import { useAppDispatch, useAppSelector } from '../hooks/hook'
import { setLoading } from '../store/reducers/app-slice'
import { Input } from './AddPost'
import { postsService } from '../services/post.service'
import { selectQueryTable } from '../store/reducers/post-slice'

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

const UpdatePost = ({ data, parentData, handleOffModal, setPost }) => {
  const dispatch = useAppDispatch()
  const { brands, queryTable } = useGetData()
  const query = useAppSelector(selectQueryTable)
  const [showMileage, setShowMileage] = useState(true)
  const [selectedImages, setSelectedImages] = useState([])
  const [models, setModels] = useState(null)
  const [variants, setVariants] = useState(null)
  const [formData, setFormData] = useState(data)
  const [cities, setCities] = useState(null)
  const [districts, setDistricts] = useState(null)
  const [outColors, setOutColors] = useState(null)
  const [origins, setOrigins] = useState(null)
  const [status, setStatus] = useState(null)
  const [years, setYears] = useState(null)

  useEffect(() => {
    if (query !== null) {
      setYears(yearRange.reverse())
      setModel(data.car_model)
      getVariant(data.manufacturing_date)
      getCities()
      getOrigins()
      getOutColors()
      getStatus()
    }
  }, [query])

  useEffect(() => {
    if (variants === null) {
      resetCarSpecForm()
    }
  }, [variants])
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

  const resetCarSpecForm = () => {
    setFormData((pre) => ({ ...pre, body_type: '' }))
    setFormData((pre) => ({ ...pre, transmission: '' }))
    setFormData((pre) => ({ ...pre, drivetrain: '' }))
    setFormData((pre) => ({ ...pre, engine_type: '' }))
    setFormData((pre) => ({ ...pre, total_seating: '' }))
    setFormData((pre) => ({ ...pre, total_doors: '' }))
  }

  const getModels = async (brand) => {
    setModels(null)
    resetCarSpecForm()
    const res = await carService.getModels({ brand_name: brand })
    setModels(res.data.data.car_brands)
  }

  const setModel = (model_name) => {
    setFormData((pre) => ({ ...pre, car_model: model_name }))
    setVariants(null)
  }

  const getVariant = async (manufacturing_date) => {
    setVariants(null)
    resetCarSpecForm()
    const response = await carService.getVariants({
      model_name: formData.car_model,
      manufacturing_date: Number(manufacturing_date),
    })

    setFormData((pre) => ({ ...pre, manufacturing_date: manufacturing_date }))

    if (response.data.data.car_variants.length > 0) {
      setVariants(response.data.data.car_variants)
    }
  }

  const getCarSpecs = async (variant_name) => {
    const response = await carService.getCarSpecs({
      variant_name: variant_name,
      manufacturing_date: formData.manufacturing_date,
    })
    setFormData((pre) => ({ ...pre, car_variant: variant_name }))
    setFormData((pre) => ({ ...pre, ...response.data.data.car_specs }))
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
  }

  const setDistrictToForm = (district) => {
    setFormData((pre) => ({ ...pre, district: district }))
  }

  const getDistricts = async (city) => {
    const response = await carService.getDistrict({ city_name: city })
    const districts = response.data.data.districts
    setDistricts(districts)
  }

  const setOutColorToForm = (out_color) => {
    setFormData((pre) => ({ ...pre, out_color: out_color }))
  }

  const getOutColors = () => {
    const options = queryTable.out_color.options
    const out_colors = Object.keys(options).map((key) => options[key].value)
    setOutColors(out_colors)
  }

  const getOrigins = () => {
    const options = queryTable.car_origin.options
    const car_origin = Object.values(options).filter((value) => typeof value === 'string')
    setOrigins(car_origin)
  }

  const getStatus = () => {
    const options = queryTable.car_status.options
    const status = Object.values(options).filter((value) => typeof value === 'string')
    setStatus(status)
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

    const findObjectDifferences = findObjectDifference(formData, data)

    const newFormData = new FormData()
    for (let key in findObjectDifferences) {
      if (findObjectDifferences.hasOwnProperty(key)) {
        newFormData.append(key, findObjectDifferences[key])
      }
    }

    const fileInput = document.getElementById('fileInputUpdate')
    if (fileInput && fileInput.files.length > 0) {
      for (let i = 0; i < fileInput.files.length; i++) {
        newFormData.append('car_galleries', fileInput.files[i])
      }
    }

    const instance = rteObj
    instance.updateValue()
    const text = formatContent(instance.value)
    if (text !== data.description) {
      newFormData.append('description', text)
    }

    dispatch(setLoading(true))
    try {
      const response = await postsService.updatePost({
        post_id: parentData.id,
        data: newFormData,
        access_token: getLocalStorageAcceToken(),
      })
      if (response.status === 200) {
        const newPost = response.data.data.updatedCar
        showToastSuccess({ message: 'Update post success!' })
        handleOffModal()
        setPost(newPost.car)
      }
    } catch (error) {
      showToastError({ message: 'Failed to add post' })
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

  return (
    brands.car_brands && (
      <div className='overflow-auto px-2'>
        <div className='w-full'>
          <UploadImage
            id='fileInputUpdate'
            selectedImages={selectedImages}
            onSelectFile={onSelectFile}
            deleteHandler={deleteHandler}
          />
        </div>
        <div className='flex h-full flex-1 pt-10 relative' style={{ scrollbarWidth: 'none' }}>
          <div className={`flex h-auto flex-col outline-none w-full opacity-100`}>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
              <DropDown
                label='Brands'
                options={brands.car_brands}
                onSelect={getModels}
                className='z-50'
                value={data.car_brand}
              />
              <DropDown label='Models' options={models} className='z-[49]' onSelect={setModel} value={data.car_model} />
              <DropDown
                label='Manufacturing Date'
                options={years}
                className='z-[48]'
                onSelect={getVariant}
                value={data.manufacturing_date}
              />
              <DropDown
                label='Car Variants'
                options={variants}
                className='z-[47]'
                onSelect={getCarSpecs}
                value={data.car_variant}
              />
              <DropDown label='Body Type' options={[formData.body_type]} onSelect={() => {}} className='z-[46]' />
              <DropDown label='Transmission' options={[formData.transmission]} onSelect={() => {}} className='z-[45]' />
              <DropDown label='Drivetrain' options={[formData.drivetrain]} onSelect={() => {}} className='z-[44]' />
              <DropDown label='Engine' options={[formData.engine_type]} onSelect={() => {}} className='z-[43]' />
              <DropDown label='Seatings' options={[formData.total_seating]} onSelect={() => {}} className='z-[42]' />
              <DropDown label='Doors' options={[formData.total_doors]} onSelect={() => {}} className='z-[41]' />
              <DropDown label='City' options={cities} onSelect={setCityToForm} className='z-[40]' value={data.city} />
              <DropDown
                label='District'
                options={districts}
                onSelect={setDistrictToForm}
                className='z-[39]'
                value={data.district}
              />
              <DropDown
                label='Origin'
                options={origins}
                className='z-[38]'
                onSelect={(car_origin) => setFormData((pre) => ({ ...pre, car_origin: car_origin }))}
                value={data.car_origin}
              />
              <DropDown
                label='Out Color'
                options={outColors}
                className='z-[37]'
                onSelect={setOutColorToForm}
                value={data.out_color}
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
                className='z-[36]'
                value={data.car_status}
              />
              {(data.car_status.toLowerCase() === 'old' || showMileage) && (
                <Input
                  label='Mileage'
                  name='car_mileage'
                  placeholder='Ex: 2000000'
                  type='number'
                  min={0}
                  max={9999999}
                  handleChange={(car_mileage) => setFormData((pre) => ({ ...pre, car_mileage: Number(car_mileage) }))}
                  className='z-[35]'
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
                className='z-[34]'
                value={formData.selling_price ?? data.selling_price}
              />
              {/* <DropDown
                label='Days published'
                options={dayPublished}
                onSelect={(date) => {
                  setFormData((pre) => ({ ...pre, days_publish: date }))
                  setCostDays(Number(date) * 2000)
                }}
                className='z-[33]'
                value={parentData.days_displayed}
              /> */}
              <div className='col-span-4 ' id='edittor'>
                <RichTextEditorComponent
                  toolbarSettings={TOOLBAR_SETTINGS}
                  height='300px'
                  ref={(richtexteditor) => {
                    rteObj = richtexteditor
                  }}
                  created={created.bind(this)}
                  placeholder='Your description here'
                >
                  <>{data.description}</>

                  <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                </RichTextEditorComponent>
              </div>
              <div className='col-span-4'>
                <div className='w-full z-[1000] '>
                  <div className='gap-3 ml-auto w-fit'>
                    <button
                      className='rounded-xl w-[140px] p-4 mr-2 text-[#6e7071] bg-[#d5d3d3] bg-opacity-25 flex-1 text-lg '
                      onClick={() => handleOffModal()}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handlePost()}
                      className='rounded-xl w-[140px] p-4 text-[#EDF5FF] flex-1 text-lg bg-[#f97316]'
                    >
                      Update Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default UpdatePost
