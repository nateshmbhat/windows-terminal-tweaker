import * as React from 'react';
import { Container, Grid, Button, Divider, Segment, Dropdown, DropdownMenu, DropdownItem, Icon, DropdownDivider, SegmentGroup, Input } from 'semantic-ui-react';
import { useStoreState } from '../store/store';
const ConfigSchemesPage = () => {

    const [schemes] = useStoreState((state) => [state.schemes])
    const [curScheme, setCurrentScheme] = React.useState(schemes[0]);

    const addNewScheme = () => {

    }

    const updateCurrentTheme = (obj: any) => {
        setCurrentScheme({ ...curScheme, ...obj });
    }

    return (
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
                            return <DropdownItem key={p.name} text={p.name} value={p.name} selected={p.name === curScheme.name} active={p.name === curScheme.name} onClick={e => setCurrentScheme(p)}
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
                        onChange={e => updateCurrentTheme({ name: e.target.value })}
                    />
                </Segment>

                <Segment>
                    <Input fluid label='Background' value={curScheme.background} onChange={e => updateCurrentTheme({ background: e.target.value })} />
                </Segment>


            </SegmentGroup>

        </Container>
    )
}

export { ConfigSchemesPage }; 