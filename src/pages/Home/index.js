import { Box, Container, Grid } from '@mui/material';
import React from 'react';
import Submissions from '../../components/Submissions';
import Header from './Header';
import { useGetPostsQuery } from '../../redux/reducers/submissionsService';


export default function Home() {
    return (
        <Container >
            <Header />
            <Box sx={{ backgroundColor: 'white', borderRadius: '20px', padding: '10px' }}>
                <Grid container>
                    <Submissions sm={12} md={6} lg={4} />
                </Grid>
            </Box>
        </Container>
    );
}