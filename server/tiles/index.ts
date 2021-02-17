import fs from 'fs'

import getList from './getList'
import createTile from './createTile'
import createDirectory from './createDirectory'
import moveDirectory from './moveDirectory'
import deleteObject from './deleteObject'

export default (app: any) => {
  getList(app, 'get', '/tiles')
  createTile(app, 'post', '/tiles')
  createDirectory(app, 'post', '/tiles/directories')
  moveDirectory(app, 'patch', '/tiles/directories')
  deleteObject(app, 'patch', '/tiles/delete')
}
