import React from "react";
import { Hero } from "../../components";
import { Button, Container, Typography } from "@mui/material";
//  THEME COLOR #1D4ED8
export default function Home() {
  return (
    <Container>
      <Hero />
      <Typography variant="h2">Fetch 6 Posts</Typography>
    </Container>
  );
}
