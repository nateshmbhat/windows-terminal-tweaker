// Shows the screen with 3 main buttons  Globals , Profiles , Schemes
import * as React from 'react';
import { Container, GridColumn, Button, Grid, Icon } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { NavLinkPaths } from '../types/types';

const InitialSettingChooser = () => {
    return (
        <Container>
            <div style={{ height: '100vh', display: 'flex', flexDirection: "column", justifyContent: 'space-evenly' }}>
                <NavLink to={NavLinkPaths.globals}>
                    <Button icon={<Icon name='setting' />} className="BigButton" size="massive" fluid content={"Globals"} />
                </NavLink>


                <NavLink to={NavLinkPaths.profiles}>
                    <Button icon={<Icon color='violet' name='user' />} className="BigButton" size="massive" fluid content={"Profiles"}
                    />
                </NavLink>

                <NavLink to={NavLinkPaths.schemes}>
                    <Button icon={<Icon color='blue' name='theme' />} className="BigButton" size="massive" fluid content={"Schemes"}
                    />
                </NavLink>
            </div>
        </Container>
    );
}


export { InitialSettingChooser }; 