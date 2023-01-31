import { Card, CardHeader, CardMedia, CardContent, Avatar, IconButton, Typography, Badge } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import * as React from 'react';
import { ContentHeader } from '../ContentHeader/content-header';


import dayjs from 'dayjs';
import 'dayjs/locale/ru'
import s from './index.module.css'
dayjs.locale('ru')

export const PostDetail = ({ image, title, author = {}, likes = [], text, created_at, _id, onPostLike }) => {
    const { name, avatar } = author;
    let color;

    if (likes.length > 0) { color = 'warning' }

    return (
        <>
            <Card className={s.card}>
                <ContentHeader />
                <CardHeader
                    avatar={
                        <Avatar src={avatar && avatar} aria-label="recipe">
                            {name?.slice(0, 1).toUpperCase()}
                        </Avatar>
                    }
                    title={name}
                    subheader={dayjs(created_at).format('dddd, YYYY-MM-D')}
                />

                <CardMedia
                    component="img"
                    height="auto"
                    image={image}
                    alt={`Изображение ${title}`}
                />

                <CardContent>
                    <Typography variant='h5' component='h2' gutterBottom>{title}</Typography>
                </CardContent>

                <CardContent>
                    <Typography paragraph>
                        {text}
                    </Typography>
                </CardContent>
                <div className="button">
                    <IconButton aria-label="add to favorites" color={color} onClick={onPostLike} >
                        <Badge badgeContent={likes.length} color="primary">
                            <Favorite />
                        </Badge>
                    </IconButton>
                </div>
            </Card>
        </>
    );
};
