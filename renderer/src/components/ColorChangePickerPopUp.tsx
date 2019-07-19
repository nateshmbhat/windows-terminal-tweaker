import React from 'react';
import { Popup } from 'semantic-ui-react';
import { ChromePicker, ColorChangeHandler, HSLColor, RGBColor } from 'react-color';


export const ColorPickerPopup = (props : { children : React.PropsWithChildren<React.ReactNode> , 
    value? : string  |HSLColor | RGBColor , 
    onChange? : ColorChangeHandler
}) => {
    return (
        <Popup mouseEnterDelay={300} mouseLeaveDelay={500}  position='top center' trigger={props.children} closeOnDocumentClick closeOnPortalMouseLeave  >
            <ChromePicker color={props.value} onChange={props.onChange} />
        </Popup>);
}