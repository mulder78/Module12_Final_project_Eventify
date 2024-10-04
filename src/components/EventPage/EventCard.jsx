import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Button,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const EventCard = ({ event, user, onDelete, onEdit }) => {
  const navigate = useNavigate();

  if (!event || !user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Card w={["100%", "md", "xl"]} mb={[4, 10]}>
      <CardHeader>
        <Image
          src={event.image}
          alt={event.title}
          borderRadius="md"
          width="100%"
          height={{ base: "auto", md: "300px" }}
          objectFit="cover"
        />
        <Heading size={["md", "lg"]} color="blue.700" mt={4} mb={-4}>
          {event.title}
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>
          <strong>Omschrijving:</strong>
        </Text>
        <Text mb="6">{event.description}</Text>
        <Text>
          <strong>Locatie:</strong>
        </Text>
        <Text mb="2">{event.location}</Text>
        <Text>
          <strong>Start Time:</strong>
        </Text>
        <Text mb="2">{new Date(event.startTime).toLocaleString()}</Text>
        <Text>
          <strong>End Time:</strong>
        </Text>
        <Text mb="2">{new Date(event.endTime).toLocaleString()}</Text>
        <Box mt={10}>
          <Flex direction={"row"} justifyContent="space-between" mb="4">
            <Button onClick={onEdit} colorScheme="teal">
              Edit
            </Button>
            <Button onClick={onDelete} colorScheme="red">
              Delete
            </Button>
          </Flex>
          <Button onClick={() => navigate("/")} colorScheme="gray">
            Back to Events
          </Button>
        </Box>
      </CardBody>
      <CardFooter>
        <Box mt="4">
          <Text fontSize="sm" fontWeight="bold">
            Created by: {user.name}
          </Text>
          <Image
            src={user.image}
            alt={user.name}
            borderRadius="full"
            boxSize="50px"
            mt="2"
          />
        </Box>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
