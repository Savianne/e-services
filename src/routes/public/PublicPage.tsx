import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Box, Backdrop, CircularProgress, IconButton, Tooltip, Button } from "@mui/material";
import { Slide, Hinge, JackInTheBox, Fade } from "react-awesome-reveal";
import ResidenceLogin from "./ResidenceLogin";
import BrgyOrganizationalChart from "../../app/OrganizationalChart";
import ContactUs from "./ContactUs";
import ResidentsRequestInteface from "./ResidentsRequestInteface";
import useGetBarangayOfficials from "../../API/hooks/useGetBarangayOfficials";
import useGetSKOfficials from "../../API/hooks/useGetSKOfficials";
import { IBrgyOrgChart } from "../../app/OrganizationalChart";
import doRequest from "../../API/doRequest";

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

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

    .login-as-admin {
        display: flex;
        flex: 0 1 100%;
        height: fit-content;
        justify-content: center;
        padding: 40px 0
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
    min-width: 0;
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
        min-width: 0;
        justify-content: center;
        align-items: center;
        height: fit-content;
        background-color: rgb(236 243 254);

        img {
            width: 400px;
            @media screen and (max-width: 400px) {
                width: 200px;
            }
        }

        p {
            max-width: 600px;
            text-align: justify;

            @media screen and (max-width: 650px) {
                display: flex;
                min-width: 300px;
                padding: 20px;
            }
        }

        .residence-login-area,
        .residents-request-interface {
            display: flex;
            flex: 0 1 100%;
            min-width: 0;
            justify-content: center;
            margin-bottom: 50px;
        }
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

const AdminPannelBtnContainer = styled(Box)`
    width: fit-content;
    height: fit-content;
    position: absolute;
    right: 50px;
    top: 50px;
    z-index: 5000;
`

type TUser = {
    picture: string | null,
    name: string,
    residentUID: string
}

const PublicPage: React.FC = () => {
    const {data: skTerm} = useGetSKOfficials();
    const {data: barangayTerm} = useGetBarangayOfficials();
    const [orgChart, setOrgChart] = useState<null | IBrgyOrgChart>(null);
    const [user, setUser] = useState<TUser | null>(null);

    const [isLoading, setIsLoading] = useState(false);
      
    useEffect(() => {
        setIsLoading(true);
        doRequest<TUser>({
            method: "POST",
            url: "/get-user-info",
            baseURL: "http://localhost:3005/resident"
        })
        .then(res => {
            setIsLoading(false);
            setUser(res.data as TUser)
        })
        .catch(err => {
            setIsLoading(false);
        })
    }, []);

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
      }, [skTerm, barangayTerm]);

    return (
    <BaseContainer>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
        <BannerContainer>
            <ImageFilter />
            <BannerContent>
                {/* <AdminPannelBtnContainer>
                    <Tooltip title="Go to Admin Panel">
                        <IconButton aria-label="fingerprint" color="secondary" href="/admin">
                            <AdminPanelSettingsIcon sx={{fontSize: '50px'}} />
                        </IconButton>
                    </Tooltip>
                </AdminPannelBtnContainer> */}
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
                        <h4>Empowering Sandiat Centro: Unleashing the Power of Information & E-Services in Our Barangay!
                        </h4>
                    </JackInTheBox>
                    <JackInTheBox cascade className="slide-p" >
                        <p>Connecting Our Community, One Click at a Time: At the heart of our E-Services System lies the spirit 
                        of unity and collaboration. Embrace an inclusive space that fosters connections between residents, businesses, 
                        and local organizations. From engaging community forums and virtual town hall meetings to interactive platforms 
                        that facilitate idea-sharing and problem-solving, we're cultivating a culture of active participation and shared 
                        responsibility.
                        </p>
                    </JackInTheBox>
                </SystemText>
            </BannerContent>
        </BannerContainer>
        <div className="login-as-admin">
            <Button  startIcon={<AdminPanelSettingsIcon />} href="/admin">
                Go to Admin Panel
            </Button>
        </div>
        <ContentCategory>
            <div className="content">
                <h1>E-Services</h1>
                <div className="content">
                    <Fade>
                        <img className="image-mobile-responsive" src="/assets/images/e-services.png" />
                    </Fade>
                    <Fade>
                        <p className="mobile-responsive-text">Welcome to Sandiat Centro's cutting-edge e-services system, revolutionizing how you access essential barangay documents. 
                            Bid farewell to tiresome queues and paperwork woes! Our user-friendly platform empowers you to effortlessly request vital 
                            documents like barangay indigency, certification, and residency with just a few clicks. Stay informed about the status of 
                            your requests, receive prompt updates, and choose your preferred document delivery method. At Sandiat Centro, we prioritize 
                            your satisfaction and continuously enhance our services based on your valuable feedback. Embrace the future of barangay 
                            transactions and experience seamless digital convenience.</p>
                    </Fade>
                </div>
                {
                    user? <div className="residents-request-interface">
                        <ResidentsRequestInteface user={user} />
                    </div> : <div className="residence-login-area">
                        <ResidenceLogin onLoginSuccess={(user) => setUser(user)} />
                    </div>
                }
                
            </div>
        </ContentCategory>
        <h1 className="title">Organizationan Chart</h1>
        <OrganizationalChartContainer>
          {
            orgChart && <BrgyOrganizationalChart org={orgChart} />
          }  
        </OrganizationalChartContainer>
        <h1 className="title">Contact us</h1>
        <ContactUs />
    </BaseContainer>
    )
}

export default PublicPage;