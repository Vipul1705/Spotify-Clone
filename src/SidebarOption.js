import React from 'react';
import './SidebarOption.css';

function SidebarOption({title="test",Icon}) {
    return (
        <div className="option">
            {Icon && <Icon className="option_icon"/>}
            {Icon ? <h4>{title}</h4>:<p>{title}</p>}
        </div>
    )
}

export default SidebarOption
