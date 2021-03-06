import * as React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  loginAction,
  registerAction,
  googleLoginAction,
  githubAccessToken,
} from "../../actions/authAction";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "react-google-login";

/* 
  GITHUB CLIENT ID = dded9a2b3c92c68b3cda
  GITHUB CLIENT SECRET = 939c81228e427f2d113c6ae06446910bb976fc32
*/

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        IndoCoders
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Sign() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  React.useEffect(async () => {
    console.log("Sign page!");
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }

    // if (searchParams.get("code")) {
    //   const accessToken = await githubAccessToken(
    //     searchParams.get("code"),
    //     "dded9a2b3c92c68b3cda",
    //     "939c81228e427f2d113c6ae06446910bb976fc32"
    //   );
    //   console.log(accessToken);
    // }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginAction(user, navigate));
      setUser({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    try {
      await dispatch(registerAction(user, navigate));
      setUser({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const responseSuccessGoogle = async (response) => {
    try {
      await googleLoginAction(
        {
          email: response?.profileObj.email,
          name: response?.profileObj.name || response?.profileObj.givenName,
          avatar: response?.profileObj.imageUrl,
        },
        navigate
      );
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const responseFailureGoogle = (err) => {
    console.log("GOOGLE LOGIN ERROR");
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {isSignUp ? (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmitRegister}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                type="name"
                autoFocus
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 3 }}
              >
                Sign Up
              </Button>
              <GoogleLogin
                clientId="778989205207-4amfgfequithj8g1kapgr24rvr0t9hkh.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    sx={{}}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Sign Up with Google
                  </Button>
                )}
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
              />
              {/* <Button fullWidth variant="contained" sx={{ mt: 1, mb: 2 }}>
                Sign Up with Github
              </Button> */}

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot account?
                  </Link>
                </Grid>
                <Grid
                  item
                  onClick={() => {
                    setIsSignUp(false);
                    setUser({ name: "", email: "", password: "" });
                  }}
                >
                  <Link href="#" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      ) : (
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                autoFocus
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {/* <CircularProgress color="white" /> */}
                Sign In
              </Button>
              <GoogleLogin
                clientId="778989205207-4amfgfequithj8g1kapgr24rvr0t9hkh.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GoogleIcon />}
                    sx={{}}
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    Sign In with Google
                  </Button>
                )}
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
              />
              {/* <Button
                fullWidth
                onClick={() => {
                  window.open(
                    `https://github.com/login/oauth/authorize?client_id=dded9a2b3c92c68b3cda&allow_signup=true`,
                    "_blank"
                  ) ||
                    window.location.replace(
                      `https://github.com/login/oauth/authorize?client_id=dded9a2b3c92c68b3cda&allow_signup=true`
                    );
                }}
                variant="contained"
                startIcon={<GitHubIcon />}
                sx={{ mt: 1, mb: 2 }}
              >
                Sign In with Github
              </Button> */}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid
                  item
                  onClick={() => {
                    setIsSignUp(true);
                    setUser({ name: "", email: "", password: "" });
                  }}
                >
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
