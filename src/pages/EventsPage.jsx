import React, { useEffect, useState, useRef } from "react";
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
import { EventsCard } from "../components/EventsPage/EventsCard";
import { ScrollToTopButton } from "../components/ui/ScrollToTopButton";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);

  const initialLoad = useRef(true); // Use useRef to track the initial page load

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
          setEvents([]);
          setError("Er is iets misgegaan bij het ophalen van de evenementen.");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
        setError(
          "Er kan geen verbinding worden gemaakt met de server. Probeer het later opnieuw."
        );
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
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchEvents();
    fetchCategories();
  }, []);

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
        mb={["8", "10"]}
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

      {/* Error message if events cannot be fetched */}
      {error ? (
        <Box textAlign="center" width="100%" mt="6">
          <Text fontSize="lg" color="red.500">
            {error}
          </Text>
        </Box>
      ) : (
        /* Render Filtered Events with Animation */
        <Flex wrap="wrap" justify="center" gap={[4, 6]} mb={6}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <ScaleFade
                key={event.id}
                initialScale={0.9}
                in={initialLoad.current} // Use initialLoad ref to control animation
                delay={index * 0.1}
              >
                <EventsCard event={event} />
              </ScaleFade>
            ))
          ) : (
            <Box textAlign="center" width="100%" mt="6">
              <Text fontSize="lg" color="gray.500">
                Geen evenementen gevonden.
              </Text>
            </Box>
          )}
        </Flex>
      )}

      <ScrollToTopButton />
    </Box>
  );
};
