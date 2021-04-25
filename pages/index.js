import Head from 'next/head';
import { useRouter } from 'next/router';
import {useState, useEffect} from 'react';
import styled from '@emotion/styled';
// JS COMPONENTS
import SkeletonLoader from '../components/skeletonloader';
/**
 *  Home Page
 * @returns 
 */
export default function Home() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([]);
  const [pending, setPending] = useState(true);
  /**
   *  Function for the click event
   * @param {*} campaign 
   */
  const handleCampaignClick = (campaign) => {
    window.localStorage.setItem('color', campaign.name);
    router.push(`/campaign/${campaign.id}`)
  }
  /**
   * Function to get the campaign
   */
    async function getCampaign() {
    try {
      let response = await fetch('http://localhost:4000/campaigns');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let result = await response.json();
      if (result.error || result.status === "failed") {
        throw new Error(`Fetch - Update failed. Please check console logs. ${result.error}`);
      }
      setCampaigns(result.campaigns)
    } catch(e) {
      console.error('Error is: ', e);
    } finally {
      setPending(false);
    }
  }
  /**
   *  useEffect - to get the campaigns
   */
  useEffect(() => {
		getCampaign();
  }, [])

  return (
    <>
      <Head>
        <title>Loblaw | Home</title>
        <link rel="canonical" href="" />
        <meta name="description" content="Loblaw Campaign list" />
      </Head>
      <IndexContainer>
        <h2 style={{marginTop:"0"}}>Campaign List</h2>
        { !pending ? (
          <TableWrapper>
            <thead>
              <tr>
                <ThWrapper>ID</ThWrapper>
                <ThWrapper>NAME</ThWrapper>
              </tr>
            </thead>
            <tbody>
              {campaigns.length !== 0 && campaigns.map((campaign, index) => {
                return (
                  <TrWrapper color={campaign.name} key={index} onClick={() => handleCampaignClick(campaign)}>
                    <TdWrapper>{campaign.id}</TdWrapper>
                    <TdWrapper>
                      <div style={{display:"flex"}}>
                        <ColorWrapper color={campaign.name.toLowerCase()} />
                        {campaign.name}
                      </div>

                    </TdWrapper>
                  </TrWrapper>
                )
              })}
            </tbody>
          </TableWrapper>
        ) : (
          <SkeletonLoader count={19} width="500px" />
        )}
      </IndexContainer>
    </>
  )
}
// This is used while hovering the list
const ColorContrast = {
  red: "#FFDBDB",
  green: "#ADFFAD",
  blue: "#DBDBFF",
  yellow: "#121200",
  purple: "#FFC8FF",
  orange: "#241800"
}

/**
 * PAGE STYLING 
 */
// Main Container Styling
const IndexContainer = styled.div({
  margin: "0 auto",
  maxWidth: "500px",
  width: "100%",
  display: "flex",
  flex: "1 1 0%",
  flexDirection:"column",
  justifyContent: "center", 
  alignItems: "center",
})
// Table Wrapper
const TableWrapper = styled.table`
  width: 100%;
  box-shadow: 0px 0px 17px 1px #a7a7a7;
  thead {
    background: gray;
    color: white;
    font-size: 18px;
  }
`;
// Tr Wrapper
const TrWrapper = styled.tr`
  color: black
  font-weight: 700;
  cursor: pointer;
  &:hover {
		background-color: ${({ color }) => color.toLowerCase()};
    color: ${({ color }) => ColorContrast[color.toLowerCase()]};
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
const ColorWrapper = styled.div`
  background: ${({ color }) => color};
  height: 20px;
  width: 20px;
  margin-right: 10px;
  border-radius: 50%
`;
