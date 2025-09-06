import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

function CycleTracker() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Cycle Tracker</Typography>
        <Typography variant="body2">
          Track your menstrual cycle here.
        </Typography>
        {/* Add form or calendar input here */}
      </CardContent>
    </Card>
  );
}

export default CycleTracker;