import Link from "next/link";
import React from 'react';
import styled from '@emotion/styled';
import LogoSVG from '../assets/logo';

/**
 *  Navbar Layout
 * @returns 
 */
const Navbar = () => (
	<Link href="/">
		<AnchorContainer>
			<LogoSVG height="150px" width="150px"/>
			<h1 style={{paddingLeft: "15px"}}>UI ASSESSMENT</h1>
		</AnchorContainer>
	</Link>
)

export default Navbar;

// anchor Styling
const AnchorContainer = styled.a`
	display: flex;
	justify-content: center;
	align-items: center;
	background: #eceaea;
	cursor: pointer;
`;