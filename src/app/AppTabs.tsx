import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { IStyledFC } from "./IStyledFC";

//MUI Components
import {
    Tabs,
    Tab
} from '@mui/material';

const FCAppTabs: React.FC<IStyledFC> = ({className}) => {
    const [value, setValue] = React.useState('');

    const navigate = useNavigate();

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

    React.useEffect(() => {
        switch(value) {
            case 'home':
                navigate('/admin/home');
            break;
            case 'information':
                navigate('/admin/information');
            break;
            case 'e-services':
                navigate('/admin/e-services');
            break;
            // default:
            //     navigate('/home');
            break;
        }
    }, [value]);

    return (
        <div className={className}>
            <div className="tabs">
                <Tabs
                value={value}
                onChange={handleChange}
                aria-label="wrapped label tabs example">
                    <Tab
                        value="home"
                        label="Home"
                        wrapped
                        sx={{fontSize: '11px'}}
                    />
                    <Tab value="information" label="Information" sx={{fontSize: '11px'}} />
                    <Tab value="e-services" label="E-Services" sx={{fontSize: '11px'}} />
                </Tabs>
            </div>
        </div>
    )
}

const AppTabs = styled(FCAppTabs)`
    position: sticky;
    /* top: 95px; */
    display: flex;
    flex: 0 1 100%;
    height: fit-content;
    justify-content: center;
    background-color: ${(props) => props.theme.customTheme.mainBackground};
    border-bottom: 1px solid ${(props) => props.theme.customTheme.borderColor};
    backdrop-filter: blur(30px);
    /* z-index: 1000; */
   
    & .tabs {
        display: flex;
        flex: 0 1 1350px;
        height: fit-content;
        align-items: center;
        padding: 0 15px;
    }
`

export default AppTabs;