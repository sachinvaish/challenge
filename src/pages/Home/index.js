import { Container } from '@mui/material';
import React from 'react';
import Submissions from '../../components/Submissions';
import Header from './Header';

export default function Home() {
    return (
        <Container >
            <Header />
            <Submissions/>
        </Container>
    );
}