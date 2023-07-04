import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

interface IPersonData {
    fullName: string,
    position: string,
    committee?: string,
    picture: string | null
}

const PersonList: React.FC<{personList: IPersonData[]}> = ({personList}) => {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {
                personList && personList.map((person, i) => {
                    const {picture, fullName, position, committee} = person;

                    return (<>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={picture? `/assets/images/avatar/${picture}` : undefined} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={fullName}
                        secondary={
                            <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {position}
                            </Typography>
                            {committee? " - " + committee : ""}
                            </React.Fragment>
                        }
                        />
                    </ListItem>
                    {
                        !(i == personList.length - 1) && <Divider variant="inset" component="li" />
                    }
                    </>)
                })
            }
        </List>
    );
}

export default PersonList;