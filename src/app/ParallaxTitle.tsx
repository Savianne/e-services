import React from "react";
import { ParallaxBanner } from 'react-scroll-parallax';
import { styled } from "@mui/material/styles";

//MUI Component
import {
    Box
} from '@mui/material';


const BlurLayer = styled(Box)`
  display: flex;
  height: 100%;
  width: 100%;
  background-color: #010101a8;
  color: white;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  font-weight: bold;
  backdrop-filter: blur(3px);
`;

const ParallaxContainer = styled(Box)`
    display: flex;
    flex: 0 1 100%;
    height: 200px;
`;

const ParallaxTitle:React.FC<{title: string, img: string}> = ({title, img}) => {
    return (
        <ParallaxContainer>
            <ParallaxBanner
              layers={[
                { 
                  image: img, speed: -20 
                },
                {
                  speed: -8,
                  children: (
                    <BlurLayer>
                      { title }
                    </BlurLayer>
                  ),
                }
              ]}
              className="aspect-[2/1]"
            />
        </ParallaxContainer>
    );
  };







export default ParallaxTitle;