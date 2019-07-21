import * as React from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { NavLinkPaths } from '../types/types';
import { NavLink } from 'react-router-dom';

export const NavBar = (props: { navPath: NavLinkPaths} ) => {
    return (
        <>
            {/* EMPTY Navbar TO push the below dom content down */}
            <Menu inverted size='large'> </Menu>

            <Menu inverted size='large' fixed='top'  >
                <NavLink to={NavLinkPaths.globals} draggable={false}>
                    <Menu.Item active={props.navPath===NavLinkPaths.globals} icon='setting' name='Globals' link />
                </NavLink>

                <NavLink to={NavLinkPaths.profiles} draggable={false}>
                    <Menu.Item active={props.navPath===NavLinkPaths.profiles } icon='user' name='Profiles' link />
                </NavLink>

                <NavLink to={NavLinkPaths.schemes} draggable={false}>
                    <Menu.Item name='Schemes' active={props.navPath===NavLinkPaths.schemes}  icon='theme' link />
                </NavLink >

                <Menu.Menu position='right'>
                    <NavLink to={NavLinkPaths.home} draggable={false}>
                        <Menu.Item name='Home' active={props.navPath===NavLinkPaths.home} icon={<Icon name='home' color='yellow' />} link />
                    </NavLink>
                </Menu.Menu>
            </Menu>
        </>
    )
}