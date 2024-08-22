export const getNumberFromId = (id) => {
  const numbers = [1, 2, 3, 4]
  return numbers[(id - 1) % 4] // id - 1 để đảm bảo id từ 1 đến 508 sẽ map đúng số 1, 2, 3, 4
}

export const getTopModelCar = ({ topNumber, list }) => {
  const carModels = list.map((post) => post.car.car_model)

  const modelCounts = carModels.reduce((acc, model) => {
    acc[model] = (acc[model] || 0) + 1
    return acc
  }, {})

  const topModels = Object.entries(modelCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, topNumber)
    .map(([model]) => model)

  return topModels
}

export const getTopBrandCar = ({ topNumber, list }) => {
  const carModels = list.map((post) => post.car.car_brand)

  const modelCounts = carModels.reduce((acc, model) => {
    acc[model] = (acc[model] || 0) + 1
    return acc
  }, {})

  const topModels = Object.entries(modelCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, topNumber)
    .map(([model]) => model)

  return topModels
}

export const calculateBrandPercentages = (posts) => {
  const brandCounts = posts.reduce((acc, post) => {
    const brand = post.car.car_brand
    acc[brand] = (acc[brand] || 0) + 1
    return acc
  }, {})

  const total = posts.length
  const percentages = Object.keys(brandCounts).map((brand) => ({
    x: brand,
    y: ((brandCounts[brand] / total) * 100).toFixed(2),
    text: `${((brandCounts[brand] / total) * 100).toFixed(2)}%`,
  }))

  return percentages
}

export const calculateCityPercentages = (posts) => {
  const cityCounts = posts.reduce((acc, post) => {
    const city = post.car.city
    acc[city] = (acc[city] || 0) + 1
    return acc
  }, {})

  const total = Object.values(cityCounts).reduce((sum, count) => sum + count, 0)

  return Object.keys(cityCounts).map((city) => ({
    x: city,
    y: ((cityCounts[city] / total) * 100).toFixed(2),
    text: `${((cityCounts[city] / total) * 100).toFixed(2)}%`,
  }))
}

export const calculateFuelPercentages = (posts) => {
  const fuelCounts = posts.reduce((acc, post) => {
    const fuel = post.car.engine_type
    acc[fuel] = (acc[fuel] || 0) + 1
    return acc
  }, {})

  const total = posts.length

  return Object.keys(fuelCounts).map((fuel) => ({
    x: fuel,
    y: ((fuelCounts[fuel] / total) * 100).toFixed(2),
    text: `${((fuelCounts[fuel] / total) * 100).toFixed(2)}%`,
  }))
}

export const calculateBodyTypePercentages = (posts) => {
  const bodyTypeCounts = posts.reduce((acc, post) => {
    const bodyType = post.car.body_type
    acc[bodyType] = (acc[bodyType] || 0) + 1
    return acc
  }, {})

  const total = posts.length

  const percentages = Object.keys(bodyTypeCounts).map((bodyType) => ({
    x: bodyType,
    y: ((bodyTypeCounts[bodyType] / total) * 100).toFixed(2),
    text: `${((bodyTypeCounts[bodyType] / total) * 100).toFixed(2)}%`,
  }))

  return percentages.sort((a, b) => a.y - b.y)
}

export const formatContent = (content) => {
  // Define block-level elements
  const blockElements = ['div', 'p', 'ul', 'ol', 'table', 'tr', 'td', 'th', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']

  // Replace block-level elements with \n
  blockElements.forEach((tag) => {
    const openingTag = new RegExp(`<${tag}[^>]*>`, 'gi')
    const closingTag = new RegExp(`</${tag}>`, 'gi')
    content = content.replace(openingTag, '\n')
    content = content.replace(closingTag, '\n')
  })

  // Handle <li> tags separately to include bullet points or numbers
  content = content.replace(/<ul[^>]*>/gi, '\n').replace(/<\/ul>/gi, '\n')
  content = content.replace(/<ol[^>]*>/gi, '\n').replace(/<\/ol>/gi, '\n')

  // Use bullet points for unordered list items
  content = content.replace(/<li[^>]*>(.*?)<\/li>/gi, '\n• $1')

  // Replace <br> with \n
  content = content.replace(/<br\s*\/?>/gi, '\n')

  // Replace &nbsp; with a single space
  content = content.replace(/&nbsp;/g, ' ')

  // Remove all other HTML tags
  content = content.replace(/<\/?[^>]+(>|$)/g, '')

  // Normalize multiple consecutive newlines
  content = content.replace(/\n\s*\n/g, '\n')

  return content.trim()
}

export const getLocalStorageAcceToken = () => {
  return localStorage.getItem('access_token')
}

export const calculateCostForPublisDay = (dayNumber) => {
  switch (dayNumber) {
    case 7:
      return 14000
    case 15:
      return 30000
    case 20:
      return 40000
    default:
      return 60000
  }
}

export const findObjectDifference = (obj1, obj2) => {
  const differents = Object.keys({ ...obj1, ...obj2 }).reduce((diff, key) => {
    if (obj1[key] != obj2[key] && obj1[key] !== null && obj1[key] !== undefined && obj1[key] !== 'null') {
      diff[key] = { obj1: obj1[key], obj2: obj2[key] }
    }
    return diff
  }, {})

  const obj1Values = {}

  for (const key in differents) {
    if (differents.hasOwnProperty(key)) {
      obj1Values[key] = differents[key].obj1
    }
  }

  return obj1Values
}

export const isObjectEmpty = (objectName) => {
  return objectName && Object.keys(objectName).length === 0 && objectName.constructor === Object
}

export const customersWithCars = (carData) => {
  const customersWithCars = carData.reduce((acc, curr) => {
    const customerId = curr.customer.id

    const customerIndex = acc.findIndex((item) => item.customer.id === customerId)

    if (customerIndex > -1) {
      acc[customerIndex].cars.push(curr.car)
    } else {
      acc.push({
        customer: curr.customer,
        cars: [curr.car],
      })
    }

    return acc
  }, [])

  return customersWithCars
}

export const addCustomerToCar = (carList, carId, newCustomer) => {
  const carIndex = carList.findIndex((car) => car.car === carId)

  if (carIndex !== -1) {
    // Car found, add new customer to the listCustomer array
    const updatedCar = {
      ...carList[carIndex],
      listCustomer: [...carList[carIndex].listCustomer, newCustomer],
    }

    // Return the updated car list
    return [...carList.slice(0, carIndex), updatedCar, ...carList.slice(carIndex + 1)]
  } else {
    // Car not found, create a new car with the new customer
    return [
      ...carList,
      {
        car: carId,
        listCustomer: [newCustomer],
      },
    ]
  }
}
