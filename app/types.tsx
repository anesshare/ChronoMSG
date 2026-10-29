export interface User{
    id:number
    username:string
    password:string
    number:string
}
export interface Transaction{
    id:number
    name:string
    number:string
    trans_value:number
    start_date:string
    end_date:string
    active:boolean
}