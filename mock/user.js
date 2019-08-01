
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          message: 'Account and password are incorrect.'
        }
      }

      return token
    }
  },

  // get user info
  {
    url: '/user/info',
    type: 'get',
    response: _ => {
      const info = users['admin-token']

      // mock error
      if (!info) {
        return {
          message: 'Login failed, unable to get user details.'
        }
      }

      return info
    }
  }

]
