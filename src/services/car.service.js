import axiosClient from './axios-client'
import { GET_BRANDS, GET_CITIES, GET_DISTRICT, GET_MODELS, GET_SPECS, GET_VARIANTS } from './endpoint'

export const carService = {
  getBrands: () => {
    return axiosClient.post(GET_BRANDS)
  },
  getModels: ({ brand_name }) => {
    return axiosClient.post(GET_MODELS, { brand_name: brand_name })
  },
  getVariants: ({ model_name, manufacturing_date }) => {
    return axiosClient.post(GET_VARIANTS, {
      model_name: model_name,
      manufacturing_date: manufacturing_date,
    })
  },
  getCarSpecs: ({ variant_name, manufacturing_date }) => {
    return axiosClient.post(GET_SPECS, {
      variant_name: variant_name,
      manufacturing_date: manufacturing_date,
    })
  },
  getCities: () => {
    return axiosClient.post(GET_CITIES)
  },
  getDistrict: ({ city_name }) => {
    return axiosClient.post(GET_DISTRICT, { city_name: city_name })
  },
}
