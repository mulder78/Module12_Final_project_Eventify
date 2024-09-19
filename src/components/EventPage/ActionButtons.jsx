import React from "react";
import { Button, Flex } from "@chakra-ui/react";

export const ActionButtons = ({ onEdit, onDelete, onBack }) => (
  <Flex
    direction="row"
    gap="2"
    justifyContent={["flex-start", "flex-end"]}
    wrap="wrap"
  >
    
    <Button w={["60%", "auto"]} colorScheme="green" onClick={onEdit}>
      Edit Event
    </Button>
    <Button w={["60%", "auto"]} colorScheme="red" onClick={onDelete}>
      Delete Event
    </Button>
    <Button w={["60%", "auto"]} colorScheme="gray" onClick={onBack}>
      Back to Events
    </Button>
  </Flex>
);

