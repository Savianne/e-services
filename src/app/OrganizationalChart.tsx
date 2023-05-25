import React from "react";
import { styled } from "@mui/material/styles";
import { Tree, TreeNode } from 'react-organizational-chart';

import { IStyledFC } from "./IStyledFC";

//MUI Component
import {
    Box,
    Avatar,
} from '@mui/material';

interface IBrgyPersonel {
    name: string,
    role: string,
    avatar: string
}

export interface IBrgyOrgChart {
    term: string,
    punongBarangay: IBrgyPersonel,
    secretary: IBrgyPersonel,
    treasurer: IBrgyPersonel,
    kagawad: [IBrgyPersonel, IBrgyPersonel, IBrgyPersonel, IBrgyPersonel, IBrgyPersonel, IBrgyPersonel, IBrgyPersonel],
    skChairPerson: {
        chairPerson: IBrgyPersonel,
        skKagawad: [IBrgyPersonel, IBrgyPersonel, IBrgyPersonel, IBrgyPersonel, IBrgyPersonel, IBrgyPersonel, IBrgyPersonel],
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
                    <Avatar src={personel.avatar} alt={personel.name} />
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
        height: 55px;
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
    width: 1030px;
    min-width: 1030px;
    height: fit-content;
`;

const BrgyOrganizationalChart: React.FC<{org: IBrgyOrgChart}> = ({org}) => {

    return (
        <OrgChartContainer>
            <Tree
                lineWidth={'2px'}
                lineColor={'rgb(0, 176, 240)'}
                lineBorderRadius={'0'}
                label={<OrgPersonel color="orange" personel={org.punongBarangay} />}
            >
                <TreeNode label={<OrgPersonel color="rgb(169, 209, 142)" personel={org.secretary} />} />
                
                <TreeNode label={<TreeNodeParent avatar="assets/images/Favlogo.png" title="Brangay Kagawads"/>}>
                    <TreeNode label={<OrgPersonel color="rgb(180, 199, 231)" personel={org.kagawad[0]} logo="assets/images/Favlogo.png" />}>
                        <TreeNode label={<OrgPersonel color="rgb(180, 199, 231)" personel={org.kagawad[1]} logo="assets/images/Favlogo.png" />}>
                            <TreeNode label={<OrgPersonel color="rgb(180, 199, 231)" personel={org.kagawad[2]} logo="assets/images/Favlogo.png" />}>
                                <TreeNode label={<OrgPersonel color="rgb(180, 199, 231)" personel={org.kagawad[3]} logo="assets/images/Favlogo.png" />}>
                                    <TreeNode label={<OrgPersonel color="rgb(180, 199, 231)" personel={org.kagawad[4]} logo="assets/images/Favlogo.png" />}>
                                        <TreeNode label={<OrgPersonel color="rgb(180, 199, 231)" personel={org.kagawad[5]} logo="assets/images/Favlogo.png" />}>
                                            <TreeNode label={<OrgPersonel color="rgb(180, 199, 231)" personel={org.kagawad[6]} logo="assets/images/Favlogo.png" />} />
                                        </TreeNode>
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                </TreeNode>

                <TreeNode label={<TreeNodeParent avatar="assets/images/SK-logo.png" title="Sanguniang Kabataan"/>}>
                    <TreeNode label={<OrgPersonel color="rgb(241, 67, 183)" personel={org.skChairPerson.chairPerson} logo="assets/images/SK-logo.png" />} >
                        <TreeNode label={<OrgPersonel color="#2196F3" personel={org.skChairPerson.skSecretary} logo="assets/images/SK-logo.png" />}>
                            <TreeNode label={<OrgPersonel color="#798dfd" personel={org.skChairPerson.skTreasurer} logo="assets/images/SK-logo.png" />}>
                                <TreeNode label={<OrgPersonel color="rgb(130 43 173)" personel={org.skChairPerson.skKagawad[0]} logo="assets/images/SK-logo.png" />}>
                                    <TreeNode label={<OrgPersonel color="rgb(130 43 173)" personel={org.skChairPerson.skKagawad[1]} logo="assets/images/SK-logo.png" />}>
                                        <TreeNode label={<OrgPersonel color="rgb(130 43 173)" personel={org.skChairPerson.skKagawad[2]} logo="assets/images/SK-logo.png" />}>
                                            <TreeNode label={<OrgPersonel color="rgb(130 43 173)" personel={org.skChairPerson.skKagawad[3]} logo="assets/images/SK-logo.png" />}>
                                                <TreeNode label={<OrgPersonel color="rgb(130 43 173)" personel={org.skChairPerson.skKagawad[4]} logo="assets/images/SK-logo.png" />}>
                                                    <TreeNode label={<OrgPersonel color="rgb(130 43 173)" personel={org.skChairPerson.skKagawad[5]} logo="assets/images/SK-logo.png" />}>
                                                        <TreeNode label={<OrgPersonel color="rgb(130 43 173)" personel={org.skChairPerson.skKagawad[6]} logo="assets/images/SK-logo.png" />} />
                                                    </TreeNode>
                                                </TreeNode>
                                            </TreeNode>
                                        </TreeNode>
                                    </TreeNode>
                                </TreeNode>
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                </TreeNode>
                <TreeNode label={<OrgPersonel color="rgb(0, 176, 80)" personel={org.treasurer} />} />
            </Tree>
        </OrgChartContainer>
    )
}

export default BrgyOrganizationalChart