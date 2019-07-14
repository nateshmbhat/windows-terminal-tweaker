import {createStore, action, State, Action} from 'easy-peasy'
import { StoreType } from '../types/types';

const initialState : StoreType = {
    terminalConfig:{
        configFilePath : '' , 
        loadFail : false , 
        loadSuccess : false ,         
    },

    setLoadFail : action((state ,  value) => {
        state.terminalConfig.loadFail = value ; 
    }) , 
    setConfigFilePath : action((state,path)=>{
        state.terminalConfig.configFilePath = path ; 
    }) , 
    setLoadSuccess: action((state,value)=>{
        state.terminalConfig.loadSuccess = value ; 
    })
}


const store = createStore(initialState); 

export const useStoreActions = store.useStoreActions;
export const useStoreDispatch = store.useStoreDispatch;
export const useStoreState = store.useStoreState;

export default store;