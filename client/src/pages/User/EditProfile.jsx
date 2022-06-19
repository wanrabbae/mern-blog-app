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
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  updateProfileAction,
  getProfileAction,
} from "../../actions/userAction";

export default function EditProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    bio: "user.bio",
    facebook: "user.social.facebook",
    instagram: "user.social.instagram",
    twitter: "user.social.twitter",
    github: "user.social.github",
  });

  useEffect(async () => {
    const data = await dispatch(getProfileAction(navigate));
    setUser(data);
  }, []);

  const updateProfile = async () => {
    try {
      await dispatch(updateProfileAction(userState, navigate));
      toast.success("Profile updated successfully");
      navigate("/user/profile");
    } catch (error) {
      toast.error("Error updating profile");
    }
  };

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
                  onChange={(e) =>
                    setUserState({ ...userState, name: e.target.value })
                  }
                  sx={{ marginBottom: "20px" }}
                  defaultValue={user.name}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  onChange={(e) =>
                    setUserState({ ...userState, email: e.target.value })
                  }
                  variant="outlined"
                  sx={{ marginBottom: "20px" }}
                  defaultValue={user.email}
                />
                <TextField
                  id="outlined-textarea"
                  label="Bio"
                  onChange={(e) =>
                    setUserState({ ...userState, bio: e.target.value })
                  }
                  placeholder="Enter bio"
                  multiline
                  rows={5}
                  defaultValue={user.bio}
                  sx={{ marginBottom: "50px" }}
                />
                {/* SOCIAL MEDIA */}
                <Typography
                  variant="h6"
                  fontWeight={400}
                  sx={{ marginBottom: "20px" }}
                >
                  Edit Social Media
                </Typography>

                <TextField
                  id="outlined-basic"
                  label="Facebook"
                  variant="outlined"
                  onChange={(e) =>
                    setUserState({ ...userState, facebook: e.target.value })
                  }
                  placeholder="Enter facebook username"
                  sx={{ marginBottom: "20px" }}
                  helperText="e.g akhmadalwan"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        https://www.facebook.com/
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Instagram"
                  variant="outlined"
                  onChange={(e) =>
                    setUserState({ ...userState, instagram: e.target.value })
                  }
                  placeholder="Enter instagram username"
                  sx={{ marginBottom: "20px" }}
                  helperText="e.g wanrabbae"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        https://www.instagram.com/
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Twitter"
                  onChange={(e) =>
                    setUserState({ ...userState, twitter: e.target.value })
                  }
                  variant="outlined"
                  placeholder="Enter twitter username"
                  sx={{ marginBottom: "20px" }}
                  helperText="e.g Wan81295896"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        https://www.twitter.com/
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Github"
                  variant="outlined"
                  onChange={(e) =>
                    setUserState({ ...userState, github: e.target.value })
                  }
                  placeholder="Enter github username"
                  sx={{ marginBottom: "20px" }}
                  helperText="e.g wanrabbae"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        https://www.github.com/
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack flexDirection={"row"} justifyContent="space-between">
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => updateProfile()}
                >
                  Save
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => navigate("/user/profile")}
                  color="error"
                >
                  Back
                </Button>
              </Stack>
            </Container>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      </Stack>
    </Container>
  );
}
