import getList from './getList'
import create from './create'
import edit from './edit'

export default (app: any) => {
  getList(app, 'get', '/tiles')
  create(app, 'post', '/tiles')
  edit(app, 'patch', '/tiles')
}
