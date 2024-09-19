import React from "react";
import { FormControl, FormLabel, Input, Button, Card, CardBody, CardHeader, CardFooter, Heading } from "@chakra-ui/react";

export const SignUpComponent = ({ attendeeName, setAttendeeName, handleSignUp }) => (
  <Card w={["100%", "md", "xl"]} mb={[4,10]}>
    <CardHeader mb= {-4}>
    <Heading size="md" color="blue.700">
      Sign Up for the Event
    </Heading>
    </CardHeader>
    <CardBody>
    <FormControl>
      <FormLabel>Your Name</FormLabel>
      <Input
        value={attendeeName}
        onChange={(e) => setAttendeeName(e.target.value)}
        placeholder="Enter your name"
        w={["100%", "sm"]}
        mt={2}
      />
    </FormControl>
    </CardBody>
    <CardFooter>
    <Button colorScheme="blue" onClick={handleSignUp} size={["sm", "md"]}>
      Sign Up
    </Button>

  </CardFooter>
  </Card>
);


