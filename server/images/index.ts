import getList from './getList'
import create from './create'
import move from './move'
import deleteObject from './deleteObject'

export default (app: any) => {
  getList(app, 'get', '/images')
  create(app, 'post', '/images')
  move(app, 'patch', '/images')
  deleteObject(app, 'patch', '/images/delete')
}
