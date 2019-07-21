import * as React from 'react';
import ConfigPathModal from './ConfigPathModal';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { InitialSettingChooser } from './initialSettingsChooser';
import { ConfigGlobalsPage } from './ConfigGlobals';
import { ConfigProfilesPage } from './ConfigProfiles';
import { ConfigSchemesPage } from './ConfigSchemes';
import { NavLinkPaths } from '../types/types';

const MainPage = ()=>{
    return (
        <Router >
            <Route path={NavLinkPaths.home} exact component={InitialSettingChooser}  />
            {/* <Route path={NavLinkPaths} exact component={ConfigPathModal}  /> */}
            <Route path={NavLinkPaths.globals} exact component={ConfigGlobalsPage}  />
            <Route path={NavLinkPaths.profiles} exact component={ConfigProfilesPage}  />
            <Route path={NavLinkPaths.schemes} exact component={ConfigSchemesPage}  />
        </Router>
    );
}

export default MainPage ; 