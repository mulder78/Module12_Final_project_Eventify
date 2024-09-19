import React from "react";
import {
  Image,
  Heading,
  Text,
  Card,
  CardBody,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const EventsCard = ({ event }) => {
  

  return (
    <Card
      w="100%"
      maxW="320px"
      height={"100%"}
      mb="4"
      mx="auto"
      shadow="lg"
      borderRadius={"lg"}
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.05)" }}
    >
      <Link to={`/event/${event.id}`}>
        <Image
          src={event.image}
          alt={event.title}
          height={60}
          objectFit="cover"
          width="100%"
          borderRadius="lg"
        />
        <CardBody>
          <Box mb={6} borderBottom="1px" borderColor="gray.200">
            <Heading size="md" isTruncated mb={2} color="blue.700">
              {event.title}
            </Heading>
            <Text fontSize="sm" color="gray.600" isTruncated mb={2}>
              {event.description}
            </Text>
            
          </Box>
          <Box >
            <Text fontSize="sm" color="gray.800" fontWeight="bold" >
              Location:
            </Text>
            <Text fontSize="sm" color="gray.600" mb={2}>
              {event.location}
            </Text>
            <Text fontSize="sm" color="gray.800" fontWeight="bold" >
              Start:
            </Text>
            <Text fontSize="sm" color="gray.600" mb={2}>
              {new Date(event.startTime).toLocaleString()}
            </Text>
            <Text fontSize="sm" color="gray.800" fontWeight="bold" >
              End:
            </Text>
            <Text fontSize="sm" color="gray.600">
              {new Date(event.endTime).toLocaleString()}
            </Text>
          </Box>
        </CardBody>
      </Link>
    </Card>
  );
};



