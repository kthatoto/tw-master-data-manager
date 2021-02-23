import getList from './getList'
import createItem from './createItem'
import createDirectory from './createDirectory'
import editItem from './editItem'
import moveDirectory from './moveDirectory'
import deleteObject from './deleteObject'

export default (app: any) => {
  getList(app, 'get', '/items')
  createItem(app, 'post', '/items')
  createDirectory(app, 'post', '/items/directories')
  editItem(app, 'patch', '/items')
  moveDirectory(app, 'patch', '/items/directories')
  deleteObject(app, 'patch', '/items/delete')
}
