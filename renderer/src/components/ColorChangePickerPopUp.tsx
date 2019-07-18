import React from 'react';
import { Popup } from 'semantic-ui-react';
import { ChromePicker, ColorChangeHandler, HSLColor, RGBColor } from 'react-color';


export const ColorPickerPopup = (props : { children : React.PropsWithChildren<React.ReactNode> , 
    value? : string  |HSLColor | RGBColor , 
    onChange? : ColorChangeHandler
}) => {
    return (
        <Popup header='Pick Color' openOnTriggerMouseEnter trigger={props.children} closeOnDocumentClick closeOnTriggerMouseLeave={false} closeOnPortalMouseLeave  >
            <ChromePicker color={props.value} onChange={props.onChange} />
        </Popup>);
}