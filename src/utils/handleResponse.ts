import { Message } from 'element-ui'

export default (res: any, successMessage: string, fetchResources: Function, flagManager: any) => {
  let result: boolean = false
  if (res.data && res.data.message) {
    Message({
      message: res.data.message,
      type: 'error'
    })
  } else {
    Message({
      message: successMessage,
      type: 'success'
    })
    fetchResources()
    result = true
  }
  flagManager.flag = false
  return result
}
