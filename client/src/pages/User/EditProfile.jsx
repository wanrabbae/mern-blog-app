import {
  Container,
  Typography,
  Stack,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import React from "react";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const user = useSelector((state) => state.user);
  return (
    <Container>
      <Stack mt={10} justifyContent="center" alignItems={"center"}>
        <Card sx={{ width: "100%", height: 1000, margin: "20px 0px 20px 0px" }}>
          <CardContent>
            <Container>
              <Stack flexDirection={"column"}>
                <Typography
                  variant="h6"
                  fontWeight={400}
                  sx={{ marginBottom: "20px" }}
                >
                  General
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  sx={{ marginBottom: "20px" }}
                  value={user.name}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  sx={{ marginBottom: "20px" }}
                  value={user.email}
                />
                <TextField
                  id="outlined-textarea"
                  label="Bio"
                  placeholder="Enter bio"
                  multiline
                  rows={5}
                  value={user.bio}
                  sx={{ marginBottom: "50px" }}
                />
                {/* SOCIAL MEDIA */}
                <Typography
                  variant="h6"
                  fontWeight={400}
                  sx={{ marginBottom: "20px" }}
                >
                  Social Media
                </Typography>

                <TextField
                  id="outlined-basic"
                  label="Facebook"
                  variant="outlined"
                  placeholder="Enter facebook username"
                  sx={{ marginBottom: "20px" }}
                  helperText="e.g akhmadalwan"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {user.social.facebook}
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Instagram"
                  variant="outlined"
                  placeholder="Enter instagram username"
                  sx={{ marginBottom: "20px" }}
                  helperText="e.g wanrabbae"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {user.social.instagram}
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Twitter"
                  variant="outlined"
                  placeholder="Enter twitter username"
                  sx={{ marginBottom: "20px" }}
                  helperText="e.g Wan81295896"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {user.social.twitter}
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Github"
                  variant="outlined"
                  placeholder="Enter github username"
                  sx={{ marginBottom: "20px" }}
                  helperText="e.g wanrabbae"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {user.social.github}
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Button size="large" variant="contained">
                Save
              </Button>
            </Container>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Stack>
    </Container>
  );
}
