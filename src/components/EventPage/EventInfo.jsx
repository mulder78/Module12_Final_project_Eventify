import React from "react";
import { Box, Text, } from "@chakra-ui/react";

export const EventInfo = ({ location,  startTime, endTime }) => (
  <>
    
 
    <Box>
      <Text fontSize="sm" color="gray.800" fontWeight="bold">
        Location:
      </Text>
      <Text fontSize="sm" color="gray.600" mb={2}>
        {location}
      </Text>
      <Text fontSize="sm" color="gray.800" fontWeight="bold">
        Start:
      </Text>
      <Text fontSize="sm" color="gray.600" mb={2}>
        {new Date(startTime).toLocaleString()}
      </Text>
      <Text fontSize="sm" color="gray.800" fontWeight="bold">
        End:
      </Text>
      <Text fontSize="sm" color="gray.600">
        {new Date(endTime).toLocaleString()}
      </Text>
    </Box>
  </>
);
