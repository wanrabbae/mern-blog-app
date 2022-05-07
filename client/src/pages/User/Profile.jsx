import React from "react";
import {
  Container,
  Typography,
  Stack,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function Profile() {
  return (
    <Container sx={{ marginTop: "7rem" }}>
      {/* USER PROFILE */}
      <Box mb={10}>
        <Stack
          spacing={{ xs: 3, sm: 10 }}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems={{ xs: "center", sm: "" }}
        >
          <Avatar
            alt="Alwan"
            src="/images/AlwanProfile.jpg"
            sx={{ width: 150, height: 150 }}
          />
          <Stack direction="column" spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Typography variant="h6">Name</Typography>
              <Button variant="outlined" color="primary" size="small">
                Edit profile
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle2" fontWeight={400}>
                2 posts
              </Typography>
              <Typography variant="subtitle2" fontWeight={400}>
                1342 followers
              </Typography>
              <Typography variant="subtitle2" fontWeight={400}>
                100 following
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography
                variant="subtitle2"
                sx={{ width: "400px" }}
                fontWeight={400}
              >
                BIO Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quidem architecto quibusdam aliquid, quasi hic sed corrupti
                reiciendis ex officia suscipit quia temporibus illum a qui
                molestiae cupiditate sunt sequi expedita!
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <hr />
      {/* POSTS BY USER */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center" }}
          fontWeight={400}
          fontSize={20}
        >
          Posts
        </Typography>

        <Stack
          mt={3}
          spacing={3}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems={{ xs: "center", sm: "" }}
        >
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Read More</Button>
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Read More</Button>
              {/* <Button size="small">Share</Button> */}
            </CardActions>
          </Card>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Read More</Button>
              {/* <Button size="small">Share</Button> */}
            </CardActions>
          </Card>
        </Stack>

        {/* SHOW THIS IF USER NOT HAVE POSTS */}
        {/* <Box>
          <Alert severity="warning">
            You have no posts. You can create a post by clicking the button
            below.
          </Alert>

          <center>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              sx={{ marginTop: "20px" }}
              startIcon={<AddIcon />}
            >
              Create post
            </Button>
          </center>
        </Box> */}
      </Box>
    </Container>
  );
}
