const APP = 'api/v1'

const AUTH_SERVICE = 'auth'
const CAR_SERVICE = 'cars'
const POST_SERVICE = 'posts'
const CUSTOMER_SERVICE = 'customers'

// posts
export const GET_POSTS = `${APP}/${POST_SERVICE}/all`
export const GET_POST = `${APP}/${POST_SERVICE}`
export const GET_LATEST_POST = `${APP}/${POST_SERVICE}/latest`
export const QUERY_TABLE = `${APP}/${POST_SERVICE}/query-table`
export const CREATE_POST = `${APP}/${POST_SERVICE}`
export const DELETE_POST = `${APP}/${POST_SERVICE}`
export const UPDATE_POST = `${APP}/${POST_SERVICE}`
export const CREATE_PUBLISH_POST = `${APP}/${POST_SERVICE}/publish`
export const CREATE_DRAFT_POST = `${APP}/${POST_SERVICE}/draft`
export const GET_POSTS_USER = `${APP}/${POST_SERVICE}/customer`

// auth
export const LOGIN = `${APP}/${AUTH_SERVICE}/sign-in`
export const UPDATE_PASSWORD = `${APP}/${AUTH_SERVICE}/change-password`

// customers
export const UPDATE_PROFILE = `${APP}/${CUSTOMER_SERVICE}/me`
export const GET_PROFILE = `${APP}/${CUSTOMER_SERVICE}/me`
export const GET_WISHLIST = `${APP}/${CUSTOMER_SERVICE}/wishlist`
export const ADD_WISHLIST = `${APP}/${CUSTOMER_SERVICE}/wishlist`
export const REMOVE_WISHLIST = `${APP}/${CUSTOMER_SERVICE}/wishlist`

// cars
export const GET_BRANDS = `${APP}/${CAR_SERVICE}/brands`
export const GET_MODELS = `${APP}/${CAR_SERVICE}/models`
export const GET_VARIANTS = `${APP}/${CAR_SERVICE}/variants`
export const GET_SPECS = `${APP}/${CAR_SERVICE}/specs`
export const GET_CITIES = `${APP}/${CAR_SERVICE}/cities`
export const GET_DISTRICT = `${APP}/${CAR_SERVICE}/districts`
