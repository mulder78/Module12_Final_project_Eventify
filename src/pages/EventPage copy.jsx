import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ScrollToTopButton } from "../components/ui/ScrollToTopButton";
import { EventCard } from "../components/EventPage/EventCard";
import { EditEventModal } from "../components/EventPage/EditEventModel";
import { AttendeesComponent } from "../components/EventPage/AttendeesComponent";
import { SignUpComponent } from "../components/EventPage/SignUpComponent";
import {
  Text,
  Button,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
  ScaleFade,
  Center,
} from "@chakra-ui/react";

// Upload afbeelding naar Cloudinary
const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "vz1056oo-Events"); // vervang door je upload preset

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dqwxez1us/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.secure_url; // Retourneert de veilige URL van de geüploade afbeelding
};

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState(""); // Locatie state
  const [newImageFile, setNewImageFile] = useState(null); // State voor nieuwe afbeelding
  const [newImageURL, setNewImageURL] = useState(""); // State voor nieuwe afbeeldings-URL
  const [previewImageURL, setPreviewImageURL] = useState(""); // State voor voorbeeld afbeelding
  const [isRemoving, setIsRemoving] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [attendeeName, setAttendeeName] = useState("");
  const [selectedAttendee, setSelectedAttendee] = useState(null);

  useEffect(() => {
    const fetchEventAndUser = async () => {
      try {
        const eventResponse = fetch(`http://localhost:3000/events/${eventId}`);
        const eventData = await eventResponse.then((res) => res.json());

        const userResponse = fetch(
          `http://localhost:3000/users/${eventData.createdBy}`
        );
        const userData = await userResponse.then((res) => res.json());

        // Parallel beide fetches laten uitvoeren
        const [event, user] = await Promise.all([eventData, userData]);

        // Data instellen
        setEvent(event);
        setTitle(event.title);
        setDescription(event.description);
        setStartTime(event.startTime);
        setEndTime(event.endTime);
        setLocation(event.location);
        setUser(user);
      } catch (error) {
        console.error("Error fetching event or user:", error);
      }
    };

    fetchEventAndUser();
  }, [eventId]);
  // Functie om de velden te resetten
  const resetFields = () => {
    setTitle(event.title);
    setDescription(event.description);
    setStartTime(event.startTime);
    setEndTime(event.endTime);
    setLocation(event.location);
    setNewImageFile(null);
    setNewImageURL("");
    setPreviewImageURL(""); // Reset de voorbeeld afbeelding
    setIsEditing(false);
  };

  // Functie om de bewerking op te slaan
  const handleEdit = async () => {
    let imageUrl = event.image; // Bestaande afbeelding

    try {
      // Als er een nieuwe afbeelding is geüpload, upload deze naar Cloudinary
      if (newImageFile) {
        try {
          imageUrl = await uploadImageToCloudinary(newImageFile);
        } catch (error) {
          toast({
            title: "Error uploading image.",
            description: error.message,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }
      } else if (newImageURL) {
        imageUrl = newImageURL; // Gebruik de nieuwe afbeeldings-URL
      }

      // Update het event
      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          startTime,
          endTime,
          location,
          image: imageUrl,
          categoryIds: event.categoryIds, // Voeg categoryIds toe
          userId: event.userId, // Voeg userId toe
          createdBy: event.createdBy, // Voeg createdBy toe
        }), // Voeg afbeelding en andere waarden toe
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      const data = await response.json();
      setEvent(data); // Werk het event bij met de nieuwe data

      toast({
        title: "Event updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      resetFields(); // Reset velden na succesvol opslaan

      // Paginavernieuwing om de velden te verversen
      window.location.reload();
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Functie om het event te verwijderen
  const handleDelete = () => {
    fetch(`http://localhost:3000/events/${eventId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: "Event deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/");
        } else {
          throw new Error("Failed to delete event");
        }
      })
      .catch((error) => {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  // Functie om een voorbeeld van de nieuwe afbeelding weer te geven
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewImageFile(file);

    // Voorbeeld van de afbeelding tonen
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImageURL(""); // Reset als er geen bestand is
    }
  };

  const handleSignUp = () => {
    if (!attendeeName.trim()) {
      toast({
        title: "Name is required.",
        description: "Please enter your name before signing up.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    fetch(`http://localhost:3000/attendees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: attendeeName, eventId }),
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: "Signed up successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setAttendeeName("");
          return response.json();
        } else {
          throw new Error("Failed to sign up");
        }
      })
      .then((data) => setAttendees([...attendees, data]))
      .catch((error) => {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleRemoveAttendee = () => {
    fetch(`http://localhost:3000/attendees/${selectedAttendee.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          toast({
            title: "Attendee removed.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setIsRemoving(false);
          return response.json();
        } else {
          throw new Error("Failed to remove attendee");
        }
      })
      .then(() =>
        setAttendees(
          attendees.filter((attendee) => attendee.id !== selectedAttendee.id)
        )
      )
      .catch((error) => {
        toast({
          title: "An error occurred.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  if (!event || !user) {
    return <Text>Loading...</Text>;
  }

  return (
    <Center>
      <Flex
        justifyContent="center"
        flexDir={"column"}
        mt={{ base: 5, md: 10 }}
        mb={10}
      >
        <ScaleFade initialScale={0.9} in={!!event}>
          <EventCard
            event={event}
            user={user}
            onDelete={() => setIsDeleting(true)}
            onEdit={() => setIsEditing(true)}
          />
        </ScaleFade>

        <SignUpComponent
          attendeeName={attendeeName}
          setAttendeeName={setAttendeeName}
          handleSignUp={() => handleSignUp()}
        />
        <AttendeesComponent
          attendees={attendees}
          onRemoveAttendee={(attendee) => {
            setSelectedAttendee(attendee);
            setIsRemoving(true);
          }}
        />

        {/* Modal voor het bewerken */}
        <EditEventModal
          isOpen={isEditing}
          onClose={resetFields}
          event={event}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          location={location}
          setLocation={setLocation}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          previewImageURL={previewImageURL}
          newImageURL={newImageURL}
          setNewImageURL={setNewImageURL}
          handleImageUpload={handleImageUpload}
          handleEdit={handleEdit}
          resetFields={resetFields}
        />

        {/* Bevestigingsmodal voor verwijderen */}
        <Modal isOpen={isDeleting} onClose={() => setIsDeleting(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Confirm Delete</ModalHeader>
            <ModalBody>Are you sure you want to delete this event?</ModalBody>
            <ModalFooter justifyContent={"center"}>
              <Flex gap={4}>
                <Button variant="outline" onClick={() => setIsDeleting(false)}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={handleDelete}>
                  Delete
                </Button>
              </Flex>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal isOpen={isRemoving} onClose={() => setIsRemoving(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Remove Attendee</ModalHeader>
            <ModalBody>
              <Text>
                Are you sure you want to remove {selectedAttendee?.name}?
              </Text>
            </ModalBody>
            <ModalFooter justifyContent={"center"}>
              <Button variant="outline" onClick={() => setIsRemoving(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" mr={3} onClick={handleRemoveAttendee}>
                Remove
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <ScrollToTopButton />
      </Flex>
    </Center>
  );
};
