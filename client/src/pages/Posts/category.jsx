import React from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";

export default function category() {
  const { category } = useParams();
  return <Container>{category} Category</Container>;
}
