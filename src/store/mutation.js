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
    },
    //设置关键字
    [types.SET_KEY_WORD](state,keyword){
        state.keyword = keyword
    }
}
export default mutations