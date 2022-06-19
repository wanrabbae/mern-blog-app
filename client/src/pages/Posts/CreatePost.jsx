import React, { useState } from "react";
import {
  Container,
  Typography,
  Stack,
  Card,
  MenuItem,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPostAction } from "../../actions/postAction";

export default function CreatePost() {
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const dispatch = useDispatch();

  let formData = new FormData();

  const createPost = async () => {
    try {
      formData.append("title", post.title);
      formData.append("description", post.description);
      formData.append("category", post.category);
      formData.append("content", post.content);
      formData.append("cover", post.cover);

      const data = await createPostAction(formData, navigate);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
                  Create new Post
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  onChange={(e) => setPost({ ...post, title: e.target.value })}
                  sx={{ marginBottom: "20px" }}
                />
                <TextField
                  id="outlined-basic"
                  label="Description"
                  onChange={(e) =>
                    setPost({ ...post, description: e.target.value })
                  }
                  variant="outlined"
                  sx={{ marginBottom: "20px" }}
                />
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Category"
                  onChange={(e) =>
                    setPost({ ...post, category: e.target.value })
                  }
                  sx={{ marginBottom: "20px" }}
                >
                  <MenuItem key={"Metaverse"} value={"Metaverse"}>
                    Metaverse
                  </MenuItem>
                  <MenuItem key={"Web Development"} value={"Web Development"}>
                    Web Development
                  </MenuItem>
                  <MenuItem key={"Blockchain"} value={"Blockchain"}>
                    Blockchain
                  </MenuItem>
                  <MenuItem key={"Restful API"} value={"Restful API"}>
                    Restful API
                  </MenuItem>
                </TextField>
                <TextField
                  id="outlined-textarea"
                  label="Content"
                  onChange={(e) =>
                    setPost({ ...post, content: e.target.value })
                  }
                  placeholder="Enter Content"
                  multiline
                  rows={5}
                  sx={{ marginBottom: "20px" }}
                />

                <Button
                  variant="contained"
                  component="label"
                  sx={{ marginBottom: "20px" }}
                >
                  Upload Cover File
                  <input
                    type="file"
                    onChange={(e) =>
                      setPost({ ...post, cover: e.target.files[0] })
                    }
                    hidden
                  />
                </Button>
              </Stack>
              <Stack flexDirection={"row"} justifyContent="space-between">
                <Button
                  size="large"
                  variant="contained"
                  onClick={() => createPost()}
                >
                  Create Post
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
        </Card>
      </Stack>
    </Container>
  );
}
