import fs from 'fs'

import getList from './getList'
// import create from './create'
import createDirectory from './createDirectory'
import moveDirectory from './moveDirectory'
import deleteObject from './deleteObject'

export default (app: any) => {
  getList(app, 'get', '/tiles')
  // create(app, 'post', '/tiles')
  createDirectory(app, 'post', '/tiles/directories')
  moveDirectory(app, 'patch', '/tiles/directories')
  deleteObject(app, 'patch', '/tiles/delete')
}
