import React from "react";
import { styled } from "@mui/material/styles";
import { Tree, TreeNode } from 'react-organizational-chart';

import { IStyledFC } from "./IStyledFC";

import useMediaQuery from '@mui/material/useMediaQuery';

//MUI Component
import {
    Box,
    Avatar,
} from '@mui/material';

interface IBrgyPersonel {
    name: string,
    role: string,
    avatar?: string | null
}

export interface IBrgyOrgChart {
    punongBarangay: IBrgyPersonel,
    secretary: IBrgyPersonel,
    treasurer: IBrgyPersonel,
    kagawad: IBrgyPersonel[],
    skChairPerson: {
        chairPerson: IBrgyPersonel,
        skKagawad: IBrgyPersonel[],
        skSecretary: IBrgyPersonel,
        skTreasurer: IBrgyPersonel,
    },
}

interface IOrgPersonel extends IStyledFC {
    color: string,
    logo?: string,
    personel: IBrgyPersonel
}

const FCOrgPersonel: React.FC<IOrgPersonel> = ({className, color, personel, logo}) => {

    return (
        <div className={className}>
            <div className="box">
                {
                    logo && <img src={logo} alt="logo" className="logo"/>
                }
                <span className="personel-avatar">
                    <Avatar src={personel.avatar || undefined} alt={personel.name} />
                </span>
                <div className="personel-info">
                    <h3>Hon. {personel.name}</h3>
                    <h5>{personel.role}</h5>
                </div>
            </div>
        </div>
    )
}

const OrgPersonel = styled(FCOrgPersonel)`
    display: flex;
    flex: 1;
    height: fit-content;
    align-items: center;
    justify-content: center;
    
    .box {
        position: relative;
        display: flex;
        flex: 0 1 fit-content;
        max-width: 245px;
        /* height: 55px; */
        align-items: center;
        justify-content: center;
        background-color: ${(props) => props.color};
        border-radius: 4px;
        padding: 5px 10px 5px 5px;
        overflow: hidden;
    }

    .box .logo {
        position: absolute;
        right: -7px;
        height: 100px;
        opacity: 0.2;
        border-radius: 50%;
    }

    .box .personel-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 50px;
    }

    .box .personel-info {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        z-index: 1;
     }

     .box .personel-info h3, 
     .box .personel-info h5 {
        margin: 0;
        flex: 0 1 100%;
        color: white;
        font-size: 13px;
     }

     .box .personel-info h5 {
        font-size: 12px;
        font-weight: 100;
     }
`;

interface ITreeNodeParent extends IStyledFC {
    avatar: string,
    title: string
}

const FCTreeNodeParent: React.FC<ITreeNodeParent> = ({className, avatar, title}) => {

    return (
        <div className={className}>
            <div className="box">
                <span className="group-avatar">
                    <Avatar src={avatar} alt={title} />
                </span>
                    <h3>{title}</h3>
            </div>
        </div>
    )
}

const TreeNodeParent = styled(FCTreeNodeParent)`
    display: flex;
    flex: 1;
    height: fit-content;
    align-items: center;
    justify-content: center;
    
    .box {
        display: flex;
        flex: 0 1 fit-content;
        height: 55px;
        align-items: center;
        justify-content: center;
        background-color: rgb(132, 151, 176);
        border-radius: 4px;
        padding: 5px 10px 5px 5px;
    }

    .box .group-avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 50px;
    }

    .box h3 {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        color: white;
    }
`;

const OrgChartContainer = styled(Box)`
    max-width: 1030px;
    min-width: 300px;
    height: fit-content;
`;

const BrgyOrganizationalChart: React.FC<{org: IBrgyOrgChart}> = ({org}) => {
    const min1040 = useMediaQuery('(min-width:1040px)');
    return (
        <OrgChartContainer>
            <Tree
                lineWidth={'2px'}
                lineColor={'rgb(0, 176, 240)'}
                lineBorderRadius={'0'}
                label={<OrgPersonel color="orange" personel={org.punongBarangay} />}
            >
                {
                    min1040? <>
                        <TreeNode label={<OrgPersonel color="rgb(169, 209, 142)" personel={org.secretary} />} />
                        
                        <TreeNode label={<TreeNodeParent avatar="/assets/images/brgy-sandiat-centro-logo.jpg" title="Brangay Kagawads"/>}>
                            {renderKagawad(org.kagawad, '/assets/images/brgy-sandiat-centro-logo.jpg', 0)}
                        </TreeNode>
        
                        <TreeNode label={<TreeNodeParent avatar="/assets/images/SK-logo.png" title="Sanguniang Kabataan"/>}>
                            {renderKagawad(org.skChairPerson.skKagawad, "/assets/images/SK-logo.png", 0)}
                        </TreeNode>
                        <TreeNode label={<OrgPersonel color="rgb(0, 176, 80)" personel={org.treasurer} />} />
                    </> : <>
                        <TreeNode label={<OrgPersonel color="rgb(169, 209, 142)" personel={org.secretary} />}>
                            <TreeNode label={<TreeNodeParent avatar="/assets/images/brgy-sandiat-centro-logo.jpg" title="Brangay Kagawads"/>}>
                                {renderKagawad(org.kagawad, '/assets/images/brgy-sandiat-centro-logo.jpg', 0)}
                            </TreeNode>
                        </TreeNode>

                        <TreeNode label={<OrgPersonel color="rgb(0, 176, 80)" personel={org.treasurer} />} >
                            <TreeNode label={<TreeNodeParent avatar="/assets/images/SK-logo.png" title="Sanguniang Kabataan"/>}>
                                {renderKagawad(org.skChairPerson.skKagawad, "/assets/images/SK-logo.png", 0)}
                            </TreeNode>
                        </TreeNode>
                    </>
                }
            </Tree>
        </OrgChartContainer>
    )
}

function renderKagawad(kagawadArray: any[], logo: string, index: number): JSX.Element | null {
    if (index >= kagawadArray.length) {
      return null;
    }
  
    const kagawad = kagawadArray[index];
  
    return (
      <TreeNode
        label={
          <OrgPersonel
            color="rgb(130 43 173)"
            personel={kagawad}
            logo={logo}
          />
        }
      >
        {renderKagawad(kagawadArray, logo, index + 1)}
      </TreeNode>
    );
}
  
export default BrgyOrganizationalChart