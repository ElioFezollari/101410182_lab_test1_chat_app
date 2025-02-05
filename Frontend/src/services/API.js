import axios from 'axios'
const baseUrl = 'http://localhost:3000'


const register = async(credentials)=>{
  const response = await axios.post(baseUrl + "/auth/register",credentials)
  return response
}


const login = async(credentials)=>{
    const response = await axios.post(baseUrl + "/auth/login",credentials)
    return response
  }
  
  const getUsers = async()=>{
    const response = await axios.get(baseUrl + "/auth/users",)
    return response
  }
  
export {register,login,getUsers}