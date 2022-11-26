import { Grid } from '@mui/material';
import React from 'react';

export default function Header() {
  return (
    <>
      <Grid container>
        <Grid item>
            <h2>This is grid item</h2>
        </Grid>
        <Grid item>
            <h2>This is grid item 2</h2>
        </Grid>
        <Grid item>
            <h2>This is grid item3</h2>
        </Grid>
      </Grid>
    </>
  );
}
