import * as React from 'react';
import { TerminalProfile } from '../types/types';

const useProfile = (initState:TerminalProfile)=>{
    const [profile, setprofile] = React.useState(initState) ; 
    return [profile , setprofile] ; 
}

export default  useProfile ; 