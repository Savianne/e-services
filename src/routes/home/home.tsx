import React from "react";
import { ParallaxBanner } from 'react-scroll-parallax';
import { styled } from "@mui/material/styles";

import { IStyledFC } from "../../app/IStyledFC";
import { IBrgyOrgChart } from "../../app/OrganizationalChart";

import SiteMapBoard from "../../app/SiteMapBoard";

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

  @media screen and (max-width: 1045px) {
    & {
      justify-content: left;
    }
  }
`;


const Home: React.FC = () => {

  return (
    <>
      <SiteMapBoard>
          Welcome, Admin Apple Jane De Guzman
      </SiteMapBoard>
      <HomePageContainer>
        <ParallaxTitle title="ABOUT" img="/assets/images/community-parallax-img.jpg" />
        <Content>
          <TextContent>
            <Typography>
              The Macedonian Personal Ministry, Inc (MPM) was originally conceptualized by Pastor 
              Ferdinand S. Florez of the Church of Christ at Roxas, Isabela in 2018. Although, it 
              took a whole year of planning, promotion, and collaboration. It was formally launched 
              in June 2019. Some of the Churches of Christ pastors who also spearheaded the MPM 
              launching were Pastor Art Santiago of Las Pinas, Pastor Ephraim Sison of Balic-Balic, 
              Pastor Vher Palang of Project 7, and many others. MPM was registered with the Security 
              Exchange Commission on November 26, 2019. Today, there are hundreds of leaders and church 
              members of the Churches of Christ in the Philippines and abroad who have already joined 
              and committed to this personal ministry.
            </Typography>
          </TextContent>
        </Content>
        <ParallaxTitle title="MISSION" img="/assets/images/mission.jpg" />
        <Content>
          <TextContent>
            <Typography>
              Macedonian Personal Ministry (MPM) is a faith-based and non-profit organization within the 
              Churches of Christ and Christian Churches whose main goal is to fulfill the Great Commission 
              stated in Matthew 28:19-20. MPM also wants to fulfill Jesus Christ’s commands for believers 
              to serve one another in love.
            </Typography>
          </TextContent>
        </Content>
        <ParallaxTitle title="VISION" img="/assets/images/vision.png" />
        <Content>
          <TextContent>
            <Typography>
              In conjunction with local churches,  MPM leaders travel around the country to visit churches that 
              seek assistance through the training provided by MPM’s faithful, dedicated and hardworking pastors 
              and leaders. Seminars and workshops are held to introduce and share MPM’s vision to obey Jesus Christ’s 
              command to spread the Gospel as well as teaching believers to desire continued spiritual growth and 
              maturity hence be propagators of the Gospel, too.
            </Typography>
          </TextContent>
        </Content>
        <Content>
          <Divider orientation="horizontal" flexItem/>
          <HeaderText>Organizational Chart</HeaderText>
        </Content>
        <OrganizationalChartContainer>
          <BrgyOrganizationalChart />
        </OrganizationalChartContainer>
      </HomePageContainer>
    </>
  )
}

export default Home;