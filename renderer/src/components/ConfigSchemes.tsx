import * as React from 'react';
import { Container, Grid, Button, Divider, Segment, Dropdown, DropdownMenu, DropdownItem, Icon, DropdownDivider, SegmentGroup, Input, Popup } from 'semantic-ui-react';
import { useStoreState, useStoreActions } from '../store/store';
import { ColorPickerPopup } from './ColorChangePickerPopUp';
import { NavBar } from './NavBar';
import { NavLinkPaths, MessageTypes } from '../types/types';
import { MessagePopup } from './MessagePopup';

const SchemeColorBar = (props: { property: string, value: string, updateCurrentScheme: (obj: any) => void }) => {
    return (
        <Segment>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '100%' }}>
                    <Input fluid label={props.property} value={props.value} />
                </div>

                <ColorPickerPopup mouseEnterDelay={0} value={props.value} onChange={e => {
                    let updateObject: any = {}
                    updateObject[props.property] = e.hex;
                    props.updateCurrentScheme(updateObject)
                }
                }>
                    <div style={{ height: '38px', width: '75px', backgroundColor: props.value, borderRadius: '2px' }}></div>
                </ColorPickerPopup>
            </div>
        </Segment>
    );
}



const ConfigSchemesPage = () => {
    const [schemes, profiles] = useStoreState((state) => [state.schemes, state.profiles])
    const [setSpecificScheme, setSchemes] = useStoreActions(actions => [actions.setSpecificScheme, actions.setSchemes])
    const [curScheme, setCurrentScheme] = React.useState(schemes[0]);
    const [popupMessage, setPopupMessage] = React.useState({ hidden: true, message: '' , header:'Warning' , type:MessageTypes.warning })
    let curSchemeCopy = { ...curScheme }; //copy wouldnt contain the name property and is used to map data into UI components
    delete curSchemeCopy.name;

    const addNewScheme = () => {
        let newScheme = { ...schemes[0] };
        newScheme.name = `New Scheme ${(Math.floor(Math.random() * 1000))}`
        setSchemes([...schemes, newScheme]);

        setPopupMessage({ ...popupMessage, hidden: false,header:'Success' , message: `New Scheme added.` , type:MessageTypes.info });
        setTimeout(()=>{
            setPopupMessage({...popupMessage,hidden :true}) ; 
        },2000)
    }

    const updateCurrentScheme = (obj: any) => {
        setCurrentScheme({ ...curScheme, ...obj });
        setSpecificScheme({ ...curScheme, ...obj })
    }

    const deleteCurrentScheme = () => {
        if(schemes.length===1){
            setPopupMessage({ ...popupMessage, hidden: false, message: `Cannot delete the Scheme '${curScheme.name}' since it is the only active scheme.` });
            return ; 
        }
        let profilesUsingScheme = profiles.filter(p => p.colorScheme === curScheme.name);
        if (profilesUsingScheme.length > 0) {
            // Show error message that the current scheme name can't be changed since its alredy used in a profile
            setPopupMessage({ ...popupMessage, hidden: false, message: `Cannot delete the Scheme '${curScheme.name}' since it is already being used by a Profile.` });
            return;
        }

        setPopupMessage({ ...popupMessage, hidden: false, header:'Info',type:MessageTypes.info , message: `'Scheme ${curScheme.name}' Deleted.` });

        setTimeout(()=>{
            setPopupMessage({...popupMessage,hidden :true}) ; 
        },2000)

        let newSchemes = schemes.filter(s=>s.name!=curScheme.name) ; 
        setSchemes(newSchemes) ; 
        setCurrentScheme(newSchemes[0]) ; 
    }

    return (
        <>
            <NavBar navPath={NavLinkPaths.schemes} />

            <MessagePopup onDismiss={e => setPopupMessage({...popupMessage, hidden: true })} content={popupMessage.message} warning={popupMessage.type===MessageTypes.warning} header={popupMessage.header} hidden={popupMessage.hidden} />
            <Container>
                <br />
                <Grid.Row centered textAlign='center' verticalAlign='middle' stretched>
                    <Button fluid basic size='massive' color='blue' content="Schemes" icon='theme' />
                </Grid.Row>

                <Divider />

                <Segment raised size='large' attached color='violet'>
                    <Dropdown text={'Scheme : ' + curScheme.name} fluid >
                        <DropdownMenu > {
                            schemes.map(p => {
                                return <DropdownItem key={`${p.name} ${Math.random()}`} text={p.name} value={p.name} selected={p.name === curScheme.name} active={p.name === curScheme.name} onClick={e => setCurrentScheme(p)}
                                    icon={<Icon name='circle outline' />}
                                />
                            })
                        }
                            <DropdownDivider />

                            <DropdownItem>


                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Button content='Add New Scheme' fluid onClick={e => addNewScheme()} />

                                    <Popup closeOnPortalMouseLeave trigger={
                                        <Button icon={<Icon name='trash' color='red' />} />
                                    }>
                                        <Popup trigger={<Button negative size='small' onClick={e=>deleteCurrentScheme()} content={'Delete Scheme'} />}>
                                            Confirm Deletion
                                        </Popup>
                                    </Popup>
                                </div>


                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Segment>


                <SegmentGroup>
                    <Segment>
                        <Input fluid label='Scheme Name' icon={<Icon name='circle outline' />} value={curScheme.name}
                            onChange={e => {
                                let profilesUsingScheme = profiles.filter(p => p.colorScheme === curScheme.name);
                                if (profilesUsingScheme.length > 0) {
                                    // Show error message that the current scheme name can't be changed since its alredy used in a profile
                                    setPopupMessage({ ...popupMessage, hidden: false, message: 'Cannot change this Scheme name since it is already being used by a Profile.' });
                                    return;
                                }

                                updateCurrentScheme({ name: e.target.value });

                            }}
                        />
                    </Segment>

                    {
                        Object.entries(curSchemeCopy).map(keyVal => {
                            return (
                                <SchemeColorBar key={keyVal[0]} property={keyVal[0]} value={keyVal[1]} updateCurrentScheme={updateCurrentScheme} />
                            )
                        })
                    }
                </SegmentGroup>

                <Divider />

            </Container>
        </>

    )
}

export { ConfigSchemesPage }; 