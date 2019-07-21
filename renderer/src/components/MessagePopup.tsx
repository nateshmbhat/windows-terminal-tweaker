import * as React from 'react';
import { Message, MessageProps } from 'semantic-ui-react';

export const MessagePopup = (props:{
    content : React.ReactNode|string , 
    header? : string ,
    error? :boolean , 
    negative ? : boolean , 
    positive?:boolean , 
    hidden ? :boolean , 
    info ?:boolean  , 
    warning ? : boolean  , 
    onDismiss?: ((event: React.MouseEvent<HTMLElement, MouseEvent>, data: MessageProps) => void) | undefined

})=>{

    return(
    <div style={{position:'fixed' , right:'10px' , zIndex:10}} >
        <Message onDismiss={props.onDismiss}  {...props} content={props.content} header={props.header} />
    </div>

    )

}