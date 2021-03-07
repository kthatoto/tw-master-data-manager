import getList from './getList'
import create from './create'
import edit from './edit'

export default (app: any) => {
  getList(app, 'get', '/images')
  create(app, 'post', '/images')
  edit(app, 'patch', '/images')
}
