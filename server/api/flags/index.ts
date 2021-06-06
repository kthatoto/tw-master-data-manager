import getList from './getList'
import create from './create'
import edit from './edit'

export default (app: any) => {
  getList(app, 'get', '/flags')
  create(app, 'post', '/flags')
  edit(app, 'patch', '/flags')
}
