import * as React from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { NavLinkPaths } from '../types/types';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
    return (
        <>
            {/* EMPTY Navbar TO push the below dom content down */}
            <Menu inverted size='large'>
                
            </Menu>

            <Menu inverted size='large' fixed='top'  >
                <NavLink to={NavLinkPaths.globals}>
                    <Menu.Item icon='setting' name='Globals' link />
                </NavLink>

                <NavLink to={NavLinkPaths.profiles}>
                    <Menu.Item icon='user' name='Profiles' link />
                </NavLink>

                <NavLink to={NavLinkPaths.schemes}>
                    <Menu.Item name='Schemes' icon='theme' link />
                </NavLink >

                <Menu.Menu position='right'>
                    <NavLink to={NavLinkPaths.home}>
                        <Menu.Item name='Home' icon={<Icon name='home' color='yellow' />} link />
                    </NavLink>
                </Menu.Menu>
            </Menu>
        </>
    )
}