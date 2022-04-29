import React from "react";
import { useParams } from "react-router-dom";

export default function category() {
  const { category } = useParams();
  return <div>{category} Category</div>;
}
