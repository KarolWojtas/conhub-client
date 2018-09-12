import { IUserState, USER_STATE, userReducer } from "src/app/redux/user-store";
import { combineReducers} from 'redux'

export interface IMainState{
    userState: IUserState
} 
export const MAIN_STATE: IMainState = {
    userState: USER_STATE
}
export const rootReducer = combineReducers<IMainState>({
    userState: userReducer
})