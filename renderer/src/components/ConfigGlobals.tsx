import * as React from 'react'; import { Container, Button, Grid, Segment, Divider, Input, Dropdown, SegmentGroup, Label, Icon, Popup } from 'semantic-ui-react';
import { useStoreState, useStoreActions } from '../store/store';
import { RequestedThemeOptions, TerminalKeyBinding, NavLinkPaths } from '../types/types';
import { NavBar } from './NavBar';
import { defaultGlobals } from '../store/initialStateObjects';


const isPrintableKeyCode = (keycode: number): boolean => {
    let valid =
        (keycode > 47 && keycode < 58) || // number keys
        keycode == 32 || // spacebar & return key(s) (if you want to allow carriage returns)
        (keycode > 64 && keycode < 91) || // letter keys
        (keycode > 95 && keycode < 112) || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)

    return valid;
}

const getLowerCaseMap = (val: string) => {
    switch (val) {
        case '~': return '`';
        case '{': return '[';
        case '}': return ']';
        case '"': return "'";
        case ':': return ";";
        case '>': return ".";
        case '<': return ",";
        case '?': return "/";
        case '|': return "\\";
        case '_': return "-";
        case '!': return '1';
        case '@': return '2';
        case '#': return '3';
        case '$': return '4';
        case '%': return '5';
        case '^': return '6';
        case '&': return '7';
        case '*': return '8';
        case '(': return '9';
        case ')': return '0';
        default: return val.toLowerCase()
    }
}

const KeyBindingBar = (props: {
    keybinding: TerminalKeyBinding,
    setKeybinding: (obj: { command: string, keys: [string] }) => void
}) => {
    return (<Segment>
        <Input
            onBlur={
                (e: any) => {
                    console.log(e);
                }
            }

            onKeyDown={
                (e: any) => {
                    console.log("keydown : ", e, e.charCode, e.keyCode, e.shiftKey, e.altKey, e.ctrlKey, e.which, e.key)
                    let value: string = e.target.value.trim();
                    let printableKey = isPrintableKeyCode(e.keyCode)
                    if (value.length > 0 && !value.endsWith('+')) return;

                    switch (e.keyCode) {
                        case 16: //shift
                            if (value.indexOf('shift') < 0) props.setKeybinding({ command: props.keybinding.command, keys: [value + 'shift+'] })
                            break;

                        case 17:  //ctrl
                            if (value.indexOf('ctrl') < 0) props.setKeybinding({ command: props.keybinding.command, keys: [value + 'ctrl+'] })
                            break;

                        case 18: //alt
                            if (value.indexOf('alt') < 0) props.setKeybinding({ command: props.keybinding.command, keys: [value + 'alt+'] })
                            break;

                        case 9: //Tab
                            if (value.indexOf('tab') < 0) props.setKeybinding({ command: props.keybinding.command, keys: [value + 'tab'] })
                            break;

                        default:
                            let newvalue = value + (printableKey && getLowerCaseMap(e.key) || '')
                            props.setKeybinding({ command: props.keybinding.command, keys: [newvalue] })
                    }
                }
            } value={props.keybinding.keys[0]} label={props.keybinding.command}

            onChange={
                e => {
                    let value = e.target.value;
                    console.log("onchange value = ", value)
                    if (value.length > 0 && !value.endsWith('+')) return;
                    props.setKeybinding({ command: props.keybinding.command, keys: [e.target.value] })
                }
            }

        />
    </Segment>)
}

const ConfigGlobalsPage = () => {
    const [globals, profiles, configFlags] = useStoreState((state) => [state.globals, state.profiles, state.terminalConfig])
    const [setGlobals, setKeybinding] = useStoreActions((actions) => [actions.setGlobals, actions.setSpecificKeyBinding]);
    console.log(globals)


    const resetKeybindings = () => {
        setGlobals({ ...globals, keybindings: defaultGlobals.keybindings });
    }

    return (
        <>
            <NavBar navPath={NavLinkPaths.globals} />
            <Container>
                <br />
                <Grid.Row centered textAlign='center' verticalAlign='middle' stretched>
                    <Button fluid basic size='massive' color='blue' icon={<Icon color='grey' name='setting' />} content="Global Settings" />
                </Grid.Row>
                <Divider />
                {
                    configFlags.loadSuccess &&
                    <>

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
                                <Popup position='top center' closeOnPortalMouseLeave trigger={
                                    <Button floated='right' circular icon={<Icon name='redo' color='brown' />} />
                                }>
                                    <Popup trigger={<Button size='small' onClick={e => resetKeybindings() } 
                                    content={'Reset to Defaults'} />}>
                                        Confirm
                                        </Popup>
                                </Popup>
                            </Segment>

                        {
                            globals.keybindings.map(k =>
                                (
                                    <KeyBindingBar key={k.command} keybinding={k} setKeybinding={setKeybinding} />
                                )
                            )
                        }

                    </SegmentGroup>


                    </>
            }

                <Divider />

            </Container>
        </>
    );
}

export { ConfigGlobalsPage };