import fs from 'fs'

import getList from './getList'
// import create from './create'
// import move from './move'
// import createDirectory from './createDirectory'
// import deleteObject from './deleteObject'

export default (app: any) => {
  getList(app, 'get', '/tiles')
  // create(app, 'post', '/tiles')
  // move(app, 'patch', '/tiles')
  // createDirectory(app, 'post', '/tiles/directories')
  // deleteObject(app, 'patch', '/tiles/delete')
}
