import request from '@/utils/request'

export function enroll(params) {
  /*注册 */
  return request({
    url: '/User/register',
    method: 'post',
    params: {
      name: params.name,
      password: params.password,
      mode:params.mode
    }
  })
}


