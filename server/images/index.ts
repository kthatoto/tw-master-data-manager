import fs from 'fs'

import getList from './getList'
import create from './create'
import move from './move'
import createDirectory from './createDirectory'
import deleteObject from './deleteObject'

export default (app: any) => {
  getList(app, 'get', '/images')
  create(app, 'post', '/images')
  move(app, 'patch', '/images')
  createDirectory(app, 'post', '/images/directories')
  deleteObject(app, 'patch', '/images/delete')
}
