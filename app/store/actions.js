import * as types from './mutation-types'
import Promise from 'Promise'

// export const login = ({ commit }, body) => { 
//   return auth.login(body).then((user) => {
//     commit(types.AUTH_LOGIN, { user });
//     return Promise.resolve(user);
//   }).catch(err => {
//     console.log(err);
//   })
// }

// export const signIn = ({ commit }, body) => {
//   return auth.signIn(body).then((user) => {
//     console.log(user);
//     commit(types.AUTH_SIGN_IN);
//     return Promise.resolve(user);
//   }).catch(err => {
//     console.log(err);
//   })
// }