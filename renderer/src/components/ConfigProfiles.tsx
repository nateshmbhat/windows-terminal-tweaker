import * as React from 'react';
import { useStoreActions, useStoreState } from '../store/store';
import { Container, Grid, Button, Divider, Dropdown, Segment, SegmentGroup, Input } from 'semantic-ui-react';
const ConfigProfilesPage = () => {
    const [profiles] = useStoreState((state) => [state.profiles])
    const setProfiles = useStoreActions((actions) => actions.setProfiles);

    const [curProfile, setCurrentProfile] = React.useState(profiles[0]);

    console.log(profiles)
    return (
        <Container>
            <br />
            <Grid.Row centered textAlign='center' verticalAlign='middle' stretched>
                <Button fluid basic size='huge' color='blue' content="Profiles" />
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
                        <Button toggle active={curProfile.closeOnExit} content='Close on Exit' />
                        <Button toggle active={curProfile.snapOnInput} content='Snap on Input' />
                        <Button toggle active={curProfile.useAcrylic} content='Use Acrylic' />
                    </Grid.Row>
                </Segment>

                <Segment>
                    <Input label='Profile ID' value={curProfile.guid} />
                </Segment>

                <Segment>
                    <Input label='Profile Name' value={curProfile.name} />
                </Segment>

                <Segment>

                    <Segment>
                        <Input label='Background' value={curProfile.background} />
                    </Segment>
                    <Segment>
                        <Input label='Font face' value={curProfile.fontFace} />

                    </Segment>

                    <Segment>
                        <Input label='Command Line' value={curProfile.commandline} />
                    </Segment>

                    <Segment>
                        <Input label='History Size' value={curProfile.historySize} type='number' />
                    </Segment>

                    <Segment>
                        <Input type='number' label='Font Size' value={curProfile.fontSize} />
                    </Segment>
                    <Segment>
                        <Input label='Icon' value={curProfile.icon} />
                    </Segment>

                    <Segment>
                        <Input type='number' label='Acrylic opacity' value={curProfile.acrylicOpacity} />
                    </Segment>
                    <Input label='Padding' value={curProfile.padding} />
                </Segment>

                <Segment>
                    <Input label='Starting Directory' value={curProfile.startingDirectory} />
                </Segment>

            </SegmentGroup>

        </Container>
    );
}

export { ConfigProfilesPage }; 