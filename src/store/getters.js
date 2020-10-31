/**
 * getters和组件的computed类似
 * 方便直接生成一些可以直接用的数据
 * 当数据需要在多个组件中使用,就可以使用getters来做
 *
 */
//取state中的user对象
export const user = state => state.user

export const token = state => state.token
export const keyword = state => state.keyword