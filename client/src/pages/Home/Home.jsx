import React from "react";
import { Hero } from "../../components";
import { Button, Container } from "@mui/material";
//  THEME COLOR #1D4ED8
export default function Home() {
  return (
    <Container>
      <Hero />
      <h2>Fetch 6 Posts</h2>
    </Container>
  );
}
