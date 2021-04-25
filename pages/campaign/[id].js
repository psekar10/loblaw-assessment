import Head from 'next/head';
import Link from "next/link";
import { useRouter } from 'next/router'
import {useState, useEffect} from 'react';
import styled from '@emotion/styled';
// JS COMPONENT
import SkeletonLoader from '../../components/skeletonloader';
// SVG
import BackSVG from '../../assets/back'
import ErrorSVG from '../../assets/error'

const Campaign = () => {
	const router = useRouter();
	const {query: {id}} = router;
	const color = global.window && global.window.localStorage.getItem('color');
	// State Initialization
	const [timerCount, setTimerCount] = useState(0);
	const [campaignDetails, setCampaignDetails] = useState([]);
	const [summmationCampaignDetails, setSummmationCampaignDetails] = useState([]);
	const [errorOccured, setErrorOccured] = useState(false);
	const [pending, setPending] = useState(true)
	async function getCampaign(timerCount) {
		try {
			let response = await fetch(`http://localhost:4000/campaigns/${id}?number=${timerCount}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			let result = await response.json();
			if (result.error || result.status === "failed") {
				throw new Error(`Fetch - Update failed. Please check console logs. ${result.error}`);
			}
			setCampaignDetails(result);
			(summmationCampaignDetails.length === 0 ) ? 
				setSummmationCampaignDetails(result) :  
				setSummmationCampaignDetails({
					impressions: summmationCampaignDetails.impressions + result.impressions,
					clicks : summmationCampaignDetails.clicks + result.clicks,
					users : summmationCampaignDetails.users + result.users
				})

			setTimerCount(timerCount => timerCount+1);
		} catch(e) {
			console.error('Error is: ', e);
			setErrorOccured(true);
		} finally {
			setPending(false);
		}
	}
  useEffect(() => {
		let intervalID
		if (id !== undefined) {
			intervalID = window.setInterval(getCampaign, 5000, timerCount);
		}
		return () => {
			clearInterval(intervalID)
		}
  }, [id, timerCount])

  useEffect(() => {
		if (id !== undefined) {
			getCampaign(timerCount)
		}
  }, [id])
  return (
		<>
			<Head>
				<title>Loblaw | Performance metrics</title>
				<meta name="robots" content="noindex, nofollow" />
			</Head>
			<CampaignContainer>
				{!pending ? (
					!errorOccured ? (
						<>
							<Heading2>Performance Metrics - <span style={{color: color && color.toLowerCase()}}>{color}</span> campaign</Heading2>
							<Link href="/">
								<AnchorTag>
									<BackSVG height="25px" width="25px"/>
								</AnchorTag>
							</Link>
							<TableWrapper>
								<tbody>
									<TrWrapper>
										<td>Current Number</td>
										<td>{timerCount-1}</td>
									</TrWrapper>
									<TrWrapper>
										<td>Most Recent Impressions</td>
										<td>{campaignDetails.impressions}</td>
									</TrWrapper>
									<TrWrapper>
										<td>Most Recent Clicks</td>
										<td>{campaignDetails.clicks}</td>
									</TrWrapper>
									<TrWrapper>
										<td>Most Recent Users</td>
										<td>{campaignDetails.users}</td>
									</TrWrapper>
									<TrWrapper>
										<td>Most Recent CTR</td>
										<td>{((campaignDetails.clicks/campaignDetails.impressions)/100).toFixed(7)}</td>
									</TrWrapper>

									<TrWrapper>
										<td>Total Impressions</td>
										<td>{summmationCampaignDetails.impressions}</td>
									</TrWrapper>
									<TrWrapper>
										<td>Total Clicks</td>
										<td>{summmationCampaignDetails.clicks}</td>
									</TrWrapper>
									<TrWrapper>
										<td>Total Users</td>
										<td>{summmationCampaignDetails.users}</td>
									</TrWrapper>
									<TrWrapper>
										<td>Total CTR</td>
										<td>{((summmationCampaignDetails.clicks/summmationCampaignDetails.impressions)/100).toFixed(7)}</td>
									</TrWrapper>

								</tbody>					
							</TableWrapper>
						</>
					) : (
						<>
							<ErrorSVG height="150px" width="150px"/>
							<Link href="/">GO TO HOME PAGE</Link>
						</>
					)
				) : (
					<SkeletonLoader count={25} width="500px" />
				)}

			</CampaignContainer>
		</>
	)
}

export default Campaign;

/**
 * PAGE STYLING 
 */
// Main Container Styling
const CampaignContainer = styled.div({
  margin: "0 auto",
	maxWidth: "500px",
	width: "100%",
  display: "flex",
	flex: "1 1 0%",
	flexDirection: "column",
  justifyContent: "center", 
  alignItems: "center",
})
const TrWrapper = styled.tr`
  background-color: white;
  color: black
  font-size: 18px;
  font-weight: 700;
	&:nth-of-type(odd) {
		background-color: lightgray;
	}
	td {
		padding: 15px;
		text-align: left;
	}
	td:nth-of-type(2) {
		width: 150px;
	}
`;
const TableWrapper = styled.table`
  width: 100%;

  box-shadow: 0px 0px 17px 1px #a7a7a7;
  thead {
    background: black;
    color: white;
    font-size: 18px;
  }
`;
const Heading2 = styled.h2`
	@media (max-width: 768px) {
		text-align: center;
	}
	span {
		text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
		letter-spacing: 2px;
	}
`;
const AnchorTag = styled.a`
	align-self: flex-start;
	margin-bottom: 20px;
	cursor: pointer;
	@media (max-width: 768px) {
		padding-left: 20px;
	}
`;