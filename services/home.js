import axios from 'axios'
import { url } from '../constants/url'; 

const getRodinesByBase = async(idBase )=>{
    const result = {error: null, data: null}
    try { 
        const response = await axios.get(`${url}/rondin/bybase/${idBase}`); 
        if(response.status === 200){
            result.data = response.data;
            return result;
        } 
    } catch (error) { 
        result.error = error
        return result;
    }
}

const getAllRutasRondinByRondin = async(idRondin)=>{
    const result = {error: null, data: null}
    try { 
        const response = await axios.get(`${url}/rondin/${idRondin}/rutasrondin`);
        if(response.status === 200){
            result.data = response.data;
            return result;
        } 
    } catch (error) { 
        result.error = error
        return result;
    }
}

const getIncidenciasByBase = async(idBase)=>{
    const result = {error: null, data: null}
    try { 
        const response = await axios.get(`${url}/incidencia/bybase/${idBase}`);
        if(response.status === 200){
            result.data = response.data;
            return result;
        } 
    } catch (error) { 
        result.error = error
        return result;
    }
}

export {
    getRodinesByBase,
    getAllRutasRondinByRondin,
    getIncidenciasByBase
}