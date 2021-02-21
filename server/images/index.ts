import getList from './getList'
import createImage from './createImage'
import move from './move'
import createDirectory from './createDirectory'
import deleteObject from './deleteObject'

export default (app: any) => {
  getList(app, 'get', '/images')
  createImage(app, 'post', '/images')
  move(app, 'patch', '/images')
  createDirectory(app, 'post', '/images/directories')
  deleteObject(app, 'patch', '/images/delete')
}
