import { tassign} from 'tassign'
import {SET_USER, UNSET_USER} from "src/app/redux/user-state-actions";
export interface IUserState{
    loggedInUser: User
}
const EMPTY_USER: User = {id: undefined, username: undefined, avatar: undefined}

export const USER_STATE: IUserState  = {
    loggedInUser: EMPTY_USER
}
export function userReducer(state: IUserState = USER_STATE, action: any): IUserState{
    switch(action.type){
    case SET_USER: return setUser(state,action)
      case UNSET_USER: return unsetUser(state,action)
    default: return state
    }
}
const setUser = (state: IUserState, action: any): IUserState => {
    return tassign(state, {loggedInUser: action.user})
}
const unsetUser = (state: IUserState, action: any): IUserState => {
  return tassign(state, {loggedInUser: EMPTY_USER})
}
export interface User{
    id:number
    username: string
    avatar: string
}
