import React from "react";
import { Box,Image, Fade, Heading, Text} from "@chakra-ui/react";

export const EventHeader = ({ title, image, imageLoaded, onImageLoad, description }) => (
  <Box>
    <Box mb={2} mt= {2} px={5}>
    <Heading size={["md", "lg"]} color="blue.700" mb={2} >
      {title}
    </Heading>
    <Text fontSize="sm" color="gray.800">
      {description}
    </Text>
    </Box>
    <Fade in={imageLoaded}>
      <Image
        width="100%"
        src={image}
        alt={title}
        borderRadius="md"
        objectFit="cover"
        onLoad={onImageLoad}
        opacity={imageLoaded ? 1 : 0}
        transition="opacity 0.5s ease-in-out"
      />
    </Fade>
  </Box>
);


