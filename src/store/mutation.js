import * as types from './mutation-types'

const mutations = {
    //设置用户
    [types.SET_USER](state,user){
        state.user = user
    },
    //设置Token
    [types.SET_TOKEN](state,token){
        state.token = token
        //存入localStorage
        localStorage.setItem('Authorization',token)
    }
}
export default mutations