import * as React from 'react';
import store from '../store/store';
import { Container, Grid, Button, Divider, Dropdown, Segment, SegmentGroup, Input, Icon, Label, Popup, DropdownMenu, DropdownItem, DropdownDivider, PopupHeader, PopupContent } from 'semantic-ui-react';
import { TerminalProfile, CursorShape, CursorShapeToIcon, WindowsFilePathRegex, ScrollBarState, ImageStretchMode, NavLinkPaths, MessageTypes, StoreType } from '../types/types';
import { ColorPickerPopup } from './ColorChangePickerPopUp';
import { v4 as uuid4 } from 'uuid';
import { NavBar } from './NavBar';
import { MessagePopup } from './MessagePopup';
import { defaultProfile } from '../store/initialStateObjects';
import { useMessage } from '../hooks/useMessage';
import { Action } from 'easy-peasy';


const InputFieldBarWithLabel = (props: {
    property: string,
    value: string | number | undefined,
    label: string,
    error?: boolean,
    type?: 'string' | 'number' | 'int' | 'float',
    setSpecificProfile: (obj: any) => void,
}) => {

    let updateObject: any = {}

    return (
        <Segment>
            <Input fluid type={props.type === 'float' || props.type === 'int' ? 'number' : props.type} label={props.label} value={props.value} onChange={e => {
                let value = e.target.value;
                updateObject[props.property] = value;
                if (props.type === 'string')
                    updateObject[props.property] = value;
                else if (props.type === 'number') updateObject[props.property] = Number.parseFloat(value);
                else if (props.type === 'int') updateObject[props.property] = Number.parseInt(value);
                else if (props.type === 'float') updateObject[props.property] = Number.parseFloat(value);
                props.setSpecificProfile(updateObject)
            }
            }
                error={props.error}
            />
        </Segment>
    )
}


const ConfigProfilesPage = () => {
    const {profiles, schemes, globals, terminalConfig} = store.getState()
    const {setSpecificProfile, setProfiles, setGlobals} = store.getActions()
    const [curProfile, setCurrentProfile] = React.useState(profiles[0]);
    const {popupMessage, closePopUp , showInfoMessage , showWarningMessage} = useMessage() ; 

    const profileIconError: boolean = typeof curProfile.icon === 'string' && (!!curProfile.icon.match(WindowsFilePathRegex) || curProfile.icon.indexOf('ms-appx') < 0)

    const updateCurrentProfile = (obj: any) => {
        console.log("Setting current profile : ", obj)
        setSpecificProfile({ profile: { ...curProfile, ...obj }, id: curProfile.guid });
        setCurrentProfile({ ...curProfile, ...obj });
    }

    const addNewProfile = () => {
        let newprofile: TerminalProfile = { ...profiles[0] }; //deepcopy first profile
        newprofile.name = 'New Profile';
        newprofile.guid = `{${uuid4()}}`;
        setProfiles([...profiles, newprofile]);
        showInfoMessage('New Profile Added' , 'Added')
    }

    const resetProfileToDefaults =()=>{
        let defaultProfileCopy = {...defaultProfile} ; 
        defaultProfileCopy.guid = curProfile.guid ;  //the guid of the default profile to the current profile
        setCurrentProfile(defaultProfileCopy) ; 
        updateCurrentProfile({profile : defaultProfileCopy , id : curProfile.guid })
        showInfoMessage('Profile has been reset') ; 
    }

    const deleteCurrentProfile = () => {
        // Delete current profile and set the next profile as the selected one

        if (profiles.length === 1) {
            showWarningMessage('Cannot delete this profile since this is the only active one.' )
            return;
        }

        const newProfiles = profiles.filter(p => p.guid != curProfile.guid)

        if (globals.defaultProfile === curProfile.guid) {
            setGlobals({ ...globals, defaultProfile: newProfiles[0].guid })
        }
        setProfiles(newProfiles);
        setCurrentProfile(newProfiles[0]);

        showInfoMessage(`Profile : ${curProfile.name} is deleted.` , 'Deleted') ; 
    }

    return (
        <>
            <NavBar navPath={NavLinkPaths.profiles} />

            <MessagePopup onDismiss={e => closePopUp() } content={popupMessage.message} warning={popupMessage.type === MessageTypes.warning} header={popupMessage.header} hidden={popupMessage.hidden} />

            <Container>
                <br />
                <Grid.Row centered textAlign='center' verticalAlign='middle' stretched>
                    <Button fluid basic size='massive' color='violet' content="Profiles" icon='user' />
                </Grid.Row>

                <Divider />

                {
                    terminalConfig.loadSuccess &&
                    <>
                        <Segment raised size='large' attached color='violet'>

                            <Dropdown text={'Profile : ' + curProfile.name} fluid >
                                <DropdownMenu>
                                    {
                                        profiles.map(p => {
                                            return <DropdownItem key={p.guid} text={p.name} value={p.guid} description={p.guid} selected={p.guid === curProfile.guid} active={p.guid === curProfile.guid} onClick={e => setCurrentProfile(p)}
                                                icon={<Icon name='circle outline' />}
                                            />
                                        })
                                    }
                                    <DropdownDivider />

                                    <DropdownItem onClick={e => e.preventDefault()} >
                                        <div style={{ display: 'flex'}}>
                                            <Button content='Add New Profile' fluid onClick={e => addNewProfile()} />

                                            <Popup closeOnPortalMouseLeave trigger={
                                                <Button icon={<Icon name='trash' color='red' />} />
                                            }>
                                                <Popup trigger={<Button negative size='small' onClick={e => deleteCurrentProfile()} content={'Delete Profile'} />}>
                                                    Confirm Deletion
                                        </Popup>
                                            </Popup>

                                            <Popup closeOnPortalMouseLeave trigger={
                                                <Button icon={<Icon name='redo' color='brown' />} />
                                            }>
                                                <Popup trigger={<Button size='small' onClick={e => 
                                                    resetProfileToDefaults()                                                
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
                            <Segment >
                                <Grid.Row>
                                    <Button toggle active={curProfile.closeOnExit} content='Close on Exit' onClick={e => updateCurrentProfile({ closeOnExit: !curProfile.closeOnExit })} />
                                    <Button toggle active={curProfile.snapOnInput} content='Snap on Input'
                                        onClick={e => updateCurrentProfile({ snapOnInput: !curProfile.snapOnInput })}
                                    />
                                    <Button toggle active={curProfile.useAcrylic} content='Use Acrylic'
                                        onClick={e => updateCurrentProfile({ useAcrylic: !curProfile.useAcrylic })}

                                    />
                                </Grid.Row>
                            </Segment>



                            <Segment>
                                {/* LET THIS FIELD BE READ ONLY */}
                                <Label size='large'  content={`Profile ID : ${curProfile.guid}`} icon={<Icon name='circle outline' />} />
                            </Segment>


                            <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Profile Name' property={'name'} value={curProfile.name} />

                            <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Font face' property={'fontFace'} value={curProfile.fontFace} />

                            <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Font Size' type='int' property={'fontSize'} value={curProfile.fontSize} />

                            <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Command Line' property={'commandline'} value={curProfile.commandline} />

                            <Segment>
                                <Label content='Cursor Shape' pointing='right' icon={<Icon name='i cursor' />} size='large' />
                                <Dropdown button inline text={curProfile.cursorShape + ' [ ' + CursorShapeToIcon[curProfile.cursorShape] + ' ]'} options={Object.values(CursorShape).map(shape => ({ text: shape + '  [ ' + CursorShapeToIcon[shape] + ' ] ', value: shape }))}
                                    onChange={(e, data) => {
                                        if (typeof data.value === 'string') {
                                            updateCurrentProfile({ cursorShape: data.value })
                                        }
                                    }}
                                />
                            </Segment>


                            <Segment>
                                <Label content='Color Scheme' pointing='right' icon={<Icon name='theme' />} size='large' />
                                <Dropdown button inline text={curProfile.colorScheme}
                                    options={schemes.map(s => ({ text: s.name, value: s.name }))}
                                    onChange={(e, data) => {
                                        if (typeof data.value === 'string') {
                                            updateCurrentProfile({ colorScheme: data.value })
                                        }
                                    }}
                                />
                            </Segment>


                            <Segment>
                                <Input fluid label='Background' placeholder={'#012456'} value={curProfile.background} />

                                <ColorPickerPopup value={curProfile.background} onChange={e => updateCurrentProfile({ background: e.hex })} >
                                    <div style={{ height: '100px', width: '100%', backgroundColor: curProfile.background }}></div>
                                </ColorPickerPopup>
                            </Segment>

                            <Segment>
                                <Popup mouseEnterDelay={300}
                                    trigger={
                                        <Input icon='image outline' fluid label='Background Image Path' value={curProfile.backgroundImage} onChange={e => updateCurrentProfile({ backgroundImage: e.target.value })} />
                                    }
                                >
                                    Works with 'UseAcrylic' Off
                    </Popup>
                            </Segment>



                            <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Background Image Opacity' type='number' error={curProfile.backgroundImageOpacity != undefined && (curProfile.backgroundImageOpacity < 0 || curProfile.backgroundImageOpacity > 1)} property={'backgroundImageOpacity'} value={curProfile.backgroundImageOpacity} />

                            <Segment>
                                <Label content='Background Image Stretch Mode' pointing='right' icon='image' size='large' />
                                <Dropdown button inline text={curProfile.backgroundImageStretchMode}
                                    options={Object.entries(ImageStretchMode).map(mode => ({ text: mode[0], value: mode[1] }))}
                                    onChange={(e, data) => {
                                        if (typeof data.value === 'string') {
                                            updateCurrentProfile({ backgroundImageStretchMode: data.value })
                                        }
                                    }}
                                />
                            </Segment>



                            <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='History Size' property={'historySize'} value={curProfile.historySize} type='int' />

                            <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Icon Filepath' error={profileIconError} property={'icon'} value={curProfile.icon} />

                            <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Acrylic opacity' type='float' error={curProfile.acrylicOpacity > 1 || curProfile.acrylicOpacity < 0} property={'acrylicOpacity'} value={curProfile.acrylicOpacity} />


                            <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Padding' property={'padding'} value={curProfile.padding} />

                            <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Starting Directory' property={'startingDirectory'} value={curProfile.startingDirectory} />

                            <Segment>
                                <Label size='large' pointing='right' content='Scrollbar State' />
                                <Button.Group>
                                    <Button positive={curProfile.scrollbarState === ScrollBarState.hidden}
                                        onClick={e => updateCurrentProfile({ scrollbarState: ScrollBarState.hidden })}>Hidden</Button>
                                    <Button.Or />
                                    <Button
                                        onClick={e => updateCurrentProfile({ scrollbarState: ScrollBarState.visible })}
                                        positive={curProfile.scrollbarState === ScrollBarState.visible} content='Visible' />
                                </Button.Group>
                            </Segment>


                            <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Tab Title' property={'tabTitle'} value={curProfile.tabTitle} />

                            <Segment>
                                <Popup
                                    mouseEnterDelay={500}
                                    trigger={
                                        <Input fluid label='Cursor Height' type='number' error={curProfile.cursorHeight != undefined && (curProfile.cursorHeight < 25 || curProfile.cursorHeight > 100)} value={curProfile.cursorHeight} onChange={e => e.target.value && updateCurrentProfile({ cursorHeight: Number.parseInt(e.target.value) })} />
                                    }>
                                    Sets the percentage height of the cursor starting from the bottom. Only works when cursorShape is set to "vintage". Accepts values from 25-100.                    </Popup>
                            </Segment>

                            <Segment>
                                <Input fluid label='Foreground' value={curProfile.foreground} />
                                <ColorPickerPopup value={curProfile.foreground} onChange={e => updateCurrentProfile({ foreground: e.hex })} >
                                    <div style={{ height: '100px', width: '100%', backgroundColor: curProfile.foreground }}></div>
                                </ColorPickerPopup>
                            </Segment>

                        </SegmentGroup>

                        <Divider />
                    </>
                }
            </Container>
        </>
    );
}

export { ConfigProfilesPage }; 