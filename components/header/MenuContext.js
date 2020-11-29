// testing all router click events
// we will also need to handle redirects!?? DO WE? TODO
import Router from 'next/router';

// menu context handles the open or closed state of the menu,
// get handled in _app.js and called in Nav.js
const MenuContext = React.createContext({
    menuOpen: true,  
    toggleMenu: () => {},
});

class MenuContextComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = { // we use state to feed MenuContext
            menuOpen: false,
            toggleMenu: this.toggleMenu,
        }

        // add router event,
        // everytime a link is clicked, close the menu (MenuContext) if it was open
        Router.events.on('routeChangeStart', this.resetMenu)
        // and handle possible error
        Router.events.on('routeChangeError', (err, url) => {
            if (err.cancelled) {
                this.resetMenu()
            }
        })
    }

    toggleMenu = () => { // gets called by menu button, changes MenuContext via state
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }
    resetMenu = () => { // gets called on routerchange, changes MenuContext via state
        if(this.state.menuOpen){
            this.setState({ menuOpen: false })
        }
    }
    render(){
        return(
            <MenuContext.Provider value={this.state}>
                {this.props.children}
            </MenuContext.Provider>
        )
    }
}

export default MenuContextComponent;
export { MenuContext };