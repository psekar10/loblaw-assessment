import React from 'react';
import styled from '@emotion/styled';
import LogoSVG from '../assets/logo';

/**
 *  Navbar Layout
 * @returns 
 */
const Navbar = () => (
  <NavbarContainer>
		<LogoSVG height="150px" width="150px"/>
		<h1 style={{paddingLeft: "15px"}}>UI ASSESSMENT</h1>
	</NavbarContainer>
)

export default Navbar;

const NavbarContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: #eceaea;
`;