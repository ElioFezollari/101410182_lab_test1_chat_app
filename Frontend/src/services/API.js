import axios from 'axios'
const baseUrl = 'http://localhost:3000'


const register = async(credentials)=>{
  const response = await axios.post(baseUrl + "/auth/register",credentials)
  return response
}

export {register}