import React from 'react';

import SideNavMenu from '../SideNavMenu';

import './style.css';

export default function BaseStruct( props ) {

    return (
        <div className="base-struct">
            <div className="base-struct-menu">
                <SideNavMenu />
            </div>
            <div className="base-struct-body">
                { props.children }
            </div>
        </div>
    );
}