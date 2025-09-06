import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function CalenderView() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Calendar View</Typography>
        <Typography variant="body2">
          Visualize your cycle and workouts on a calendar.
        </Typography>
        {/* Add calendar component here */}
      </CardContent>
    </Card>
  );
}

export default CalenderView;