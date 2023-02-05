import { CardContent, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import api from "../../utils/api";


export const AllCommentsPost=({comments})=>{
    
    const [postAllComments, setPostAllComments]=useState([]);

    useEffect(() => {
        api.getAllPostComments()
            .then((allCommentsData) => {
                setPostAllComments(allCommentsData) 
            })
        },[])

        return (
            <Typography >
            {comments}
        </Typography>
        
        )
} 
