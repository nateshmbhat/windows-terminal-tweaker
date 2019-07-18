// Shows the screen with 3 main buttons  Globals , Profiles , Schemes
import * as React from 'react';
import { Container, GridColumn, Button, Grid, Icon } from 'semantic-ui-react';
import useReactRouter from 'use-react-router';

const InitialSettingChooser = () => {
    const { history, location, match } = useReactRouter();
    console.log(history, location, match);

    return (
        <Container>
            <div style={{ height: '100vh', display: 'flex', flexDirection: "column", justifyContent: 'space-evenly' }}>
                <Button icon={<Icon name='setting' />} className="BigButton" size="massive" fluid content={"Globals"}
                    onClick={() => history.push('/config/globals')}
                />
                <Button icon={<Icon color='violet'  name='user' />} className="BigButton" size="massive" fluid content={"Profiles"}
                    onClick={() => history.push('/config/profiles')}
                />
                <Button icon={<Icon color='blue' name='theme'  />} className="BigButton" size="massive" fluid content={"Schemes"}
                    onClick={() => history.push('/config/schemes')}
                />
            </div>
        </Container>
    );
}


export { InitialSettingChooser }; 