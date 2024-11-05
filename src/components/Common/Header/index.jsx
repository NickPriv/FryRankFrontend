import {useState} from 'react'

import  GoogleLogin from '../../../containers/Common/GoogleLogin';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar className="p-lg-2 sign" color="secondary" dark expand="md">
                <NavbarBrand href='/'>
                    <h1 >FryRank</h1>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href='/restaurants'>Restaurants</NavLink>
                        </NavItem>
                        <NavItem> 
                            <NavLink href="https://www.etsy.com/shop/fryrank/" target="_blank" rel="noopener noreferrer">
                                Merch Shop
                            </NavLink> 
                        </NavItem>
                    </Nav>
                </Collapse>
                <GoogleLogin />
            </Navbar>
        </div>
    )
}