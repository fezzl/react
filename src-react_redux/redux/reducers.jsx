import {INCREASE,DECREASE} from './action-types'
export function conuter(state = 0, action) {
  switch(action.type) {
    case INCREASE:
    return state + action.data
    case DECREASE:
    return state - action.data
    default:
    return state
  }
}