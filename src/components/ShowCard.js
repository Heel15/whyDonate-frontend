import * as React from 'react';
import { makeStyles, styled } from '@mui/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';

const useStyles = makeStyles(() => ({
    showDetail: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px'

    }
}))

export default function ShowCard({ item }) {
    const classes = useStyles();
    const showData = item.show;
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {showData.name[0]}
                    </Avatar>
                }
                title={showData.name}
                subheader={`${showData.schedule.time} ${showData.schedule.days.length ? showData.schedule.days.join(',') : ''}`}
            />
            <CardMedia
                component="img"
                height="194"
                image={showData.image.original}
                alt="Paella dish"
            />
            <CardContent>
                {showData.summary ? showData.summary : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make"}
            </CardContent>
            <div>
                {
                    showData.language ? <div className={classes.showDetail}><h4 style={{ margin: 0 }}>Language :</h4>{showData.language}</div> : null
                }
                {
                    showData.type ? <div className={classes.showDetail}><h4 style={{ margin: '10px 0' }}>Type :</h4>{showData.type}</div> : null
                }
                {
                    showData.status ? <div className={classes.showDetail}><h4 style={{ margin: '10px 0' }}>Status :</h4>{showData.status}</div> : null
                }
                {
                    showData.genres.length ? <div className={classes.showDetail}><h4 style={{ margin: '10px 0' }}>genres :</h4>{showData.genres.join(',')}</div> : null
                }
            </div>
        </Card>
    );
}