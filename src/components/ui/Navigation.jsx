import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Link as ChakraLink } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Box bg="blue.400" p={4} color="white">
      <Flex gap= {6} align="center" maxW="1400px" mx="auto">
        {/* Wrap the Image inside a Link */}
        <ChakraLink as={Link} to="/">
          <Image
            src="https://res.cloudinary.com/dqwxez1us/image/upload/v1726211971/Eventify_njhohr.webp"
            alt="logo Eventify"
            height="60px"
            borderRadius="4px"
          />
        </ChakraLink>

        <Flex gap={6}>
          <ChakraLink
            as={Link}
            to="/"
            _hover={{ textDecoration: "underline" }}
            color="white"
          >
            EventsPage
          </ChakraLink>
          <ChakraLink
            as={Link}
            to="/add-event"
            _hover={{ textDecoration: "underline" }}
            color="white"
          >
            Add Event
          </ChakraLink>
        </Flex>
      </Flex>
    </Box>
  );
};


