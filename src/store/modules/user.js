import {getInfo, login} from "@/api/user";
import {getToken, removeToken, setToken} from "@/utils/auth";
import {resetRouter} from "@/router";

const state = {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
}

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

const actions = {
    // user login
    login({commit}, userInfo) {
        const {username, password} = userInfo
        return new Promise((resolve, reject) => {
            login({username: username.trim(), password: password}).then(response => {
                commit('SET_TOKEN', response.token)
                setToken(response.token)
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    getInfo({commit}) {
        return new Promise((resolve, reject) => {
            getInfo().then(response => {
                if (!response) {
                    reject('Verification failed, please Login again.')
                }

                // roles must be a non-empty array
                if (!response.roles || response.roles.length <= 0) {
                    reject('getInfo: roles must be a non-null array!')
                }

                commit('SET_ROLES', response.roles)
                commit('SET_NAME', response.name)
                commit('SET_AVATAR', response.avatar)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // user logout
    logout({commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resetRouter()
            resolve()
        })
    },

    // remove token
    resetToken({commit}) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
