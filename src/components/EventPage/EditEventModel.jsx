// EditEventModal.jsx
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  Button,
} from "@chakra-ui/react";

export const EditEventModal = ({
  isOpen,
  onClose,
  event,
  title,
  setTitle,
  description,
  setDescription,
  location,
  setLocation,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  previewImageURL,
  newImageURL,
  setNewImageURL,
  handleImageUpload,
  handleEdit,
  resetFields,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Event</ModalHeader>
        <ModalBody mt= {4}>
          <FormControl mb={4}>
            <FormLabel>Current Image</FormLabel>
            <Image
              src={event.image}
              alt={event.title}
              borderRadius="md"
              boxSize="100%"
              objectFit="cover"
            />
          </FormControl>
          <FormControl mt={4}>
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
          <FormControl mt={4}>
            <FormLabel>New Image</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </FormControl>
          {previewImageURL && (
            <FormControl mt={4}>
              <FormLabel>Preview Image</FormLabel>
              <Image
                src={previewImageURL}
                alt="Preview"
                borderRadius="md"
                boxSize="200px"
                objectFit="cover"
              />
            </FormControl>
          )}
          <FormControl mt={4}>
            <FormLabel>New Image URL</FormLabel>
            <Input
              value={newImageURL}
              onChange={(e) => setNewImageURL(e.target.value)}
              placeholder="Enter new image URL"
            />
          </FormControl>
          {newImageURL && (
            <FormControl mt={4}>
              <FormLabel>Preview Image from URL</FormLabel>
              <Image
                src={newImageURL}
                alt="Preview"
                borderRadius="md"
                boxSize="200px"
                objectFit="cover"
              />
            </FormControl>
          )}
        </ModalBody>
        <ModalFooter  justifyContent={"space-between"}>
          <Button variant="outline" onClick={resetFields}>
            Cancel
          </Button>
          <Button colorScheme="teal" mr={3} onClick={handleEdit}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditEventModal;
