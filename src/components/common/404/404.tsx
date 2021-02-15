import { CardMedia, Container, Grid } from '@material-ui/core';
import React from 'react'
import Img from './404-error.png'
const Page404 = () => {
  return (
    <Container>
      <Grid container direction="row" justify="center" alignItems="center" style={{height:"80vh"}}>
        <CardMedia
          component="img"
          alt="404"
          image={Img}
          title="404"
          style={{ height: "500px" }}
        />
      </Grid>
    </Container>
  );
}
export default Page404