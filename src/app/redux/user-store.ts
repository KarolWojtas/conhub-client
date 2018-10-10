import { tassign} from 'tassign'
import {
  ADD_CONCERT_INTEREST, REMOVE_ALL_INTERESTS, REMOVE_CONCERT_INTEREST,
  SAVE_VENUES,
  SET_USER,
  UNSET_USER
} from "src/app/redux/user-state-actions";
import {Venue} from "../content/services/venue.service";
import {Concert} from "../content/services/concert.service";
export interface IUserState{
    loggedInUser: User,
    venues: Venue[],
    concertInterestIds: string[]
}
export const EMPTY_USER: User = {id: undefined, username: undefined, avatar: undefined}

export const USER_STATE: IUserState  = {
    loggedInUser: EMPTY_USER,
    venues : [],
    concertInterestIds: []
}
export function userReducer(state: IUserState = USER_STATE, action: any): IUserState{
    switch(action.type){
      case SET_USER: return setUser(state,action)
      case UNSET_USER: return unsetUser(state,action)
      case SAVE_VENUES: return saveVenues(state, action)
      case REMOVE_ALL_INTERESTS: return removeAllInterests(state, action)
      case ADD_CONCERT_INTEREST: return addConcertInterests(state, action)
      case REMOVE_CONCERT_INTEREST: return removeConcertInterest(state, action)
    default: return state
    }
}
const setUser = (state: IUserState, action: any): IUserState => {
    return tassign(state, {loggedInUser: action.user})
}
const unsetUser = (state: IUserState, action: any): IUserState => {
  return tassign(state, {loggedInUser: EMPTY_USER})
}
const saveVenues = (state: IUserState, action : any): IUserState => {
  return tassign(state, {venues: action.venues})
}
const removeAllInterests = (state: IUserState, action: any) => {
  return tassign(state, {concertInterestIds: []})
}
const addConcertInterests = (state: IUserState, action: any) => {
  return tassign(state, {concertInterestIds: [...state.concertInterestIds, action.concertId]})
}
const removeConcertInterest = (state: IUserState, action: any) => {
  return tassign(state, {concertInterestIds: state.concertInterestIds.filter(id => id != action.concertId)})
}
export interface User{
    id:number
    username: string
    avatar: string
}
