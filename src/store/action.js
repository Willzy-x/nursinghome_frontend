import * as types from './mutation-types'

//设置用户方法
export const setUser = function({commit},user){
    //提交给mutation中的types.SET_USER方法,去设置用户
    commit(types.SET_USER,user)
}

//设置Token
export const setToken = function ({commit},token) {
    commit(types.SET_TOKEN,token)
}