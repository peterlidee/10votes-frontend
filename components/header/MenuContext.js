import React from 'react';

// menu context handles the open or closed state of the menu,
// get handled in _app.js and called in Nav.js
const MenuContext = React.createContext({
    menuOpen: true,  
    toggleMenu: () => {},
});  

export default MenuContext;