import getList from './getList'
import createItem from './createItem'
import editItem from './editItem'
import moveDirectory from './moveDirectory'
import deleteObject from './deleteObject'

export default (app: any) => {
  getList(app, 'get', '/items')
  createItem(app, 'post', '/items')
  editItem(app, 'patch', '/items')
  moveDirectory(app, 'patch', '/items/directories')
  deleteObject(app, 'patch', '/items/delete')
}
