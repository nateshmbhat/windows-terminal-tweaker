import * as React from 'react';
import { useStoreActions, useStoreState } from '../store/store';
import { Container, Grid, Button, Divider, Dropdown, Segment, SegmentGroup, Input, Icon, Label, Popup } from 'semantic-ui-react';
import { TerminalProfile, CursorShape, CursorShapeToIcon, WindowsFilePathRegex, ScrollBarState, ImageStretchMode } from '../types/types';
import { ColorPickerPopup } from './ColorChangePickerPopUp';


const ConfigProfilesPage = () => {
    const [profiles, schemes] = useStoreState((state) => [state.profiles, state.schemes])
    const setProfile = useStoreActions((actions) => actions.setSpecificProfile);
    const [curProfile, setCurrentProfile] = React.useState(profiles[0]);

    const profileIconError: boolean = typeof curProfile.icon === 'string' && (!!curProfile.icon.match(WindowsFilePathRegex) || curProfile.icon.indexOf('ms-appx') < 0)

    const setSpecificProfile = (obj: any) => {
        setProfile({ profile: { ...curProfile, ...obj }, id: curProfile.guid });
        setCurrentProfile({ ...curProfile, ...obj });
    }

    return (
        <Container>
            <br />
            <Grid.Row centered textAlign='center' verticalAlign='middle' stretched>
                <Button fluid basic size='massive' color='blue' content="Profiles" icon='user' />
            </Grid.Row>


            <Divider />

            <Segment raised size='large' attached color='violet'>
                <Dropdown text={'Profile : ' + curProfile.name} fluid selection options={profiles.map(p => ({
                    text: p.name,
                    value: p.guid,
                    description: p.guid
                }))}
                    onChange={(e, data) => {
                        if (typeof data.value === 'string') {
                            setCurrentProfile(
                                profiles.filter(p => p.guid === data.value)[0]
                            );
                        }
                    }}
                />
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

                <Segment>
                    <Input fluid label='Profile Name' value={curProfile.name} onChange={e => setSpecificProfile({ name: e.target.value })} />
                </Segment>


                <Segment>
                    <Input fluid label='Font face' value={curProfile.fontFace} onChange={e => setSpecificProfile({ fontFace: e.target.value })} />

                </Segment>

                <Segment>
                    <Input fluid type='number' label='Font Size' value={curProfile.fontSize} onChange={e => setSpecificProfile({ fontSize: Number.parseInt(e.target.value) })} />
                </Segment>


                <Segment>
                    <Input fluid label='Command Line' value={curProfile.commandline} onChange={e => setSpecificProfile({ commandline: e.target.value })} />
                </Segment>

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
                    <Input fluid label='Background' placeholder={'#012456'} value={curProfile.background}/>

                    <ColorPickerPopup value={curProfile.background} onChange={e=>setSpecificProfile({background:e.hex})} >
                        <div style={{ height: '100px', width: '100%', backgroundColor: curProfile.background }}></div>
                    </ColorPickerPopup>
                </Segment>

                <Segment>
                    <Input icon='image outline' fluid label='Background Image Path'  value={curProfile.backgroundImage} onChange={e => setSpecificProfile({ backgroundImage: e.target.value })}
                    />
                </Segment>

                <Segment>
                    <Input fluid label='Background Image Opacity' type='number' value={curProfile.backgroundImageOpacity} onChange={e => setSpecificProfile({ backgroundImageOpacity: Number.parseFloat(e.target.value) })}
                    
                    error={ curProfile.backgroundImageOpacity!=undefined && (curProfile.backgroundImageOpacity<0 || curProfile.backgroundImageOpacity>1)} 
                    />
                </Segment>

                <Segment>
                    <Label content='Background Image Stretch Mode' pointing='right' icon='image' size='large' />
                    <Dropdown button inline text={curProfile.backgroundImageStretchMode}
                        options={Object.entries(ImageStretchMode).map(mode => ({ text: mode[0], value: mode[1]}))}
                        onChange={(e, data) => {
                            if (typeof data.value === 'string') {
                                setSpecificProfile({ backgroundImageStretchMode: data.value })
                            }
                        }}
                    />
                </Segment>

                <Segment>
                    <Input fluid label='History Size' value={curProfile.historySize} onChange={e => setSpecificProfile({ historySize: Number.parseInt(e.target.value) })} type='number' />
                </Segment>

                <Segment>
                    <Input fluid label='Icon Filepath' value={curProfile.icon} onChange={e => setSpecificProfile({ icon: e.target.value })}
                        error={profileIconError}
                    />
                </Segment>

                <Segment>
                    <Input fluid type='number' label='Acrylic opacity' value={curProfile.acrylicOpacity} onChange={e => setSpecificProfile({ acrylicOpacity: Number.parseFloat(e.target.value) })}
                        error={curProfile.acrylicOpacity > 1 || curProfile.acrylicOpacity < 0}
                    />
                </Segment>


                <Segment>
                    <Input fluid label='Padding' value={curProfile.padding} onChange={e => setSpecificProfile({ padding: e.target.value })} />
                </Segment>

                <Segment>
                    <Input fluid label='Starting Directory' value={curProfile.startingDirectory} onChange={e => setSpecificProfile({ startingDirectory: e.target.value })} />
                </Segment>

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

                <Segment>
                    <Input fluid label='Tab Title' value={curProfile.tabTitle} onChange={e => setSpecificProfile({ tabTitle: e.target.value })} />
                </Segment>

                {/* <Segment>
                    <Input fluid label='Cursor Height' type='number' value={curProfile.cursorHeight} onChange={e => setSpecificProfile({ cursorHeight: Number.parseFloat(e.target.value)})} />
                </Segment>
 */}
                <Segment>
                    <Input fluid label='Foreground' value={curProfile.foreground}/>

                    <ColorPickerPopup value={curProfile.foreground} onChange={e=>setSpecificProfile({foreground:e.hex})} >
                        <div style={{ height: '100px', width: '100%', backgroundColor: curProfile.foreground }}></div>
                    </ColorPickerPopup>
                </Segment>



            </SegmentGroup>

        </Container>
    );
}

export { ConfigProfilesPage }; 