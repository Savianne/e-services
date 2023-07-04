import React from "react";
import { styled } from '@mui/material/styles';

import { IStyledFC } from "../../app/IStyledFC";
import { IBrgyOrgChart } from "../../app/OrganizationalChart";

import SiteMapBoard from "../../app/SiteMapBoard";

//Mui Icons

//MUI Component
import {
    Box,
    Avatar,
    Paper,
    Divider
} from '@mui/material';

import { Container, Content } from "../../app/AppLayout";

interface IFCBrgyOfficialCard extends IStyledFC {
    avatar: string,
    name: string,
    role: string,
    color: string
}

const InfoContainer = styled(Paper)<{color: string}>`
    position: relative;
    display: flex;
    flex: 0 1 100%;
    align-items: center;
    margin-left: -45px;
    padding-left: 60px;
    background-color: ${({color}) => color};
    height: 100%;
    border-radius: 40px 5px 5px 40px;
    overflow: hidden;

    & .info {
        display: flex;
        flex: 0 1 80%;
        flex-wrap: wrap;
        justify-content: center;
        height: fit-content;
        z-index: 1;
    }

    & .info h1, & .info h3 {
        flex: 0 1 100%;
        color: white;
        text-align: center;
        margin: 0;
        height: fit-content;
    }

    & .info h1 {
        font-size: 3em;
        border-bottom: 1px solid whitesmoke;
        margin-bottom: 5px;
    }

    & .logo {
        position: absolute;
        right: -50px;
        height: 330px;
        width: 330px;
        opacity: 0.3;
        pointer-events: none;
    }

    @media screen and (max-width: 1000px) {
        & .info h1 {
            font-size: 2.5em;
        }
    }

    @media screen and (max-width: 800px) {
        & .info h1 {
            font-size: 2em;
        }
    }

    @media screen and (max-width: 800px) {
        & .info h3 {
            font-size: 1em;
        }
    }

    @media screen and (max-width: 670px) {
        & .info h1 {
            font-size: 1.5em;
        }

        & .info h3 {
            font-size: 0.8em;
        }
    }

    @media screen and (max-width: 500px) {
        & .info h1 {
            font-size: 1em;
        }

        & .info h3 {
            font-size: 0.7em;
        }

        & .logo {
            position: absolute;
            right: -40px;
            height: 200px;
            width: 200px;
        }
    }
`

const FCBrgyOfficialCard: React.FC<IFCBrgyOfficialCard> = ({className, avatar, name, role, color}) => {
    
    return (<>
        <div className={className}>
            <span className="avatar">
                <Avatar src={avatar} sx={{height: '100%', width: '100%'}}/>
            </span>
            <InfoContainer elevation={12} color={color}>
                <span className="info">
                    <h1>Hon. {name}</h1>
                    <h3>{role}</h3>
                </span>
            <img src="/assets/images/Favlogo.png" alt="logo" className="logo" />
            </InfoContainer>
        </div>
    </>)
}

const BrgyOfficialCard = styled(FCBrgyOfficialCard)`
    position: relative;
    display: flex;
    flex: 0 1 100%;
    height: 185px;
    align-items: center;
    margin-bottom: 25px;

    .avatar {
        flex-shrink: 0;
        height: 185px;
        width: 185px;
        z-index: 2;
    }

    @media screen and (max-width: 1000px) {
        & {
            height: 130px;
        }

        .avatar {
            height: 130px;
            width: 130px;
        }
    }

    @media screen and (max-width: 800px) {
        & {
            height: 95px;
        }

        .avatar {
            height: 95px;
            width: 95px;
        }
    }

    @media screen and (max-width: 400px) {
        & {
            height: 70px;
        }

        .avatar {
            height: 70px;
            width: 70px;
        }
    }
`
const BrgyOfficialCardContainer = styled(Content)`
    flex-wrap: wrap;

    h1 {
        margin: 0;
        margin-bottom: 40px;
    }
`

const BrgyOfficals: React.FC = () => {
    // const organizationOfBarangay:IBrgyOrgChart = {
    //     term: "2018-2021",
    //     punongBarangay: {
    //       name: 'Apple Jane De Guzman',
    //       role: 'Punong Barangay',
    //       avatar: "/assets/images/avatar/apple.png"
    //     },
    //     secretary: {
    //       name: 'Danielle R. Bacabitas',
    //       role: 'Brgy. Secretary',
    //       avatar: "/assets/images/avatar/apple.png"
    //     },
    //     treasurer: {
    //       name: 'Danica Santos-Esteban',
    //       role: 'Brgy. Treasurer',
    //       avatar: "/assets/images/avatar/apple.png"
    //     },
    //     kagawad: [{
    //       name: 'Greggy B. Leal',
    //       role: 'Brgy. 1st Kagawad',
    //       avatar: "/assets/images/avatar/apple.png"
    //     },{
    //       name: 'Greggy B. Leal',
    //       role: 'Brgy. Kagawad',
    //       avatar: "/assets/images/avatar/apple.png"
    //     },{
    //       name: 'Greggy B. Leal',
    //       role: 'Brgy. Kagawad',
    //       avatar: "/assets/images/avatar/apple.png"
    //     },{
    //       name: 'Greggy B. Leal',
    //       role: 'Brgy. Kagawad',
    //       avatar: "/assets/images/avatar/apple.png"
    //     },{
    //       name: 'Greggy B. Leal',
    //       role: 'Brgy. Kagawad',
    //       avatar: "/assets/images/avatar/apple.png"
    //     },{
    //       name: 'Greggy B. Leal',
    //       role: 'Brgy. Kagawad',
    //       avatar: "/assets/images/avatar/apple.png"
    //     },{
    //       name: 'Greggy B. Leal',
    //       role: 'Brgy. Kagawad',
    //       avatar: "/assets/images/avatar/apple.png"
    //     },],
    //     skChairPerson: {
    //       chairPerson: {
    //         name: 'Lizette Santos',
    //         role: 'SK Chairperson',
    //         avatar: "/assets/images/avatar/apple.png"
    //       },
    //       skSecretary: {
    //         name: 'Joylyn Obina',
    //         role: 'SK Secretary',
    //         avatar: "/assets/images/avatar/apple.png"
    //       },
    //       skTreasurer: {
    //         name: 'Joylyn Obina',
    //         role: 'SK Treasurer',
    //         avatar: "assets/images/avatar/apple.png"
    //       },
    //       skKagawad: [{
    //         name: 'Mark Niño Baylon',
    //         role: 'SK Kagawad',
    //         avatar: "/assets/images/avatar/apple.png"
    //       },{
    //         name: 'Mark Niño Baylon',
    //         role: 'SK Kagawad',
    //         avatar: "/assets/images/avatar/apple.png"
    //       },{
    //         name: 'Mark Niño Baylon',
    //         role: 'SK Kagawad',
    //         avatar: "/assets/images/avatar/apple.png"
    //       },{
    //         name: 'Mark Niño Baylon',
    //         role: 'SK Kagawad',
    //         avatar: "/assets/images/avatar/apple.png"
    //       },{
    //         name: 'Mark Niño Baylon',
    //         role: 'SK Kagawad',
    //         avatar: "/assets/images/avatar/apple.png"
    //       },{
    //         name: 'Mark Niño Baylon',
    //         role: 'SK Kagawad',
    //         avatar: "/assets/images/avatar/apple.png"
    //       },{
    //         name: 'Mark Niño Baylon',
    //         role: 'SK Kagawad',
    //         avatar: "/assets/images/avatar/apple.png"
    //       },],
    //     }
    //   }
    return (
        <>
            <SiteMapBoard title="Barangay Officials ( Current Term )" path="/information / brgy-officials" />
            <Container>
                {/* <BrgyOfficialCardContainer>
                    <h1>Barangay Officials of the Year / Term 2022 - 2025 ( Current Term )</h1>
                    <BrgyOfficialCard {...organizationOfBarangay.punongBarangay} color="orange"/>
                    <BrgyOfficialCard {...organizationOfBarangay.secretary} color="rgb(169, 209, 142)" />
                    <BrgyOfficialCard {...organizationOfBarangay.treasurer} color="rgb(0, 176, 80)" />
                    {
                        organizationOfBarangay.kagawad?.map(item => (
                            <BrgyOfficialCard {...item} color="rgb(180, 199, 231)" />
                        ))
                    }
                    <BrgyOfficialCard {...organizationOfBarangay.skChairPerson.chairPerson} color="rgb(241, 67, 183)" />
                    <BrgyOfficialCard {...organizationOfBarangay.skChairPerson.skSecretary} color="#2196F3" />
                    <BrgyOfficialCard {...organizationOfBarangay.skChairPerson.skTreasurer} color="#798dfd" />
                    {
                        organizationOfBarangay.skChairPerson.skKagawad?.map(item => (
                            <BrgyOfficialCard {...item} color="rgb(130 43 173)" />
                        ))
                    }
                </BrgyOfficialCardContainer> */}
            </Container>
        </>
    )
}

export default BrgyOfficals;