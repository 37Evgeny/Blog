import { Fab } from "@mui/material"
import Add from '@mui/icons-material/Add';


export const ButtonAddPost = () => {
    return (
            <Fab sx={{ mr: 5}} variant="extended">
                <Add sx={{ mr: 1}}/>
                Добавить пост
            </Fab>
        )
}