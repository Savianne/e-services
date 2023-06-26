import React from "react";
import styled from "styled-components";
import { Box } from "@mui/material";
import { Slide, Hinge, JackInTheBox, Fade } from "react-awesome-reveal";
import ResidenceLogin from "./ResidenceLogin";
import BrgyOrganizationalChart from "../../app/OrganizationalChart";
import ContactUs from "./ContactUs";
import ResidentsRequestInteface from "./ResidentsRequestInteface";



const BaseContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  flex: 0 1 100%;
  min-width: 0;
  height: 100vh;
  background-color: rgb(224, 224, 224);
    overflow: auto;

    .title {
        display: flex;
        flex: 0 1 100%;
        font-size: 30px;
        justify-content: center;
        font-weight: 600;
        padding: 20px;
        margin: 0;
    }
`;

const BannerContainer = styled.div`
    position: relative;
    display: flex;
    flex: 0 1 100%;
    height: 600px;
    background-image: url(/assets/images/barangay.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    @media screen and (max-width: 820px) {
        & {
            transition: height 300ms;
            height: 900px;
            background-position: 20%;
        }
    }

    @media screen and (max-width: 560px) {
        & {
            transition: height 300ms;
            height: 1000px;
            background-position: 20%;
        }
    }

    @media screen and (max-width: 510px) {
        & {
            transition: height 300ms;
            height: 1100px;
            background-position: 20%;
        }
    }

    
    @media screen and (max-width: 475px) {
        & {
            transition: height 300ms;
            height: 900px;
            background-position: 20%;
        }
    }
    
    @media screen and (max-width: 415px) {
        & {
            transition: height 300ms;
            height: 1000px;
            background-position: 20%;
        }
    }
    @media screen and (max-width: 360px) {
        & {
            transition: height 300ms;
            height: 1050px;
            background-position: 20%;
        }
    }
    @media screen and (max-width: 360px) {
        & {
            transition: height 300ms;
            height: 1100px;
            background-position: 20%;
        }
    }
`;

const ImageFilter = styled(Box)`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    height: 100%;
    width: 100%;
    color: white;
    /* background-color: blue; */
    background: linear-gradient(270deg, rgba(75,15,90,0.2262) 9.84%, rgba(75,15,90,0.5616) 32.8%, rgba(46,13,57,0.6474) 60.79%, rgba(55,22,67,0.774016) 85.13%);
`;

const BannerContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 30px 30px 0 30px;
    background: transparent;

    @media screen and (max-width: 820px) {
        & {
            flex-wrap: wrap;
        }
    }

    @media screen and (max-width: 620px) {
        & {
            justify-content: center;
        }
    }
`;


const SystemLogo = styled.div`
    display: inline-block;
    height: fit-content;
    width: fit-content;

    img {
        width: 200px;
    }
`;

const SystemText = styled.div`
    display: flex;
    flex-wrap: wrap;
    color: white;
    padding-left: 25px;
    margin-left: 35px;
    border-left: 10px solid white;
    height: fit-content;

    .slide {
        flex: 0 1 100%;
    }

    .slide-p {
        flex: 0 1 700px;
    }

    h1 {
        font-size: 50px;
        font-weight: 600;
        padding: 0;
        margin: 0;
    }

    p {
        text-align: justify;
    }
    
    @media screen and (max-width: 475px) {
        h1 {
            font-size: 30px;
        } 
    }

    @media screen and (max-width: 380px) {
        & {
            margin-left: 10px;
        } 
    }
`;

const ContentCategory = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: fit-content;
    
    h1 {
        flex: 0 1 100%;
        border-bottom: 1px solid #b7b7b74d;
        text-align: center;
        padding-bottom: 30px;
    }

    .content {
        display: flex;
        flex-wrap: wrap;
        gap: 50px;
        flex: 0 1 100%;
        justify-content: center;
        align-items: center;
        height: fit-content;
        background-color: rgb(236 243 254);

        img {
            height: 400px;
        }

        p {
            width: 600px;
            text-align: justify;
        }

        .residence-login-area,
        .residents-request-interface {
            display: flex;
            flex: 0 1 100%;
            justify-content: center;
            margin-bottom: 50px;
        }
    }

    /* @media screen and (max-width: 1045px) {
    & {
      justify-content: left;
    } */
  }

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

const PublicPage: React.FC = () => {
    
    return (
    <BaseContainer>
        <BannerContainer>
            <ImageFilter />
            <BannerContent>
                <SystemLogo>
                    <img src="/logo.png" alt="Sandiat Centro" />
                </SystemLogo>
                <SystemText>
                    <JackInTheBox cascade className="slide" >
                        <h1>Barangay</h1>
                    </JackInTheBox>
                    <JackInTheBox cascade className="slide" >
                        <h1>Sandiat Centro</h1>
                    </JackInTheBox>
                    <JackInTheBox cascade className="slide" >
                        <h1>Information &</h1>
                    </JackInTheBox>
                    <JackInTheBox cascade className="slide" >
                        <h1>E-Services System</h1>
                    </JackInTheBox>
                    <JackInTheBox cascade className="slide-p" >
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                        standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a 
                        type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining 
                        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                        passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                        </p>
                    </JackInTheBox>
                </SystemText>
            </BannerContent>
        </BannerContainer>
        <ContentCategory>
            <div className="content">
                <h1>E-Services</h1>
                <div className="content">
                    <Fade>
                        <img src="/assets/images/e-services.png" />
                    </Fade>
                    <Fade>
                        <p>Welcome to Sandiat Centro's cutting-edge e-services system, revolutionizing how you access essential barangay documents. 
                            Bid farewell to tiresome queues and paperwork woes! Our user-friendly platform empowers you to effortlessly request vital 
                            documents like barangay indigency, certification, and residency with just a few clicks. Stay informed about the status of 
                            your requests, receive prompt updates, and choose your preferred document delivery method. At Sandiat Centro, we prioritize 
                            your satisfaction and continuously enhance our services based on your valuable feedback. Embrace the future of barangay 
                            transactions and experience seamless digital convenience.</p>
                    </Fade>
                </div>
                <div className="residence-login-area">
                    <ResidenceLogin />
                </div>
                {/* <div className="residents-request-interface">
                    <ResidentsRequestInteface />
                </div> */}
            </div>
        </ContentCategory>
        <h1 className="title">Organizationan Chart</h1>
        <OrganizationalChartContainer>
          <BrgyOrganizationalChart />
        </OrganizationalChartContainer>
        <h1 className="title">Contact us</h1>
        <ContactUs />
    </BaseContainer>
    )
}

export default PublicPage;