import * as Yup from 'yup';
import { debounce } from 'lodash';
import { 
    Button,  
    TextField,
    Snackbar,
    Alert,
    CircularProgress
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import SendIcon from '@mui/icons-material/Send';
import React from "react";
import styled from "styled-components";
import { Slide, Hinge, JackInTheBox, Fade } from "react-awesome-reveal";
import { GoogleMap as ReactGoogleMap, LoadScript } from '@react-google-maps/api';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MailLockOutlined } from '@mui/icons-material';
import doRequest from '../../API/doRequest';



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
        lat: 17.071401687902643,
        lng: 121.63845064936282,
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
        </div>
    )
};

const GoogleMap = styled(FCGoogleMap)`
    position: relative;
    display: flex;
    width: 100%;
    /* max-width: 500px;
    min-width: 200px; */
    justify-content: center;
    /* min-width: 200px; */
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

    @media screen and (max-width: 570px) {

    }
`;

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').notRequired(),
    fullName: Yup.string().notRequired(),
    subject: Yup.string().notRequired().max(100),
    query: Yup.string().notRequired().max(1000),
});

const FCContactForm: React.FC<{className?: string}> = ({className}) => {
    const [sendingMail, setSendingMail] = React.useState(false);
    const [sendingMailSuccess, setSendingMailSuccess] = React.useState(false);
    const [sendingMailError, setSendingMailError] = React.useState(false);

    const [errors, setErrors] = React.useState<null | Record<string, string>>(null);
    const [mail, setMail] = React.useState({
        email: '',
        fullName: '',
        subject: '',
        query: '',
    })

    const validateForm = debounce(async () => {
        try {
            await validationSchema.validate(mail, { abortEarly: false });
            setErrors(null);
        } catch (error: any) {
            if (error instanceof Yup.ValidationError) {
                const validationErrors: { [key: string]: string } = {}; // Define the type of validationErrors
                error.inner.forEach((err) => {
                    if (err.path) {
                        validationErrors[err.path] = err.message;
                    }
                });

                setErrors(validationErrors);
            }
        }
    }, 300);

    React.useEffect(() => {
        validateForm();
    }, [mail]);

    return(
        <div className={className}>
            <span className="icon-container">
                <SendIcon sx={{fontSize: "80px"}} />
            </span>
            <div className="input-group">
                <TextField fullWidth id="outlined-basic" label="Full-name" variant="outlined" 
                error={!!(errors && errors['fullName'])}
                value={mail.fullName}
                onChange={(e) => setMail({...mail, fullName: e.target.value})} />
                <TextField fullWidth id="outlined-basic" label="Email Address" variant="outlined"
                error={!!(errors && errors['email'])}
                value={mail.email}
                onChange={(e) => setMail({...mail, email: e.target.value})} />
                <TextField fullWidth id="outlined-basic" label="Subject" variant="outlined"
                error={!!(errors && errors['subject'])}
                value={mail.subject}
                onChange={(e) => setMail({...mail, subject: e.target.value})} />
                <TextField
                fullWidth
                id="outlined-multiline-static"
                label="Queries"
                multiline
                rows={4}
                error={!!(errors && errors['query'])}
                value={mail.query}
                onChange={(e) => setMail({...mail, query: e.target.value})}
                />
                <SendQuerieButton size="large" sx={{marginLeft: "auto"}} endIcon={sendingMail? <CircularProgress color="inherit"  sx={{marginLeft: '10px'}} size={20} /> : <SendIcon />}
                disabled={!!(Object.values(mail).includes('')) || !!errors}
                onClick={() => {
                    setSendingMail(true);
                    doRequest({
                        method: "POST",
                        url: '/send-mail',
                        baseURL: "http://localhost:3005/resident",
                        data: {
                            mail: mail
                        }
                    })
                    .then((res) => {
                        if(res.success) {
                            setSendingMail(false);
                            sendingMailError && setSendingMailError(false);
                            setSendingMailSuccess(true);
                            setMail({
                                fullName: '',
                                email: '',
                                subject: '',
                                query: ''
                            })
                        }
                    })
                    .catch(err => {
                        setSendingMail(false);
                        sendingMailSuccess &&  setSendingMailSuccess(false);
                        setSendingMailError(true);
                    })
                }}>
                Send
                </SendQuerieButton>
            </div>
            <Snackbar open={sendingMailError} autoHideDuration={6000} onClose={() => setSendingMailError(false)}>
                <Alert onClose={() => setSendingMailError(false)} severity="error" sx={{ width: '100%' }}>
                    Failed to send query, try again!
                </Alert>
            </Snackbar>
            <Snackbar open={sendingMailSuccess} autoHideDuration={6000} onClose={() => setSendingMailSuccess(false)}>
                <Alert onClose={() => setSendingMailSuccess(false)} severity="success" sx={{ width: '100%' }}>
                    Query sent successfully
                </Alert>
            </Snackbar>
        </div>
    )
}

const ContactForm = styled(FCContactForm)`
    position: relative;
    display: flex;
    flex: 0 1 100%;
    /* max-width: 500px;
    min-width: 200px; */
    justify-content: center;
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
                {/* <Fade> */}
                    <GoogleMap />
                {/* </Fade> */}
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
        display: flex;
        flex: 0 1 500px;
        /* width: fit-content;
        height: fit-content */
    }

    
`;

export default ContactUs;