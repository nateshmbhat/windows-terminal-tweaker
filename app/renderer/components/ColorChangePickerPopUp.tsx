import React, { useEffect } from 'react';
import { Popup } from 'semantic-ui-react';
import { ChromePicker, ColorChangeHandler, HSLColor, RGBColor } from 'react-color';


export const ColorPickerPopup = (props : { children : React.PropsWithChildren<React.ReactNode> , 
    value? : string  |HSLColor | RGBColor , 
    onChange? : ColorChangeHandler , 
    onChangeComplete? : ColorChangeHandler, 
    mouseEnterDelay? : number , 
    mouseLeaveDelay? : number
}) => {


    useEffect(() => {
        return () => {
           console.log("Colorpicker unmounting ! ") ;  
        };
    }, [])

   
    let mouseEnterDelay :number = props.mouseEnterDelay!=undefined?props.mouseEnterDelay:300 ; 
    let mouseLeaveDelay :number = props.mouseLeaveDelay!=undefined?props.mouseLeaveDelay:300 ; 

    return (
        <Popup mouseEnterDelay={ mouseEnterDelay } mouseLeaveDelay={ mouseLeaveDelay}  position='top center' trigger={props.children} closeOnDocumentClick closeOnPortalMouseLeave  >
            <ChromePicker disableAlpha onChangeComplete={props.onChangeComplete} color={props.value} onChange={props.onChange} />
        </Popup>);
}