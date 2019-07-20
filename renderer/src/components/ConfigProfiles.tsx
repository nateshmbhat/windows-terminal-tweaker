import * as React from 'react';
import { useStoreActions, useStoreState } from '../store/store';
import { Container, Grid, Button, Divider, Dropdown, Segment, SegmentGroup, Input, Icon, Label, Popup, DropdownMenu, DropdownItem, DropdownDivider } from 'semantic-ui-react';
import { TerminalProfile, CursorShape, CursorShapeToIcon, WindowsFilePathRegex, ScrollBarState, ImageStretchMode } from '../types/types';
import { ColorPickerPopup } from './ColorChangePickerPopUp';
import { v4 as uuid4 } from 'uuid';




const InputFieldBarWithLabel = (props: {
    property : string , 
    value : string | number |undefined  ,
    label : string , 
    error?  : boolean , 
    type? : 'string'|'number' |'int'  | 'float' , 
    setSpecificProfile : (obj:any)=>void ,
}) => {

    let updateObject: any= {} 

    return(
    <Segment>
        <Input fluid  type={props.type==='float' || props.type==='int'?'number' : props.type} label={props.label} value={props.value} onChange={e => { 
            let value = e.target.value ; 
            updateObject[props.property] = value ; 
            if(props.type==='string')
                updateObject[props.property] =  value ; 
            else if (props.type==='number') updateObject[props.property] = Number.parseFloat(value) ; 
            else if (props.type==='int') updateObject[props.property] = Number.parseInt(value) ; 
            else if (props.type==='float') updateObject[props.property] = Number.parseFloat(value) ; 

            props.setSpecificProfile(updateObject)}
        }
            error={props.error}
        />
    </Segment>
    )
}


const ConfigProfilesPage = () => {
    const [profiles, schemes] = useStoreState((state) => [state.profiles, state.schemes])
    const [setStoreProfile, setStoreProfiles] = useStoreActions((actions) => [actions.setSpecificProfile, actions.setProfiles]);
    const [curProfile, setCurrentProfile] = React.useState(profiles[0]);

    const profileIconError: boolean = typeof curProfile.icon === 'string' && (!!curProfile.icon.match(WindowsFilePathRegex) || curProfile.icon.indexOf('ms-appx') < 0)

    const setSpecificProfile = (obj: any) => {
        setStoreProfile({ profile: { ...curProfile, ...obj }, id: curProfile.guid });
        setCurrentProfile({ ...curProfile, ...obj });
    }

    


    const addNewProfile = () => {
        let newprofile: TerminalProfile = { ...profiles[0] }; //deepcopy first profile
        newprofile.name = 'New Profile';
        newprofile.guid = `{${uuid4()}}`;
        setStoreProfiles([...profiles, newprofile]);
    }

    return (
        <Container>
            <br />
            <Grid.Row centered textAlign='center' verticalAlign='middle' stretched>
                <Button fluid basic size='massive' color='blue' content="Profiles" icon='user' />
            </Grid.Row>


            <Divider />

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

                        <DropdownItem>
                            <Button content='Add New Profile' fluid onClick={e => addNewProfile()} />
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Segment>

            <SegmentGroup>
                <Segment >
                    <Grid.Row>
                        <Button toggle active={curProfile.closeOnExit} content='Close on Exit' onClick={e => setSpecificProfile({ closeOnExit: !curProfile.closeOnExit })} />
                        <Button toggle active={curProfile.snapOnInput} content='Snap on Input'
                            onClick={e => setSpecificProfile({ snapOnInput: !curProfile.snapOnInput })}
                        />
                        <Button toggle active={curProfile.useAcrylic} content='Use Acrylic'
                            onClick={e => setSpecificProfile({ useAcrylic: !curProfile.useAcrylic })}

                        />
                    </Grid.Row>
                </Segment>



                <Segment>
                    {/* LET THIS FIELD BE READ ONLY */}
                    <Input fluid label='Profile ID' icon={<Icon name='circle outline' />} value={curProfile.guid} />
                </Segment>


                <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Profile Name'  property={'name'} value={curProfile.name} />

                <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Font face'  property={'fontFace'} value={curProfile.fontFace} />

                <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Font Size' type='int'  property={'fontSize'} value={curProfile.fontSize} />

                <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Command Line' property={'commandline'} value={curProfile.commandline} />

                <Segment>
                    <Label content='Cursor Shape' pointing='right' icon={<Icon name='i cursor' />} size='large' />
                    <Dropdown button inline text={curProfile.cursorShape + ' [ ' + CursorShapeToIcon[curProfile.cursorShape] + ' ]'} options={Object.values(CursorShape).map(shape => ({ text: shape + '  [ ' + CursorShapeToIcon[shape] + ' ] ', value: shape }))}
                        onChange={(e, data) => {
                            if (typeof data.value === 'string') {
                                setSpecificProfile({ cursorShape: data.value })
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
                                setSpecificProfile({ colorScheme: data.value })
                            }
                        }}
                    />
                </Segment>


                <Segment>
                    <Input fluid label='Background' placeholder={'#012456'} value={curProfile.background} />

                    <ColorPickerPopup value={curProfile.background} onChange={e => setSpecificProfile({ background: e.hex })} >
                        <div style={{ height: '100px', width: '100%', backgroundColor: curProfile.background }}></div>
                    </ColorPickerPopup>
                </Segment>

                <Segment>
                    <Popup mouseEnterDelay={300}
                        trigger={
                            <Input icon='image outline' fluid label='Background Image Path' value={curProfile.backgroundImage} onChange={e => setSpecificProfile({ backgroundImage: e.target.value })} />
                        }
                    >
                        Works with 'UseAcrylic' Off
                    </Popup>
                </Segment>



                <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Background Image Opacity' type='number' error={ curProfile.backgroundImageOpacity != undefined && (curProfile.backgroundImageOpacity < 0 || curProfile.backgroundImageOpacity > 1) } property={'backgroundImageOpacity'} value={curProfile.backgroundImageOpacity} />

                <Segment>
                    <Label content='Background Image Stretch Mode' pointing='right' icon='image' size='large' />
                    <Dropdown button inline text={curProfile.backgroundImageStretchMode}
                        options={Object.entries(ImageStretchMode).map(mode => ({ text: mode[0], value: mode[1] }))}
                        onChange={(e, data) => {
                            if (typeof data.value === 'string') {
                                setSpecificProfile({ backgroundImageStretchMode: data.value })
                            }
                        }}
                    />
                </Segment>



                <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='History Size'  property={'historySize'} value={curProfile.historySize} type='int'  />

                <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Icon Filepath' error={profileIconError} property={'icon'} value={curProfile.icon} />

                <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Acrylic opacity' type='float' error={ curProfile.acrylicOpacity > 1 || curProfile.acrylicOpacity < 0} property={'acrylicOpacity'} value={curProfile.acrylicOpacity} />


                <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Padding' property={'padding'} value={curProfile.padding} />

                <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Starting Directory' property={'startingDirectory'} value={curProfile.startingDirectory} />

                <Segment>
                    <Label size='large' pointing='right' content='Scrollbar State' />
                    <Button.Group>
                        <Button positive={curProfile.scrollbarState === ScrollBarState.hidden}
                            onClick={e => setSpecificProfile({ scrollbarState: ScrollBarState.hidden })}>Hidden</Button>
                        <Button.Or />
                        <Button
                            onClick={e => setSpecificProfile({ scrollbarState: ScrollBarState.visible })}
                            positive={curProfile.scrollbarState === ScrollBarState.visible} content='Visible' />
                    </Button.Group>
                </Segment>


                <InputFieldBarWithLabel setSpecificProfile={setSpecificProfile} label='Tab Title' property={'tabTitle'} value={curProfile.tabTitle} />

               <Segment>
                    <Popup
                        mouseEnterDelay={500}
                        trigger={
                            <Input fluid label='Cursor Height' type='number' error={curProfile.cursorHeight != undefined && (curProfile.cursorHeight < 25 || curProfile.cursorHeight > 100)} value={curProfile.cursorHeight} onChange={e => e.target.value && setSpecificProfile({ cursorHeight: Number.parseInt(e.target.value) })} />
                        }>
                        Sets the percentage height of the cursor starting from the bottom. Only works when cursorShape is set to "vintage". Accepts values from 25-100.                    </Popup>
                </Segment>

                <Segment>
                    <Input fluid label='Foreground' value={curProfile.foreground} />
                    <ColorPickerPopup value={curProfile.foreground} onChange={e => setSpecificProfile({ foreground: e.hex })} >
                        <div style={{ height: '100px', width: '100%', backgroundColor: curProfile.foreground }}></div>
                    </ColorPickerPopup>
                </Segment>

            </SegmentGroup>

        </Container>
    );
}

export { ConfigProfilesPage }; 