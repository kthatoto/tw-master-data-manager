import getList from './getList'
import createImage from './createImage'
import move from './move'
import deleteObject from './deleteObject'

export default (app: any) => {
  getList(app, 'get', '/images')
  createImage(app, 'post', '/images')
  move(app, 'patch', '/images')
  deleteObject(app, 'patch', '/images/delete')
}
