// src/components/EventPage/EventEditor.jsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { ImageUploadComponent } from "../ui/ImageUploadComponent";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Voegt een soepele scroll-animatie toe
  });
};

export const EventEditor = ({
  isEditing,
  setIsEditing,
  title,
  setTitle,
  description,
  setDescription,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  imageUrl,
  setImageUrl,
  uploadImage,
  handleEdit,
  imageOption,
  setImageOption,
  location,
  setLocation,
}) => {
  return (
    <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Description</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Location</FormLabel>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Start Time</FormLabel>
            <Input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>End Time</FormLabel>
            <Input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </FormControl>
          <ImageUploadComponent
            imageOption={imageOption}
            setImageOption={setImageOption}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            uploadImage={uploadImage}
            imageUploadUrl={imageUrl}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              handleEdit();
              scrollToTop(); // Scroll naar de bovenkant
            }}
          >
            Save
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsEditing(false);
              scrollToTop(); // Scroll naar de bovenkant
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};


