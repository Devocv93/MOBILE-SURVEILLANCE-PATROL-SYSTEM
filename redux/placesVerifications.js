import { createSlice } from '@reduxjs/toolkit'

export const placesSlice = createSlice({
    name: 'placesVerification',
    initialState:{
        places: [],
        modalQr: false, 
        currentIndex: 0,
        incidencias: [],
        nameCurrentRuta:'',
        currentRuta: 0,
        loading: false,
        stepCount: 0
    },
    reducers: {
        setIncidencias(state, data){
            state.incidencias = data.payload
        },
        setPlacesVerification(state, data){ 
            if(data.payload.length > 0){
                const allPlaces = data.payload.map(place => {
                    let entirePlace = {...place};
                    entirePlace.img = require('../assets/inspection.gif');
                    entirePlace.isScaned = false;
                    entirePlace.idIncidencia = 0;
                    entirePlace.observacion = " ";
                    entirePlace.idRondin = 0;
                    entirePlace.idUser = 0;
                    entirePlace.fh_creacion= null;
                    entirePlace.id_base =0;
    
                    return entirePlace;
                });

                state.places = allPlaces;

            }else state.places = []; 
        },
        openModalQr(state, data){ 
            state.modalQr = data.payload
        },
        closeModalQr(state, data){
            state.modalQr = data.payload
        },
        changeCurrentIndex(state, data){
            state.currentIndex = data.payload
        },
        setPlaceScaned(state, data){
            state.places[data.payload.index].isScaned = data.payload.value
        },
        setCurrentRuta(state, data){
            state.currentRuta = data.payload
        },
        setNameCurrentRuta(state, data){
            state.nameCurrentRuta = data.payload
        },
        setIdIncidencia(state, data){
            state.places[data.payload.index].idIncidencia = data.payload.value
        },
        setObservacion(state, data){
            state.places[data.payload.index].observacion = data.payload.value
        },
        setFechaLugarInpeccionado(state, data){ 
            state.places[data.payload.index].fh_creacion = data.payload.value; 
        },
        changeLoading(state, data){
            state.loading = data.payload
        },
        setStepCount(state, data){
            state.stepCount = data.payload
        },
    },
})

export const { 
    setPlacesVerification,
    openModalQr,
    closeModalQr,
    changeCurrentIndex,
    setPlaceScaned,
    setIncidencias,
    setCurrentRuta,
    setNameCurrentRuta,
    setIdIncidencia,
    setObservacion,
    changeLoading,
    setFechaLugarInpeccionado,
    setStepCount,
} = placesSlice.actions

export default placesSlice.reducer