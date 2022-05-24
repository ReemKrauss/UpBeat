export const storageService = {
  query,
  get,
  post,
  put,
  remove,
  saveTestData,
}

const testData = [
  {
    _id: 't101',
    name: 'Medical Kit',
    price: 123,
    labels: [
      {
        name: 'Doll',
        _id: 6,
      },
      {
        name: 'Box game',
        _id: 3,
      },
      {
        name: 'Art',
        _id: 4,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/891/main/98ce-c466-a50022-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't102',
    name: 'Red Karting Racing',
    price: 379,
    labels: [
      {
        name: 'On wheels',
        _id: 1,
      },
      {
        name: 'Boys',
        _id: 9,
      },
      {
        name: 'Outdoor',
        _id: 8,
      },
    ],
    createdAt: 1631031801011,
    inStock: false,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/437/main/b2b5-acde-310-2031-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't103',
    name: 'Bunny Shaped wooden vehicle',
    price: 419,
    labels: [
      {
        name: 'On wheels',
        _id: 1,
      },
      {
        name: 'Boys',
        _id: 9,
      },
      {
        name: 'Girls',
        _id: 10,
      },
      {
        name: 'Outdoor',
        _id: 8,
      },
    ],
    createdAt: 1631031801011,
    inStock: false,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/242/main/a83c-f182-TL8591-001-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't104',
    name: 'Balck Balanced bicycles',
    price: 225,
    labels: [
      {
        name: 'On wheels',
        _id: 1,
      },
      {
        name: 'Boys',
        _id: 9,
      },
      {
        name: 'Girls',
        _id: 10,
      },
      {
        name: 'Outdoor',
        _id: 8,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/533/main/234e-e0ce-6073-1-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't105',
    name: 'Pink wooden kitchen with accessories',
    price: 319,
    labels: [
      {
        name: 'Doll',
        _id: 6,
      },
      {
        name: 'Girls',
        _id: 10,
      },
      {
        name: 'Accessories',
        _id: 2,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/280/main/ed6f-c3a0-50157-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't106',
    name: 'Electric kids kitchen with accessories',
    price: 398,
    labels: [
      {
        name: 'Doll',
        _id: 6,
      },
      {
        name: 'Girls',
        _id: 10,
      },
      {
        name: 'Accessories',
        _id: 2,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/787/main/9420-c71d-avi-1-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't107',
    name: 'Designers wooden kids kitchen',
    price: 809,
    labels: [
      {
        name: 'Doll',
        _id: 6,
      },
      {
        name: 'Box game',
        _id: 3,
      },
      {
        name: 'Art',
        _id: 4,
      },
    ],
    createdAt: 1631031801011,
    inStock: false,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/827/main/aaba-2e19-7194-1-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't108',
    name: 'The crazy race',
    price: 109,
    labels: [
      {
        name: 'Boys',
        _id: 9,
      },
      {
        name: 'Girls',
        _id: 10,
      },
      {
        name: 'Box game',
        _id: 3,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1001-2000/1125/main/22a1-cc82-73109-1-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't109',
    name: 'Bow and arrow',
    price: 129,
    labels: [
      {
        name: 'Boys',
        _id: 9,
      },
      {
        name: 'Accessories',
        _id: 2,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/762/main/dc3e-a68c-BN015-2-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't110',
    name: 'Mini magic lab',
    price: 119,
    labels: [
      {
        name: 'Box game',
        _id: 3,
      },
      {
        name: 'Art',
        _id: 4,
      },
      {
        name: 'Puzzle',
        _id: 7,
      },
      {
        name: 'Accessories',
        _id: 2,
      },
      {
        name: 'Baby',
        _id: 5,
      },
      {
        name: 'Boys',
        _id: 9,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/759/main/1f16-00bd-6060-1-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't111',
    name: 'Mini science lab',
    price: 123,
    labels: [
      {
        name: 'Box game',
        _id: 3,
      },
      {
        name: 'Boys',
        _id: 9,
      },
      {
        name: 'Girls',
        _id: 10,
      },
      {
        name: 'Accessories',
        _id: 2,
      },
      {
        name: 'Puzzle',
        _id: 7,
      },
    ],
    createdAt: 1631031801011,
    inStock: false,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/304/main/0d94-a24b-Cat_486340_1759-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't112',
    name: 'Voice enhancment kit',
    price: 123,
    labels: [
      {
        name: 'Box game',
        _id: 3,
      },
      {
        name: 'Art',
        _id: 4,
      },
      {
        name: 'Boys',
        _id: 9,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/321/main/9f20-deb6-Cat_486340_3776-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't113',
    name: 'Natural doll wood mini house',
    price: 347,
    labels: [
      {
        name: 'Doll',
        _id: 6,
      },
      {
        name: 'Art',
        _id: 4,
      },
      {
        name: 'Boys',
        _id: 9,
      },
      {
        name: 'Girls',
        _id: 10,
      },
      {
        name: 'Baby',
        _id: 5,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1001-2000/1079/main/e87c-3e83-56254-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't114',
    name: '3 Stories wooden doll house',
    price: 448,
    labels: [
      {
        name: 'Doll',
        _id: 6,
      },
      {
        name: 'Girls',
        _id: 10,
      },
    ],
    createdAt: 1631031801011,
    inStock: false,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/20/main/3d7d-2f3c-DH603-1-0-2-0-2-400x400.JPG',
  },
  {
    _id: 't115',
    name: '3 geometric wooden towers',
    price: 127,
    labels: [
      {
        name: 'Art',
        _id: 4,
      },
      {
        name: 'Puzzle',
        _id: 7,
      },
      {
        name: 'Boys',
        _id: 9,
      },
      {
        name: 'Girls',
        _id: 10,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1001-2000/1004/main/a819-940b-50567-0-2-0-2-400x400.JPG',
  },
  {
    _id: 't116',
    name: '48 piece building bricks',
    price: 123,
    labels: [
      {
        name: 'Box game',
        _id: 3,
      },
      {
        name: 'Art',
        _id: 4,
      },
      {
        name: 'Boys',
        _id: 9,
      },
      {
        name: 'Accessories',
        _id: 2,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/989/main/056d-f1e1-50383-1-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't117',
    name: 'porcelain tea party set',
    price: 112,
    labels: [
      {
        name: 'Doll',
        _id: 6,
      },
      {
        name: 'Girls',
        _id: 10,
      },
      {
        name: 'Accessories',
        _id: 2,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/889/main/69d1-9c33-a50018-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't118',
    name: 'Plasma ball',
    price: 124,
    labels: [
      {
        name: 'Boys',
        _id: 9,
      },
      {
        name: 'Girls',
        _id: 10,
      },
      {
        name: 'Baby',
        _id: 5,
      },
    ],
    createdAt: 1631031801011,
    inStock: false,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/766/main/74b2-b199-SP001-3-0-2-0-2-400x400.jpg',
  },
  {
    _id: 't119',
    name: 'Monstaer bowling',
    price: 139,
    labels: [
      {
        name: 'Doll',
        _id: 6,
      },
      {
        name: 'Box game',
        _id: 3,
      },
      {
        name: 'Boys',
        _id: 9,
      },
      {
        name: 'Girls',
        _id: 10,
      },
      {
        name: 'Accessories',
        _id: 2,
      },
    ],
    createdAt: 1631031801011,
    inStock: true,
    thumbnail: 'https://toyshop.co.il/image/cache/cache/1-1000/688/main/580c-0113-2210-1-0-2-0-2-400x400.jpg',
  },
]

function query(entityType, delay = 1200) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || []
  if (!entities.length) entities = testData
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // reject('OOOOPs')
      resolve(entities)
    }, delay)
  })
  // return Promise.resolve(entities)
}

function get(entityType, entityId) {
  return query(entityType).then((entities) => entities.find((entity) => entity._id === entityId))
}
function post(entityType, newEntity) {
  newEntity._id = _makeId()
  return query(entityType).then((entities) => {
    entities.push(newEntity)
    _save(entityType, entities)
    return newEntity
  })
}

function saveTestData(entityType, newEntity) {
  // newEntity._id = _makeId()
  _save(entityType, newEntity)
  return newEntity
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    _save(entityType, entities)
    return updatedEntity
  })
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId)
    entities.splice(idx, 1)
    _save(entityType, entities)
  })
}

function _save(entityType, entities) {
  // console.log('entityType FROM SAVE!', entityType)
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}
