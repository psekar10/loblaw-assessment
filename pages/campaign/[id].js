import Link from "next/link";
import { useRouter } from 'next/router'
import {useState, useEffect} from 'react';
import styled from '@emotion/styled';

const Campaign = () => {
	const router = useRouter();
	const {query: {id}} = router;
	// State Initialization
	const [timerCount, setTimerCount] = useState(0)
	const [campaignDetails, setCampaignDetails] = useState([]);
	const [summmationCampaignDetails, setSummmationCampaignDetails] = useState([]);
	const [errorOccured, setErrorOccured] = useState(false);
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
		}
	}

	console.log('campaignDetails', campaignDetails);
	console.log('summmationCampaignDetails', summmationCampaignDetails);
	console.log('timerCount', timerCount)
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
			<CampaignContainer>
				{!errorOccured ? (
					<>
						<Link href="/">
							<a style={{alignSelf:"flex-start", marginBottom:"20px"}}>Back</a>
						</Link>
						
						<TableWrapper>
							<tbody>
								<TrWrapper>
									<TdWrapper>Pull</TdWrapper>
									<TdWrapper>{timerCount}</TdWrapper>
								</TrWrapper>
								<TrWrapper>
									<TdWrapper>Most Recent Impressions</TdWrapper>
									<TdWrapper>{campaignDetails.impressions}</TdWrapper>
								</TrWrapper>
								<TrWrapper>
									<TdWrapper>Most Recent Clicks</TdWrapper>
									<TdWrapper>{campaignDetails.clicks}</TdWrapper>
								</TrWrapper>
								<TrWrapper>
									<TdWrapper>Most Recent Users</TdWrapper>
									<TdWrapper>{campaignDetails.users}</TdWrapper>
								</TrWrapper>
								<TrWrapper>
									<TdWrapper>Most Recent CTR</TdWrapper>
									<TdWrapper>{((campaignDetails.clicks/campaignDetails.impressions)/100).toFixed(5)}</TdWrapper>
								</TrWrapper>

								<TrWrapper>
									<TdWrapper>Total Impressions</TdWrapper>
									<TdWrapper>{summmationCampaignDetails.impressions}</TdWrapper>
								</TrWrapper>
								<TrWrapper>
									<TdWrapper>Total Clicks</TdWrapper>
									<TdWrapper>{summmationCampaignDetails.clicks}</TdWrapper>
								</TrWrapper>
								<TrWrapper>
									<TdWrapper>Total Users</TdWrapper>
									<TdWrapper>{summmationCampaignDetails.users}</TdWrapper>
								</TrWrapper>
								<TrWrapper>
									<TdWrapper>Total CTR</TdWrapper>
									<TdWrapper>{((summmationCampaignDetails.clicks/summmationCampaignDetails.impressions)/100).toFixed(5)}</TdWrapper>
								</TrWrapper>

							</tbody>					
						</TableWrapper>
					</>
				) : (
					<>
						<p>ERROR OCCURED</p>
						<Link href="/">GO TO HOME PAGE</Link>
					</>
				)}
			</CampaignContainer>
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
`;
// TH styling
const ThWrapper = styled.th`
  text-transform: uppercase;
  padding: 15px;
  text-align: left;
`;
// TD styling
const TdWrapper = styled.td`
  padding: 15px;
  text-align: left;
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