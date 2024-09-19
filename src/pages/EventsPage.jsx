import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Select,
  Button,
  Stack,
  ScaleFade,
  Flex,
  Text,
} from "@chakra-ui/react";
import { EventsCard } from "../components/EventsPage/EventsCard"; // Import the EventCard component
import { ScrollToTopButton }  from "../components/ui/ScrollToTopButton";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]); // For filtering
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category filter
  const [isLoading, setIsLoading] = useState(true); // For animation purposes

  // Fetch events and categories
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        const data = await response.json();

        if (Array.isArray(data)) {
          setEvents(data);
        } else {
          console.error("Events data is not an array:", data);
          setEvents([]); // Fallback naar lege array als het geen array is
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]); // Fallback naar lege array bij fout
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();

        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error("Categories data is not an array:", data);
          setCategories([]); // Fallback naar lege array als het geen array is
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Fallback naar lege array bij fout
      }
    };

    fetchEvents();
    fetchCategories();
  }, []);

  // Reset search and filter
  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
  };

  // Filter events based on search and category
  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? event.categoryIds.includes(parseInt(selectedCategory))
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box p={["2", "4"]} mt="4" maxW={["100%", "1400px"]} mx="auto" mb="6">
      <Heading
        mb="8"
        mt="10"
        textAlign="center"
        fontSize={["2xl", "3xl", "4xl", "5xl"]}
        fontWeight="3xl"
        color={"blue.700"}
      >
        Welkom bij Eventify
      </Heading>

      {/* Search Input and Filter */}
      <Stack
        direction={{ base: "column", sm: "row" }}
        spacing={4}
        mb={["8","10"]} 
        align="center"
        justify="center"
      >
        <Input
          placeholder="Search events"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW="250px"
        />

        <Select
          placeholder="Filter by category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          maxW="250px"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>

        {/* Reset Button */}
        <Button colorScheme="red" onClick={handleReset}>
          Reset
        </Button>
      </Stack>

      {/* Render Filtered Events with Animation */}
      <Flex wrap="wrap" justify="center" gap={[4, 6]} mb={6}  >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <ScaleFade
              key={event.id}
              initialScale={0.9}
              in={!isLoading}
              delay={index * 0.1}
            >
              <EventsCard event={event} />
            </ScaleFade>
          ))
        ) : (
          <Box textAlign="center" width="100%" mt="6">
            <Text fontSize="lg" color="gray.500">
              No events found.
            </Text>
          </Box>
        )}
      </Flex>

      <ScrollToTopButton />
    </Box>
  );
};


