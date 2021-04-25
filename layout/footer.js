import React from 'react';
import styled from '@emotion/styled';

/**
 * Footer Component
 * @returns 
 */
const Footer = () => (
  <NavbarContainer>
		<p>This is developed by Parthipan Sekar</p>
	</NavbarContainer>
)

export default Footer;

// Footer Styling
const NavbarContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: black;
	color: white
`;