import * as React from 'react';
import { Container, Grid, Button, Divider, Segment, Dropdown, DropdownMenu, DropdownItem, Icon, DropdownDivider, SegmentGroup, Input, Popup } from 'semantic-ui-react';
import store from '../store/store';
import { ColorPickerPopup } from './ColorChangePickerPopUp';
import { NavBar } from './NavBar';
import { NavLinkPaths, MessageTypes } from '../types/types';
import { MessagePopup } from './MessagePopup';
import { defaultSchemesArray } from '../store/initialStateObjects';
import { useMessage } from '../hooks/useMessage';

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
    const {schemes, profiles, terminalConfig} = store.getState()
    const {setSpecificScheme, setSchemes} = store.getActions()
    const [curScheme, setCurrentScheme] = React.useState(schemes[0]);
    const {popupMessage, closePopUp , showInfoMessage , showWarningMessage} = useMessage() ; 
    let curSchemeCopy = { ...curScheme }; //copy wouldnt contain the name property and is used to map data into UI components
    curSchemeCopy.name='';

    const addNewScheme = () => {
        let newScheme = { ...schemes[0] };
        newScheme.name = `New Scheme ${(Math.floor(Math.random() * 1000))}`
        setSchemes([...schemes, newScheme]);
        showInfoMessage('New Scheme added.')        
    }

    const updateCurrentScheme = (obj: any) => {
        setCurrentScheme({ ...curScheme, ...obj });
        setSpecificScheme({ ...curScheme, ...obj })
    }

    const resetSchemeToDefaults = ()=>{
        let defaultSchemesWithCurName = defaultSchemesArray.filter(s=>s.name===curScheme.name) ;
        if(defaultSchemesWithCurName.length==0){
            showWarningMessage(`Make sure that the scheme 'name' is set to one of the following to be able to reset it to defaults.

            [ Campbell , One Half Dark , One Half Light , Solarized Dark , Solarized Light ]
            `)
            return ;  
        }
        setCurrentScheme(defaultSchemesWithCurName[0]); 
        setSpecificScheme(defaultSchemesWithCurName[0]); 
    }

    const deleteCurrentScheme = () => {
        if (schemes.length === 1) {
            showWarningMessage(`Cannot delete the Scheme '${curScheme.name}' since it is the only active scheme.`) ; 
            return;
        }
        let profilesUsingScheme = profiles.filter(p => p.colorScheme === curScheme.name);
        if (profilesUsingScheme.length > 0) {
            // Show error message that the current scheme name can't be changed since its alredy used in a profile
            showWarningMessage(`Cannot delete the Scheme '${curScheme.name}' since it is already being used by a Profile.` );
            return;
        }

        showInfoMessage(`Scheme '${curScheme.name}' Deleted.`) ;

        let newSchemes = schemes.filter(s => s.name != curScheme.name);
        setSchemes(newSchemes);
        setCurrentScheme(newSchemes[0]);
    }

    return (
        <>
            <NavBar navPath={NavLinkPaths.schemes} />

            <MessagePopup onDismiss={e => closePopUp()} content={popupMessage.message} warning={popupMessage.type === MessageTypes.warning} header={popupMessage.header} hidden={popupMessage.hidden} />
            <Container>
                <br />
                <Grid.Row centered textAlign='center' verticalAlign='middle' stretched>
                    <Button fluid basic size='massive' color='blue' content="Schemes" icon='theme' />
                </Grid.Row>

                <Divider />

                {
                    terminalConfig.loadSuccess &&
                    <>
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
                                                <Popup trigger={<Button negative size='small' onClick={e => deleteCurrentScheme()} content={'Delete Scheme'} />}>
                                                    Confirm Deletion
                                        </Popup>
                                            </Popup>

                                            <Popup closeOnPortalMouseLeave trigger={
                                                <Button icon={<Icon name='redo' color='brown' />} />
                                            }>
                                                <Popup trigger={<Button size='small' onClick={e => 
                                                    resetSchemeToDefaults()                                                
                                                } content={'Reset Profile'} />}>
                                                    Confirm Reset
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
                                        let val = e.target.value ;  
                                        if (profilesUsingScheme.length > 0) {
                                            // Show error message that the current scheme name can't be changed since its alredy used in a profile
                                            showWarningMessage('Cannot change this Scheme name since it is already being used by a Profile.');
                                            return;
                                        }
                                        if(schemes.filter(s=>s.name===val).length>0){
                                            // if any other scheme already has the given name , then reject it ! 
                                            showWarningMessage(`Scheme name '${val}' is already used by another scheme.`);
                                            return;
                                        }
                                        updateCurrentScheme({ name: val });
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

                    </>
                }

            </Container>
        </>

    )
}

export { ConfigSchemesPage }; 