import { 
    Button,  
    TextField
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import SendIcon from '@mui/icons-material/Send';
import React from "react";
import styled from "styled-components";
import { Slide, Hinge, JackInTheBox, Fade } from "react-awesome-reveal";
import { GoogleMap as ReactGoogleMap, LoadScript } from '@react-google-maps/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const SendQuerieButton = styled(Button)`
    width: 210px;
    margin-left: auto;
    margin-right: auto;
`;

const FCGoogleMap: React.FC<{className?: string}> = ({className}) => {
    const mapContainerStyle = {
        width: '100%',
        height: '400px'
      };

    const center = {
        lat: 37.7749,
        lng: -122.4194
      };
    return (
        <div className={className}>
            <span className="icon-container">
                <LocationOnIcon sx={{fontSize: "80px"}} />
            </span>
            <LoadScript googleMapsApiKey="AIzaSyCcLY96UnGGEiWn8_gRQXJxvweweZXRo_g">
            <ReactGoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={10}
            />
            </LoadScript>
            {/* <div className="google-map" id="mapElement">
                
            </div> */}
            
        </div>
    )
};

const GoogleMap = styled(FCGoogleMap)`
    position: relative;
    display: flex;
    width: 500px;
    justify-content: center;
    min-width: 200px;
    border-radius: 5px;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
box-shadow:  20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff;
    height: fit-content;
    margin-top: 100px;
    padding: 90px 35px 35px 35px;

    .icon-container {
        position: absolute;
        top: -75px;
        display: flex;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        background: linear-gradient(145deg, #cacaca, #f0f0f0);
box-shadow:  20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff;
        font-size: 80px;
    }

    .google-map {
        display: flex;
        width: 400px;
        height: 400px;
    }
`;

const FCContactForm: React.FC<{className?: string}> = ({className}) => {

    return(
        <div className={className}>
            <span className="icon-container">
                <SendIcon sx={{fontSize: "80px"}} />
            </span>
            <div className="input-group">
                <TextField fullWidth id="outlined-basic" label="Full-name" variant="outlined" />
                <TextField fullWidth id="outlined-basic" label="Email Address" variant="outlined" />
                <TextField fullWidth id="outlined-basic" label="Subject" variant="outlined" />
                <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Queries"
                multiline
                rows={4}
                />
                <SendQuerieButton size="large" sx={{marginLeft: "auto"}} endIcon={<SendIcon />}>
                Send
                </SendQuerieButton>
            </div>
        </div>
    )
}

const ContactForm = styled(FCContactForm)`
    position: relative;
    display: flex;
    width: 500px;
    justify-content: center;
    min-width: 200px;
    border-radius: 5px;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
box-shadow:  20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff;
    height: fit-content;
    margin-top: 100px;
    padding: 90px 35px 35px 35px;

    .icon-container {
        position: absolute;
        top: -75px;
        display: flex;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        background: linear-gradient(145deg, #cacaca, #f0f0f0);
box-shadow:  20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff;
        font-size: 80px;
    }

    .input-group {
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
        flex: 0 1 100%;
    }
`;

const FCContactUs: React.FC<{className?: string}> = ({className}) => {

    return (
        <div className={className}>
            <div className="contact-form">
                <Fade>
                    <ContactForm />
                </Fade>
            </div>
            <div className="google-map-container">
                <Fade>
                    <GoogleMap />
                </Fade>
            </div>
        </div>
    )
};


const ContactUs = styled(FCContactUs)`
    display: flex;
    flex: 0 1 100%;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 50px;
    gap: 30px;

    .contact-form,
    .google-map-container {
        width: fit-content;
        height: fit-content
    }

    
`;

export default ContactUs;