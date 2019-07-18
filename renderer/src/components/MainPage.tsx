import * as React from 'react';
import ConfigPathModal from './ConfigPathModal';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { InitialSettingChooser } from './initialSettingsChooser';
import { ConfigGlobalsPage } from './ConfigGlobals';
import { ConfigProfilesPage } from './ConfigProfiles';
import { ConfigSchemesPage } from './ConfigSchemes';

const MainPage = ()=>{
    return (
        <Router >
            {/* <Route path='/' exact component={ConfigPathModal}  /> */}
            <Route path='/' exact component={InitialSettingChooser}  />
            <Route path='/configpath' exact component={ConfigPathModal}  />
            <Route path='/config/globals' exact component={ConfigGlobalsPage}  />
            <Route path='/config/profiles' exact component={ConfigProfilesPage}  />
            <Route path='/config/schemes' exact component={ConfigSchemesPage}  />
        </Router>
    );
}

export default MainPage ; 