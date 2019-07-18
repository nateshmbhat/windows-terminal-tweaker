import * as React from 'react';
import { Container, Button, Grid, Segment, Divider, Input, Dropdown } from 'semantic-ui-react';
import { useStoreState, useStoreActions } from '../store/store';

const ConfigGlobalsPage = () => {
    const [globals ,profiles ]= useStoreState((state) => [state.globals,state.profiles])
    const setGlobals = useStoreActions((actions) => actions.setGlobals);
    console.log(globals)
    return (
        <Container>
            <br />
            <Grid.Row centered textAlign='center' verticalAlign='middle' stretched>
                <Button fluid basic size='huge' color='blue' content="Globals" />
            </Grid.Row>
            <Divider />

            <Dropdown button selection fluid labeled floating icon='setting' size='large' className='icon' text={'Default Profile : ' + (profiles.filter(e=>e.guid===globals.defaultProfile)[0].name) }
            value={globals.defaultProfile}
                options={profiles.map(profile=>({
                    text : profile.name , 
                    value : profile.guid, 
                    description : profile.guid  , 
                    active : profile.guid===globals.defaultProfile
                }))
            }
                onChange={(e,data) => {
                    console.log(e , data) ; 
                    if(typeof data.value=='string')
                        setGlobals({ ...globals, defaultProfile: data.value })
                }}
                />

            <Segment fluid size='big' color='purple'  >
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
                    <Dropdown text="Requested Theme" defaultSelectedLabel={globals.requestedTheme} className='icon' icon='theme' floating labeled button >
                        <Dropdown.Menu >
                            <Dropdown.Item onClick={() => {
                                setGlobals({ ...globals, requestedTheme: 'system' })
                            }} label={{ color: 'blue', empty: true, circular: true }} text='System' />

                            <Dropdown.Item onClick={() => {
                                setGlobals({ ...globals, requestedTheme: 'light' })
                            }} label={{ color: 'grey', empty: true, circular: true }} text='Light' />

                            <Dropdown.Item onClick={() => {
                                setGlobals({ ...globals, requestedTheme: 'dark' })
                            }} label={{ color: 'black', empty: true, circular: true }} text='Dark' />

                        </Dropdown.Menu>
                    </Dropdown>
                </Segment>
            </Grid.Column>
        </Container>
    );
}

export { ConfigGlobalsPage };