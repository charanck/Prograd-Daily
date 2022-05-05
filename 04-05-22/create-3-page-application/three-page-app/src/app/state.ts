interface userModel{
    userName:string,
    passWord:string
}
interface State{
    userName:string,
    users:userModel[]
}

export let state:State = {
    "userName":'',
    "users":[]
}