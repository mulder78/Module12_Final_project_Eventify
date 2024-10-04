import React from "react";
import {
  Image,
  Heading,
  Text,
  Card,
  CardBody,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventsCard = ({ event }) => {
  const fallbackImage = "https://via.placeholder.com/150";

  return (
    <Card
      w="100%"
      maxW="320px"
      minW="320px"
      minH="100%"
      mb="4"
      mx="auto"
      shadow="lg"
      borderRadius="lg"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Link to={`/event/${event.id}`}>
        <Image
          src={event.image || fallbackImage}
          alt={event.title}
          height="200px"
          objectFit="cover"
          width="100%"
          borderRadius="lg"
        />
        <CardBody>
          <Box mb={6} borderBottom="1px" borderColor="gray.200">
            <Heading size="sm" noOfLines={2} mb={2} color="blue.700">
              {event.title}
            </Heading>
            {/* <Text fontSize="sm" color="gray.600" noOfLines={4} mb={4}>
              {event.description}
            </Text> */}
          </Box>
          <Flex direction="column" mt="auto">
            <Text fontSize="sm" color="gray.800" fontWeight="bold">
              Location:
            </Text>
            <Text fontSize="sm" color="gray.600" mb={2}>
              {event.location}
            </Text>
            <Text fontSize="sm" color="gray.800" fontWeight="bold">
              Start:
            </Text>
            <Text fontSize="sm" color="gray.600" mb={2}>
              {new Date(event.startTime).toLocaleString()}
            </Text>
            <Text fontSize="sm" color="gray.800" fontWeight="bold">
              End:
            </Text>
            <Text fontSize="sm" color="gray.600">
              {new Date(event.endTime).toLocaleString()}
            </Text>
          </Flex>
        </CardBody>
      </Link>
    </Card>
  );
};
