import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function PersonalDashboard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Personal Dashboard</Typography>
        <Typography variant="body2">
          View your cycle summary and workout progress here.
        </Typography>
        {/* Add stats, charts, or quick links here */}
      </CardContent>
    </Card>
  );
}

export default PersonalDashboard;