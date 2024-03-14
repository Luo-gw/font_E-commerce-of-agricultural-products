import request from '@/utils/request'

export function login(params) {
  /*登陆 */
  return request({
    url: '/Token/Login',
    method: 'get',
    params: {
      id: params.id,
      password: params.password,
      mode:params.mode
    }
  })
}


