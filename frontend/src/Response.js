import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import FlagIcon from '@mui/icons-material/Flag';
import IconButton from '@mui/material/IconButton';
import { green, pink, red } from '@mui/material/colors';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { Grid } from '@mui/material';



export default function Response({ response }) {

    var flag = response.split(" ").includes("Not")
    // var flag = mResponse.contains("Not")
    // console.log(flag)
    var mColor = flag ? green[500] : red[500]
    // var title = flag ? ""
    // var mUrl = url
    console.log(response.length)
    return (
        <Card sx={{ maxWidth: 350 }}>
            <CardHeader
                title="Response from the Backend!!"
            // subheader="September 14, 2016"
            />

            <CardContent>
                <Grid container>
                    <Grid item xs={2}>
                        {flag ? <CheckCircleIcon sx={{ color: mColor }} fontSize="large" /> : <CancelIcon sx={{ color: mColor }} fontSize="large" />}
                    </Grid>
                    <Grid item xs={10} sx={{ marginTop: "3px" }}>
                        {response}
                    </Grid>
                </Grid>
            </CardContent>
            <IconButton aria-label="add to favorites">
                <FlagIcon sx={{ color: pink[500] }} />
            </IconButton>
        </Card>
    );
}