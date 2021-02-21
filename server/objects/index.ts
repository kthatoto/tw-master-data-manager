import getList from './getList'
import createObject from './createObject'
import createDirectory from './createDirectory'
import editObject from './editObject'
import moveDirectory from './moveDirectory'
import deleteObject from './deleteObject'

export default (app: any) => {
  getList(app, 'get', '/objects')
  createObject(app, 'post', '/objects')
  createDirectory(app, 'post', '/objects/directories')
  editObject(app, 'patch', '/objects')
  moveDirectory(app, 'patch', '/objects/directories')
  deleteObject(app, 'patch', '/objects/delete')
}
