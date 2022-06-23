import { defineStore } from 'pinia'

export default defineStore('user',{
    state:()=>{
        return{
            name:'张三'
        };
    },
    actions:{
        updateName(name:string){
            this.name=name
        }
    }
})