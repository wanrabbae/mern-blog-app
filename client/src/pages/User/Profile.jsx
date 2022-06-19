import React, { useEffect, useState } from "react";
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
  Link,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";

import { getProfileAction } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    avatar: "",
    name: "",
    bio: "",
    social: {},
    post: [],
  });

  useEffect(async () => {
    const data = await dispatch(getProfileAction(navigate));
    setProfile(data);
  }, []);

  // const userSocialMedia = profile.social.map((social) => (
  //   <>
  //     <Link href={social.github} target="_blank" underline="none">
  //       <GitHubIcon />
  //     </Link>
  //     <InstagramIcon />
  //     <FacebookIcon />
  //     <TwitterIcon />
  //     <GitHubIcon />
  // ));

  const userPosts = profile.post.map((post) => (
    <Card sx={{ maxWidth: 345, height: 400 }}>
      <CardMedia
        component="img"
        height="200"
        image={post.cover.url}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/post/${post.id}`)}>
          Read More
        </Button>
      </CardActions>
    </Card>
  ));

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
            alt="Porfile"
            src={profile.avatar.url}
            sx={{ width: 150, height: 150 }}
          />
          <Stack direction="column" spacing={3}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Typography variant="h6">{profile.name}</Typography>
              <Button
                onClick={() => navigate("/user/edit-profile")}
                variant="outlined"
                color="primary"
                size="small"
              >
                Edit profile
              </Button>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="subtitle2" fontWeight={400}>
                {profile.post.length} posts
              </Typography>
              <Typography variant="subtitle2" fontWeight={400}>
                1342 followers
              </Typography>
              <Typography variant="subtitle2" fontWeight={400}>
                100 following
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Link
                href={profile.social.instagram}
                target="_blank"
                underline="none"
                sx={{ color: "#fb3958" }}
              >
                <InstagramIcon />
              </Link>
              <Link
                href={profile.social.facebook}
                target="_blank"
                underline="none"
                sx={{ color: "#4267B2" }}
              >
                <FacebookIcon />
              </Link>
              <Link
                href={profile.social.twitter}
                target="_blank"
                underline="none"
                sx={{ color: "#00acee" }}
              >
                <TwitterIcon />
              </Link>
              <Link
                href={profile.social.github}
                target="_blank"
                underline="none"
                sx={{ color: "black" }}
              >
                <GitHubIcon />
              </Link>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography
                variant="subtitle2"
                sx={{ width: "400px" }}
                fontWeight={400}
              >
                {profile.bio}
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

        {profile.post.length > 0 ? (
          userPosts
        ) : (
          <Box>
            <Alert severity="warning">
              You have no posts. You can create a post by clicking the button
              below.
            </Alert>

            <center>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => navigate("/post/create")}
                sx={{ marginTop: "20px" }}
                startIcon={<AddIcon />}
              >
                Create post
              </Button>
            </center>
          </Box>
        )}
      </Box>
    </Container>
  );
}
