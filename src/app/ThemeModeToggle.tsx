import React from "react";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../global-state/hooks";
import { toggleDarkMode, toggleLightMode } from "../global-state/action-creators/themeModeToggleSlice";

import { IStyledFC } from "./IStyledFC";

//MUI Icons
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ModeNightIcon from '@mui/icons-material/ModeNight';

//MUI Components
import { 
    IconButton
} from "@mui/material";

const FCThemeModeToggle:React.FC<IStyledFC> = ({className}) => {
    const themeMode = useAppSelector(state => state.themeModeToggle.mode);
    const dispatcher = useAppDispatch();
    return (
        <div className={className}>
            <IconButton aria-label="Theme Mode" sx={{height: '45px', width: '45px'}} onClick={(e) => dispatcher(themeMode == 'light'? toggleDarkMode() : toggleLightMode())}>
                {
                    themeMode == 'light'? <ModeNightIcon /> : <WbSunnyIcon />
                }
            </IconButton>
        </div>
    )
}

const ThemeModeToggle = styled(FCThemeModeToggle)`
    display: flex;
    width: fit-content;
    height: 100%;
    align-items: center;
`
export default ThemeModeToggle;