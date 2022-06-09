import axios from 'axios'
import { url } from '../constants/url'; 

const loginService = async(email, password )=>{
    const result = {error: null, data: null}
    try { 
        const response = await axios.get(`${url}/usuario/login/${email}/${password}`);
        if(response.status === 200){
            result.data = response.data.data;
            return result;
        } 
    } catch (error) { 
        result.error = error
        return result;
    }
}

export {
    loginService,
}