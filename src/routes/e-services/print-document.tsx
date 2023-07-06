import { styled, css } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import { Container, Content } from "../../app/AppLayout";
import ResidentSelector from "../../app/ResidentSelector";
import useGetResidentsRecord from "../../API/hooks/useGetResidentsRecord";
import useGenerateDocument from "../../API/hooks/useGenerateDocument";
import useGetResidentRecord from "../../API/hooks/useGetResiden";
import { useParams } from "react-router-dom";
//pdf generator
// import generateBarangayCertificateOfIndigency from "../../utils/pdf-generator.ts/certificate-of-indigency";

import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { 
    Paper,
    Box,
    Divider,
    Chip,
    Avatar,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";


const RouteContent = styled(Content)`
    flex-wrap: wrap;
`
const TableContainer = styled(Paper)`
    display: flex;
    flex: 0 1 1300px;
    /* height: 900px; */
    /* padding: 10px; */
    background-color: ${({theme}) => theme.customTheme.mainBackground};

    .row {
        display: flex;
        flex: 0 1 100%;
        justify-content: center;
        padding: 0 5px 10px 5px;
    }

    .selected-resident {
        padding 30px;
    }

    .col-1 {
        align-content: flex-start;
        display: flex;
        padding: 20px 0;
        justify-content: center;
        flex: 0 1 350px;
        height: 100%;
        flex-wrap: wrap;

        .btn-area {
            display: flex;
            flex: 0 1 100%;
            height: 500px;
            justify-content: center;
            padding-top: 30px;
        }
    }

    .col-2 {
        align-content: flex-start;
        display: flex;
        flex-wrap: wrap;
        flex: 1;

        iframe {
            border: none;
            outline: none;
        }
    }
`;

interface Person {
    fullName: string;
    residentUID: string;
    picture: string | null
  }


const PrintDocument: React.FC = () => {
    const {residentUID} = useParams();
    const {data: residentData} = useGetResidentRecord(residentUID);
    const {generateDocument, data: documentUrl, isLoading: isGeneratingDocumnet, isError: isErrorGeneratingDoc, isSuccess: isSuccessGeneratingDoc} = useGenerateDocument();
    const {data, isLoading, isError, isSuccess} = useGetResidentsRecord();
    const [options, setOptions] = useState<{fullName: string, picture: string | null, residentUID: string,}[]>([]);
    const [resident, setResident] = useState<null | Person>(null);
    // const [generatePdfLink, setGeneratePdfLink] = useState<null | string>(null);
    const [doctype, setDoctype] = useState("");
    const [purpose, setPurpose] = useState("")

    useEffect(() => {
        if(data) {
            const options:  {
                fullName: string,
                picture: string | null,
                residentUID: string,
            }[] = data.map(item => ({
                fullName: `${item.name.firstName} ${item.name.middleName[0]}. ${item.name.lastName}`.toUpperCase(),
                picture: item.picture,
                residentUID: item.residentUID
            }));

            setOptions(options);
        }
    }, [data]);

    useEffect(() => {
        if(residentData) {
            setResident({
                fullName: `${residentData?.firstName} ${residentData?.middleName[0]}. ${residentData?.surname} ${residentData?.extName? residentData.extName : ""}`.toUpperCase(),
                picture: residentData?.picture as string | null,
                residentUID: residentData?.residentUID as string
            })
        }
    }, [residentData])
    return (
        <>
            <Container>
                <RouteContent>
                    <TableContainer elevation={12}>
                        <div className="col-1">
                            {
                                resident? <div className="row select-resident">
                                <Chip
                                    avatar={<Avatar alt={resident.fullName} src={resident.picture? resident.picture : undefined} />}
                                    label={resident.fullName}
                                    variant="outlined"
                                />
                                </div> : <>
                                    <h3>Select a resident</h3>
                                </>
                            }
                            <div className="row">
                                <ResidentSelector onSelect={(r) => setResident(r)} options={options} />
                            </div>
                            <div className="row">
                                <TextField select label="Document" sx={{width: '300px'}} size="small" value={doctype} onChange={(e) => setDoctype(e.target.value)}>
                                    <MenuItem value="">Select what Document to generate</MenuItem>
                                    <MenuItem value="indigency">Certificate of Indigency</MenuItem>
                                </TextField>
                            </div>
                            {
                                doctype == "indigency" && <div className="row">
                                <TextField
                                value={purpose}
                                onChange={(e) => setPurpose(e.target.value)}
                                id="outlined-textarea"
                                label="Purpose"
                                placeholder="Purpose"
                                size="small"
                                sx={{width: '300px'}}
                                multiline
                                />
                            </div>
                            }
                            <Divider orientation="horizontal" sx={{width: '100%', margin: '20px 0'}} />
                            <div className="btn-area">
                                <GenerateBtn disabled={!(resident !== null && doctype == "indigency" && purpose.length > 5)} onClick={() => {
                                    const payload = {
                                        residentUID: resident?.residentUID as string,
                                        type: doctype,
                                        purpose: purpose
                                    }
                                    generateDocument(payload)

                                }}>
                                    <PictureAsPdfIcon sx={{marginRight: '10px'}} />
                                    Generate Document
                                </GenerateBtn>
                            </div>
                        </div>
                        <Divider orientation="vertical"/>
                        <div className="col-2">
                            {
                               documentUrl? <>
                                    <iframe src={documentUrl} width="100%" height="100%"></iframe>
                                </> : <>
                                    <div className="row">
                                        <LocalPrintshopIcon sx={{width: '300px', height: '300px', color: 'gray', opacity: 0.2}} />
                                    </div>
                                    <div className="row">
                                        <h2 style={{margin: 0}}>Generated Document will appear here.</h2>
                                    </div>
                                </>
                            }
                        </div>
                    </TableContainer>
                </RouteContent>
            </Container>
        </>
    )
}

const GenerateBtn = styled(Button)`
    display: flex;
    align-items: center;
    border-radius: 5px;
    height: fit-content;
    width: fit-content;
    border-radius: 12px;
    text-align: center;
    padding: 15px;
    cursor: pointer;
    :hover {
        box-shadow: 0;
    }
    ${({theme}) => theme.palette.mode == 'light'? css`
        background: #f8f8f8;
        box-shadow:  5px 5px 0px #d9d9d9,
             -5px -5px 0px #ffffff;
    ` : css`
        background: #86868614;
        box-shadow: 5px 5px 0px #7a7a7a, -5px -5px 0px #35353500;
    `}

        
`
export default PrintDocument;
