import * as React from 'react';
import { Container, Grid, Button, Divider, Segment, Dropdown, DropdownMenu, DropdownItem, Icon, DropdownDivider, SegmentGroup, Input } from 'semantic-ui-react';
import { useStoreState, useStoreActions } from '../store/store';
import { ColorPickerPopup } from './ColorChangePickerPopUp';
import { NavBar } from './NavBar';


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
    const schemes = useStoreState((state) => state.schemes)
    const [setSpecificScheme , setSchemes] = useStoreActions(actions => [actions.setSpecificScheme,actions.setSchemes ])
    const [curScheme, setCurrentScheme] = React.useState(schemes[0]);
    let curSchemeCopy = { ...curScheme }; //copy wouldnt contain the name property and is used to map data into UI components
    delete curSchemeCopy.name;

    const addNewScheme = () => {
        let newScheme = {...schemes[0]} ;
        newScheme.name=`New Scheme ${(Math.floor(Math.random()*1000))}`
        setSchemes([...schemes , newScheme ]) ; 
    }

    const updateCurrentScheme = (obj: any) => {
        setCurrentScheme({ ...curScheme, ...obj });
        setSpecificScheme({ ...curScheme, ...obj })
    }

    return (
        <>
            <NavBar />

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
                                <Button content='Add New Scheme' fluid onClick={e => addNewScheme()} />
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Segment>


                <SegmentGroup>
                    <Segment>
                        <Input fluid label='Scheme Name' icon={<Icon name='circle outline' />} value={curScheme.name}
                            onChange={e => updateCurrentScheme({ name: e.target.value })}
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

                <Divider/>

            </Container>
        </>

    )
}

export { ConfigSchemesPage }; 