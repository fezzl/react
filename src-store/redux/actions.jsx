import {INCREASE,DECREASE} from './action-types'
export const increase = (number) => ({type:INCREASE,data:number})
export const decrease = (number) => ({type:DECREASE,data:number})
