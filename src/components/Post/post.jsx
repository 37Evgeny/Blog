import { Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse,  Avatar, IconButton, Typography, Badge} from "@mui/material";
import  { MoreVert, Favorite, ExpandMore, Delete }  from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { isLiked } from '../../utils/post';


import dayjs from 'dayjs';
import 'dayjs/locale/ru'
import s from './index.module.css'
dayjs.locale('ru')


const ExpandMoreStyled = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
  }));

 
  
    

const Post =({image, title, author={}, likes, text, created_at, onPostLike,_id, userMe, postDelete}) => {

    const {name, avatar} = author;

    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const liked = isLiked(likes, userMe._id)


	function handleLikeClick(){
	onPostLike({_id, likes})
}

function handlePostDeleteClick(){
	postDelete({_id})
}

    let color;

    if (likes.length > 0) { color = 'warning' }
    return(
        <Grid sx={{display:'flex'}} item xs={12} sm={6} md={4} lg={3}>
            <Card className={s.card}>
                <CardHeader 
                avatar={
                    <Avatar src={avatar && avatar} aria-label="recipe">
                        {name?.slice(0,1).toUpperCase()}
                    </Avatar>
                }
                title={name}
                subheader={dayjs(created_at).format('dddd, YYYY-MM-D')}
            />
                <CardMedia
                    component="img"
                    height="194"
                    image={image}
                    alt={`Изображение ${title}`}
                />
                <CardContent>
                    <Typography variant='h5' component='h2' gutterBottom>{title}</Typography>
                    <Typography variant="body2" noWrap color="text.secondary">
                       {text}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" color={color} onClick={() => handleLikeClick(likes, _id)} >
                        <Badge badgeContent={likes.length} color="primary">
                            <Favorite />
                        </Badge>
                    </IconButton>
                  
                  
                    <ExpandMoreStyled
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-label="show more"
                    >
                     
                        <ExpandMore />
                    </ExpandMoreStyled>
                    <IconButton aria-label="delete" onClick={() => handlePostDeleteClick(_id)}>
                    <Delete/>
                   </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            {text}
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </Grid>
    );
};

export default Post;