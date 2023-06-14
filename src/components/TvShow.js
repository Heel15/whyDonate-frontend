import { useState } from "react";
import ShowCard from "./ShowCard"
import axios from "axios";
import Swal from "sweetalert2";
import { Box, Button, Grid, TextField } from "@mui/material";

const TvShow = () => {
    const [tvShowList, setTvShowList] = useState([]);
    const [query, setQuery] = useState('');

    const onSearchClickHandler = () => {
        const headers = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
        axios
            .get(`https://why-donate-backend.vercel.app/tvShow/getTvShowByTitle?query=${query}`, { headers })
            .then((response) => {
                if (response.status == 200) {
                    console.log(response.data.data, " response.data.data");
                    setTvShowList(response.data.data);
                    if (!response.data.data.length) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            title: 'No results are found!',
                            showConfirmButton: false,
                            timer: 1500
                        });
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
    }

    const onSearchInputHandler = (evt) => {
        setQuery(evt.target.value);
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                <TextField
                    margin="normal"
                    onChange={onSearchInputHandler}
                    name="password"
                    label="Search TV shows"
                    type="text"
                />
                <Button variant="contained" onClick={onSearchClickHandler}>Search</Button>
            </div>
            <Box style={{ margin: '20px 0' }} sx={{ flexGrow: 1 }}>
                <Grid style={{ justifyContent: 'center' }} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    {
                        tvShowList.length ? tvShowList.map((item, index) => {
                            return <Grid style={{ display: 'flex', justifyContent: 'center' }} item xs={2} sm={4} md={4} key={index}>
                                <ShowCard item={item} />
                            </Grid>
                        }) : <h3>No results are found!</h3>
                    }
                </Grid>
            </Box>
        </>

    )
}

export default TvShow;