import { useEffect, useState } from "react";
import ShowCard from "./ShowCard"
import axios from "axios";
import Swal from "sweetalert2";
import { Box, Grid } from "@mui/material";

const TvShow = () => {
    const [tvShowList, setTvShowList] = useState([]);
    const [query, setQuery] = useState('heel');
    useEffect(() => {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        axios
            .get(`https://why-donate-backend.vercel.app/tvShow/getTvShowByTitle?query=${query}`, { headers })
            .then((response) => {
                if (response.status == 200) {
                    if (response.data.data.length) {
                        setTvShowList(response.data.data);
                    }
                }
            }).catch((e) => {
                if (e.response) {
                    console.log(e.response.data.message, " e.response")
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: e.response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    }, [])
    return (
        <Box style={{ margin: '20px 0' }} sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {
                    tvShowList.length ? tvShowList.map((item, index) => {
                        return <Grid style={{ display: 'flex', justifyContent: 'center' }} item xs={2} sm={4} md={4} key={index}>
                            <ShowCard item={item} />
                        </Grid>
                    }) : null
                }
            </Grid>
        </Box>
    )
}

export default TvShow;