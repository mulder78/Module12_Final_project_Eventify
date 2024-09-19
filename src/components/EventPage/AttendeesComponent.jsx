import React from "react";
import { Box, Text, Flex, IconButton, Card, CardHeader, CardBody, Heading } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export const AttendeesComponent = ({ attendees, onRemoveAttendee }) => (
  <Card w={["100%", "md", "xl"]} >
    <CardHeader>
      <Heading size="md" color="blue.700">
        Aanmeldingen
      </Heading>
    </CardHeader>
    <CardBody>
      {attendees.length === 0 ? (
        <Text>No one has signed up yet.</Text>
      ) : (
        <Box mt={2}>
          {attendees.map((attendee) => (
            <Flex key={attendee.id} align="center" mb={2}>
              <Text flex="1">{attendee.name}</Text>
              <IconButton
                aria-label="Remove attendee"
                icon={<CloseIcon />}
                colorScheme="red"
                size="sm"
                onClick={() => onRemoveAttendee(attendee)}
              />
            </Flex>
          ))}
        </Box>
      )}
    </CardBody>
  </Card>
);


