import * as React from 'react';
import { HashRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { InitialSettingChooser } from './initialSettingsChooser';
import { ConfigGlobalsPage } from './ConfigGlobals';
import { ConfigProfilesPage } from './ConfigProfiles';
import { ConfigSchemesPage } from './ConfigSchemes';
import { NavLinkPaths } from '../types/types';
import ConfigPathModal from './ConfigPathModal';

const MainPage = ()=>{
    return (
        <>
        <ConfigPathModal/>
        <Router >
            <Route path={NavLinkPaths.home} exact component={InitialSettingChooser}  />
            <Route path={NavLinkPaths.globals} exact component={ConfigGlobalsPage}  />
            <Route path={NavLinkPaths.profiles} exact component={ConfigProfilesPage}  />
            <Route path={NavLinkPaths.schemes} exact component={ConfigSchemesPage}  />
        </Router>
        </>
    );
}

export default MainPage ; 