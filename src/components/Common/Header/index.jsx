import {useState} from 'react'

import  GoogleLogin from '../../../containers/Common/GoogleLogin';
import logo from '../../../FryRankLogo.png';
import style from "./style.module.css"
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className={style.Header}>
            <Navbar className="p-lg-2 sign" dark expand="md">
                
                <NavbarBrand href='/'>
                    <img src={logo} className={style.FryRank} alt="FryRank" />
                </NavbarBrand>
                
                <NavbarToggler onClick={toggle} />
                
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href='/restaurants'>
                                <h4>Restaurants</h4>
                            </NavLink>
                        </NavItem>
                        <NavItem> 
                            <NavLink href="https://www.etsy.com/shop/fryrank/" target="_blank" rel="noopener noreferrer">
                                <h4> Merch Shop </h4>
                            </NavLink> 
                        </NavItem>
                    </Nav>
                </Collapse>          
            
            </Navbar> 
            <GoogleLogin/>                
        </div>
    )
}