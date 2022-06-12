import { Box, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#000" }}>
      <Box sx={{ padding: "20px 20px 20px 20px" }}>
        <Typography variant="subtitle1" sx={{ color: "gray" }}>
          Copyright © 2022 IndoC0ders - All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}
