import getList from './getList'
import createObjekt from './createObjekt'
import createDirectory from './createDirectory'
import editObjekt from './editObjekt'
import moveDirectory from './moveDirectory'
import deleteObject from './deleteObject'

export default (app: any) => {
  getList(app, 'get', '/objekts')
  createObjekt(app, 'post', '/objekts')
  createDirectory(app, 'post', '/objekts/directories')
  editObjekt(app, 'patch', '/objekts')
  moveDirectory(app, 'patch', '/objekts/directories')
  deleteObject(app, 'patch', '/objekts/delete')
}
