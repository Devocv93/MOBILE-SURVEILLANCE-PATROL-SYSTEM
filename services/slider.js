import axios from 'axios'

import { url } from '../constants/url'; 

const postRondinDone = async({data, idUser, idRuta, id_Base})=>{
    const result = {error: null}
    try { 
        
        for (const lugar of data) {
            let rondinDone = {
                id_rondin: idRuta,
                id_lverificacion: lugar.id,
                id_incidencia: lugar.idIncidencia,
                id_usuario: idUser,
                observacion: lugar.observacion,
                fh_creacion: lugar.fh_creacion,
                id_base: id_Base
            }

            await axios.post(`${url}/rondinhecho`, rondinDone);
        }
        
        return result;
    } catch (error) { 
        result.error = error
        return result;
    }
}

export {
    postRondinDone, 
}