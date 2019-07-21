import * as React from 'react'; import { Container, Button, Grid, Segment, Divider, Input, Dropdown, SegmentGroup, Label, Icon } from 'semantic-ui-react';
import { useStoreState, useStoreActions } from '../store/store';
import { RequestedThemeOptions, TerminalKeyBinding } from '../types/types';
import { NavBar } from './NavBar';


const KeyBindingBar = (props: {
    keybinding: TerminalKeyBinding,
    setKeybinding: (obj: { command: string, keys: [string] })=>void}) => {
    return (<Segment>
        <Input value={props.keybinding.keys[0]} label={props.keybinding.command} onChange={
            e => props.setKeybinding({ command: props.keybinding.command, keys: [e.target.value] })
        } />
    </Segment>)
}

const ConfigGlobalsPage = () => {
    const [globals, profiles] = useStoreState((state) => [state.globals, state.profiles])
    const [setGlobals , setKeybinding ] = useStoreActions((actions) => [actions.setGlobals , actions.setSpecificKeyBinding ] );
    console.log(globals)
    return (
        <>
        <NavBar/>
        <Container>
            <br />
            <Grid.Row centered textAlign='center' verticalAlign='middle' stretched>
                <Button fluid basic size='huge' color='blue' content="Globals" />
            </Grid.Row>
            <Divider />

            <Dropdown button selection fluid labeled floating icon='setting' className='icon' text={'Default Profile : ' + (profiles.filter(e => e.guid === globals.defaultProfile)[0].name)}
                value={globals.defaultProfile}
                options={profiles.map(profile => ({
                    text: profile.name,
                    value: profile.guid,
                    description: profile.guid,
                    active: profile.guid === globals.defaultProfile
                }))
                }
                onChange={(e, data) => {
                    console.log(e, data);
                    if (typeof data.value == 'string')
                        setGlobals({ ...globals, defaultProfile: data.value })
                }}
            />

            <Segment size='big' color='purple'  >
                <Button toggle content="Always Show Tabs" active={globals.alwaysShowTabs} onClick={() => setGlobals({
                    ...globals,
                    alwaysShowTabs: !globals.alwaysShowTabs
                })}
                />
                <Button content="Show Tabs In Title Bar" toggle active={globals.showTabsInTitlebar} onClick={() => setGlobals({
                    ...globals,
                    showTabsInTitlebar: !globals.showTabsInTitlebar
                })}
                />

                <Button content="Show Terminal Title In Title Bar" toggle active={globals.showTerminalTitleInTitlebar} onClick={() => setGlobals({
                    ...globals,
                    showTerminalTitleInTitlebar: !globals.showTerminalTitleInTitlebar
                })}
                />
            </Segment>

            <Grid.Column>
                <Segment.Group size='large' color='teal' >
                    <Segment>
                        <Input value={globals.initialCols} type='number' label='Initial Columns'
                            onChange={e => {
                                setGlobals({
                                    ...globals,
                                    initialCols: Number.parseInt(e.target.value)
                                })
                            }}
                        />
                    </Segment>
                    <Segment>
                        <Input value={globals.initialRows} type='number' label='Initial Rows'
                            onChange={e => {
                                setGlobals({
                                    ...globals,
                                    initialRows: Number.parseInt(e.target.value)
                                })
                            }}
                        />

                    </Segment>
                </Segment.Group>

                <Segment compact size='large'>
                    <Label content='Requested Theme' pointing='right'
                        icon={<Icon name='theme' color={
                            globals.requestedTheme === RequestedThemeOptions.system ? 'blue' :
                                globals.requestedTheme === RequestedThemeOptions.light ? 'grey' : 'black'
                        } />}
                        size='large' />
                    <Dropdown text={globals.requestedTheme} button  >
                        <Dropdown.Menu >
                            <Dropdown.Item onClick={() => {
                                setGlobals({ ...globals, requestedTheme: RequestedThemeOptions.system })
                            }} label={{ color: 'blue', empty: true, circular: true }} text='System' />

                            <Dropdown.Item onClick={() => {
                                setGlobals({ ...globals, requestedTheme: RequestedThemeOptions.light })
                            }} label={{ color: 'grey', empty: true, circular: true }} text='Light' />

                            <Dropdown.Item onClick={() => {
                                setGlobals({ ...globals, requestedTheme: RequestedThemeOptions.dark })
                            }} label={{ color: 'black', empty: true, circular: true }} text='Dark' />

                        </Dropdown.Menu>
                    </Dropdown>
                </Segment>
            </Grid.Column>


            <Divider section />


            <SegmentGroup>
                <Segment>
                    <Label ribbon size='huge' content={'Keyboard Shortcuts'} />
                </Segment>

                <KeyBindingBar keybinding={globals.keybindings[0]} setKeybinding={setKeybinding} />

            </SegmentGroup>


        </Container>
        </>
    );
}

export { ConfigGlobalsPage };