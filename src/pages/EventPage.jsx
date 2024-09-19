import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Image,
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
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { ScrollToTopButton} from "../components/ui/ScrollToTopButton";
import {ActionButtons} from "../components/EventPage/ActionButtons";
import  {AttendeesComponent}  from "../components/EventPage/AttendeesComponent";
import {SignUpComponent} from "../components/EventPage/SignUpComponent";
import {EventHeader} from "../components/EventPage/EventHeader";
import {EventInfo} from "../components/EventPage/EventInfo";
import { uploadImageToCloudinary}  from "../components/ui/uploadImageToCloudinary";
import{ EventEditor} from "../components/EventPage/EventEditor";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [attendeeName, setAttendeeName] = useState("");
  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageOption, setImageOption] = useState("upload");

  useEffect(() => {
    fetch(`http://localhost:3000/events/${eventId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Voeg dit toe om de response te inspecteren
        setEvent(data);
        setTitle(data.title);
        setDescription(data.description);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setLocation(data.location);
        return fetch (`http://localhost:3000/users/${data.userId}`)
      })
      .then((response) => response.json())
      .then((userData) => setUser(userData))
      .then(() =>
        fetch(`http://localhost:3000/attendees?eventId=${eventId}`)
          .then((response) => response.json())
          .then((data) => setAttendees(data))
      );
  }, [eventId]);

  const handleSaveEvent = async () => {
    try {
      let imageUrlToSave = imageUrl;

      if (selectedFile) {
        const uploadData = await uploadImageToCloudinary(selectedFile);
        imageUrlToSave = uploadData.secure_url;
      }

      const eventData = {
        title,
        description,
        startTime,
        endTime,
        image: imageUrlToSave,
        location,
      };

      const response = await fetch(`http://localhost:3000/events/${eventId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const updatedEvent = await response.json(); // Hier haal je het geüpdatete event op
        setEvent(updatedEvent); // Update de event state met het geüpdatete event
        toast({
          title: "Event updated.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setIsEditing(false);

        window.scrollTo({
          top: 0,
          behavior: "smooth", // Dit zorgt voor een vloeiende scroll
        });

        return response.json();
      } else {
        throw new Error("Failed to update event");
      }
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

  const handleEdit = () => {
    handleSaveEvent();
  };

  

  const handleDelete = async () => {
    try {
      // Stap 1: Verwijder het evenement
      const deleteResponse = await fetch(
        `http://localhost:3000/events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete event");
      }

      // Stap 2: Haal alle evenementen op
      const eventsResponse = await fetch("http://localhost:3000/events");
      const events = await eventsResponse.json();

      // Verzamel alle categorieën die nog in gebruik zijn
      const usedCategoryIds = new Set();
      events.forEach((event) => {
        event.categoryIds.forEach((id) => usedCategoryIds.add(id));
      });

      // Stap 3: Haal alle categorieën op
      const categoriesResponse = await fetch(
        "http://localhost:3000/categories"
      );
      const categories = await categoriesResponse.json();

      // Zoek naar ongebruikte categorieën
      const unusedCategories = categories.filter(
        (category) => !usedCategoryIds.has(category.id)
      );

      // Stap 4: Verwijder ongebruikte categorieën
      await Promise.all(
        unusedCategories.map((category) =>
          fetch(`http://localhost:3000/categories/${category.id}`, {
            method: "DELETE",
          })
        )
      );

      // Toon succesbericht en navigeer weg
      toast({
        title: "Event deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
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

  const uploadImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageUrl(URL.createObjectURL(file)); // Preview the image
    }
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
    <Flex justifyContent="center" mt={{ base: 0, md: 10 }} mb={10} px={"2"}>
      <ScaleFade initialScale={0.9} in={!!event}>
        <Card w={["100%", "md", "xl"]} mt={10} mb={[4,10]}>
          <EventHeader
            title={event.title}
            description={event.description}
            image={event.image}
            imageLoaded={imageLoaded}
            onImageLoad={() => setImageLoaded(true)}
          />
          <CardBody>
            <EventInfo
              title={event.title}
              image={event.image}
              imageLoaded={imageLoaded}
              onImageLoad={() => setImageLoaded(true)}
              description={event.description}
              startTime={event.startTime}
              endTime={event.endTime}
              location={event.location}
            />
            <Box mt="8">
              <Text fontSize="sm" color="gray.800" fontWeight="bold">
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
          </CardBody>
          <CardFooter>
            <ActionButtons
              onEdit={() => setIsEditing(true)}
              onDelete={() => setIsDeleting(true)}
              onBack={() => navigate("/")}
            />
          </CardFooter>
        </Card>

        
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
        

        <EventEditor
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          uploadImage={uploadImage}
          handleEdit={handleEdit}
          imageOption={imageOption}
          setImageOption={setImageOption}
          setLocation={setLocation}
        />
        <Modal isOpen={isDeleting} onClose={() => setIsDeleting(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Event</ModalHeader>
            <ModalBody>
              <Text>Are you sure you want to delete this event?</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="outline" onClick={() => setIsDeleting(false)}>
                Cancel
              </Button>
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
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleRemoveAttendee}>
                Remove
              </Button>
              <Button variant="outline" onClick={() => setIsRemoving(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </ScaleFade>
      <ScrollToTopButton />
    </Flex>
  );
};
