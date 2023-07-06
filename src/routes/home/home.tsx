import React, { useEffect, useState } from "react";
import { ParallaxBanner } from 'react-scroll-parallax';
import { styled } from "@mui/material/styles";

import { IStyledFC } from "../../app/IStyledFC";
import { IBrgyOrgChart } from "../../app/OrganizationalChart";
import useGetSKTerms from "../../API/hooks/useGetSKTerms";
import useGetTerms from "../../API/hooks/useGetTerms";
import SiteMapBoard from "../../app/SiteMapBoard";

import { useContext } from "react";
import { AdminAccountContextProvider } from "../../context/adminAccountContext";

//MUI Component
import {
    Box,
    Typography,
    Divider
} from '@mui/material';

import { Container, Content } from "../../app/AppLayout";

import ParallaxTitle from "../../app/ParallaxTitle";
import BrgyOrganizationalChart from "../../app/OrganizationalChart";

const HomePageContainer = styled(Container)`
    padding: 0;
    flex-wrap: wrap;
    height: fit-content;
    min-width: 0;
`;

const TextContent = styled(Box)`
  padding: 30px 0;
  text-align: justify;
`;

const HeaderText = styled(Typography)`
  display: flex;
  flex: 0 1 100%;
  justify-content: center;
  height: fit-content;
  font-size: 45px;
  font-weight: bold;
`;

const WrapingContent = styled(Content)`
  flex-wrap: wrap;
`;

const OrganizationalChartContainer = styled(Box)`
  display: flex;
  flex: 0 1 100%;
  overflow-x: auto;
  justify-content: center;
  padding: 30px 0;
  min-width: 0;

  /* @media screen and (max-width: 1045px) {
    & {
      justify-content: left;
    }
  } */
`;


const Home: React.FC = () => {
  const adminInfo = useContext(AdminAccountContextProvider);

  const {data: skTerm} = useGetSKTerms();
  const {data: barangayTerm} = useGetTerms();
  const [orgChart, setOrgChart] = useState<null | IBrgyOrgChart>(null);

  useEffect(() => {
    if(skTerm && barangayTerm) {
      const brgyOrgChart: IBrgyOrgChart = {
        punongBarangay: {
          name: `${barangayTerm[0].barangayChairperson.firstName} ${barangayTerm[0].barangayChairperson.middleName[0]}. ${barangayTerm[0].barangayChairperson.surname} ${barangayTerm[0].barangayChairperson.extName? barangayTerm[0].barangayChairperson.extName : ''}`.toUpperCase(),
          role: 'Barangay Chairperson',
          avatar: barangayTerm[0].barangayChairperson.picture
        },
        secretary: {
          name: `${barangayTerm[0].barangaySecretary.firstName} ${barangayTerm[0].barangaySecretary.middleName[0]}. ${barangayTerm[0].barangaySecretary.surname} ${barangayTerm[0].barangaySecretary.extName? barangayTerm[0].barangaySecretary.extName : ''}`.toUpperCase(),
          role: 'Barangay Secretary',
          avatar: barangayTerm[0].barangaySecretary.picture
        },
        treasurer: {
          name: `${barangayTerm[0].barangayTreasurer.firstName} ${barangayTerm[0].barangayTreasurer.middleName[0]}. ${barangayTerm[0].barangayTreasurer.surname} ${barangayTerm[0].barangayTreasurer.extName? barangayTerm[0].barangayTreasurer.extName : ''}`.toUpperCase(),
          role: 'Barangay Treasurer',
          avatar: barangayTerm[0].barangayTreasurer.picture
        },
        kagawad: [...barangayTerm[0].barangayCouncilors.map(item => (
          {
            name: `${item.firstName} ${item.middleName[0]}. ${item.surname} ${item.extName? item.extName : ''}`.toUpperCase(),
            role: `Barangay Counsilor - ${item.committee}`,
            avatar: item.picture
          }
        ))],
        skChairPerson: {
          chairPerson: {
            name: `${skTerm[0].skChairperson.firstName} ${skTerm[0].skChairperson.middleName[0]}. ${skTerm[0].skChairperson.surname} ${skTerm[0].skChairperson.extName? skTerm[0].skChairperson.extName : ''}`.toUpperCase(),
            role: 'SK Chairperson',
            avatar: skTerm[0].skChairperson.picture
          },
          skSecretary: {
            name: `${skTerm[0].skSecretary.firstName} ${skTerm[0].skSecretary.middleName[0]}. ${skTerm[0].skSecretary.surname} ${skTerm[0].skSecretary.extName? skTerm[0].skSecretary.extName : ''}`.toUpperCase(),
            role: 'SK Secretary',
            avatar: barangayTerm[0].barangaySecretary.picture
          },
          skTreasurer: {
            name: `${skTerm[0].skTreasurer.firstName} ${skTerm[0].skTreasurer.middleName[0]}. ${skTerm[0].skTreasurer.surname} ${skTerm[0].skTreasurer.extName? skTerm[0].skTreasurer.extName : ''}`.toUpperCase(),
            role: 'SK Treasurer',
            avatar: barangayTerm[0].barangayTreasurer.picture
          },
          skKagawad: [
            ...skTerm[0].skCouncilors.map(item => ({
              name: `${item.firstName} ${item.middleName[0]}. ${item.surname} ${item.extName? item.extName : ''}`.toUpperCase(),
              role: `SK Councilor - ${item.committee}`,
              avatar: item.picture
            }))
          ]
        }
      }

      setOrgChart(brgyOrgChart);
    }
  }, [skTerm, barangayTerm])
  return (
    <>
      <SiteMapBoard>
          Welcome, Admin {adminInfo?.name as string}
      </SiteMapBoard>
      <HomePageContainer>
        <ParallaxTitle title="ABOUT" img="/assets/images/community-parallax-img.jpg" />
        <Content>
          <TextContent>
            <Typography>
            Barangay Sandiat Centro is a barangay located in the municipality of San Manuel in the province of Isabela, Philippines.
Isabela is a province in the Cagayan Valley region of the country. San Manuel is one of the municipalities within
the province and is situated in the southern part of Isabela. As a barangay, Sandiat Centro serves as the smallest 
administrative division in the Philippines. It is headed by a barangay captain or chairman who is elected by the residents. 
The barangay government is responsible for implementing local policies, providing basic services, and addressing the needs 
of its constituents. Barangay Sandiat Centro, like other barangays, has its own barangay hall or office where local affairs 
are conducted. The barangay hall serves as a venue for community meetings, events, and gatherings. It is also where residents 
can seek assistance, report concerns, or avail of barangay services.
            </Typography>
          </TextContent>
        </Content>
        <ParallaxTitle title="MISSION" img="/assets/images/mission.jpg" />
        <Content>
          <TextContent>
            <Typography>
              The barangay shall provide the people wit basic learning and facilities which on the Republic Act 9003
              which is the Ecological Solid Waste Management to achieve Environmental change or to have quality and
              Health surrounding as per committed to the implementation on the R.A. 9003.
            </Typography>
          </TextContent>
        </Content>
        <ParallaxTitle title="VISION" img="/assets/images/vision.png" />
        <Content>
          <TextContent>
            <Typography>
              Our VISION within the next year, people/constituents of Barangay Sandiat Centro shall be imbued with
              sense of responsibility, protect care and change of environmental quality that conducive to their well
              being ang our next generation.
            </Typography>
          </TextContent>
        </Content>
        <Content>
          <Divider orientation="horizontal" flexItem/>
          <HeaderText>Organizational Chart</HeaderText>
        </Content>
        <OrganizationalChartContainer>
          {
            orgChart && <BrgyOrganizationalChart org={orgChart} />
          }  
        </OrganizationalChartContainer>
      </HomePageContainer>
    </>
  )
}

export default Home;