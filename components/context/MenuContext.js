import React, { useState } from 'react';
import Router from 'next/router';

// menu context handles the open or closed state of the menu,
// get handled in _app.js and called in Nav.js
const MenuContext = React.createContext({
    menuToggle: false,  
    setMenuToggle: () => {},
});

function MenuContextProvider(props){
    const [menuToggle, setMenuToggle] = useState(false);

    // add router event,
    // everytime a link is clicked, close the menu (MenuContext) if it was open
    Router.events.on('routeChangeStart', () => {
        if(menuToggle) setMenuToggle(false);
    })
    // and handle possible error
    Router.events.on('routeChangeError', (err, url) => {
        if (err.cancelled) {
            setMenuToggle(false)
        }
    })

    return(
        <MenuContext.Provider value={{menuToggle, setMenuToggle}}>
            {props.children}
        </MenuContext.Provider>
    )
}

export default MenuContext;
export { MenuContextProvider };