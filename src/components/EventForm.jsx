import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import  {FormControlComponent}  from "./EventsForm/FormControlComponent";
import  {ImageUploadComponent}  from "./ui/ImageUploadComponent";
import  {CategorySelectComponent}  from "./EventsForm/CategorySelectComponent";
import  {uploadImageToCloudinary}  from "./ui/uploadImageToCloudinary";
import { ScrollToTopButton } from "../components/ui/ScrollToTopButton";
import { useNavigate } from "react-router-dom";

export const EventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageOption, setImageOption] = useState("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploadUrl, setImageUploadUrl] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserImage, setNewUserImage] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalCategoryId = categoryId;
      if (isCreatingCategory && newCategory) {
        const categoryRes = await fetch("http://localhost:3000/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCategory }),
        });
        const categoryData = await categoryRes.json();
        finalCategoryId = categoryData.id;
      }

      let finalUserId = selectedUser;
      if (isCreatingUser && newUserName) {
        const userRes = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newUserName, image: newUserImage }),
        });
        const userData = await userRes.json();
        finalUserId = userData.id;
      }

      const finalImageUrl = imageOption === "url" ? imageUrl : imageUploadUrl;
      const newEvent = {
        title,
        description,
        image: finalImageUrl,
        location,
        startTime,
        endTime,
        categoryIds: [parseInt(finalCategoryId)],
        userId: finalUserId || null,
        createdBy: finalUserId || null,
      };

      const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        toast({
          title: "Event added.",
          description: "Your event has been successfully added.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/");
      } else {
        throw new Error("Failed to add event");
      }

      setTitle("");
      setDescription("");
      setLocation("");
      setImageUrl("");
      setImageUploadUrl("");
      setStartTime("");
      setEndTime("");
      setCategoryId("");
      setNewCategory("");
      setIsCreatingCategory(false);
      setSelectedUser("");
      setIsCreatingUser(false);
      setNewUserName("");
      setNewUserImage("");
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const result = await uploadImageToCloudinary(file);
        setImageUploadUrl(result.secure_url);
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "There was an error uploading the image.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUserImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const result = await uploadImageToCloudinary(file);
        setNewUserImage(result.secure_url);
      } catch (error) {
        toast({
          title: "Upload failed",
          description: "There was an error uploading the image.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Box
      p="6"
      maxWidth="600px"
      mx="auto"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      mt={10}
      mb={10}
    >
      <Heading size={"md"} mb="6" textAlign="center" color={"blue.700"}>
        Add New Event
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControlComponent
            id="title"
            label="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isRequired
          />
          <FormControlComponent
            id="description"
            label="Description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isRequired
          />
          <FormControlComponent
            id="location"
            label="Location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            isRequired
          />
          <ImageUploadComponent
            imageOption={imageOption}
            setImageOption={setImageOption}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            uploadImage={handleImageUpload}
            imageUploadUrl={imageUploadUrl}
          />
          <FormControlComponent
            id="startTime"
            label="Start Time"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            isRequired
          />
          <FormControlComponent
            id="endTime"
            label="End Time"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            isRequired
          />
          <CategorySelectComponent
            categories={categories}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
            isCreatingCategory={isCreatingCategory}
            setIsCreatingCategory={setIsCreatingCategory}
            newCategory={newCategory}
            setNewCategory={setNewCategory}
          />
          <FormControl>
            <FormLabel>Select User</FormLabel>
            <Select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              placeholder="Select a user"
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </Select>
            <Flex align="center" mt={2}>
              <Checkbox
                isChecked={isCreatingUser}
                onChange={(e) => setIsCreatingUser(e.target.checked)}
              >
                Create new user
              </Checkbox>
            </Flex>
            {isCreatingUser && (
              <Box mt={4}>
                <FormControl>
                  <FormLabel>Select User</FormLabel>
                  <Select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    placeholder="Select a user"
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </Select>
                  <Flex align="center" mt={2}>
                    <Checkbox
                      isChecked={isCreatingUser}
                      onChange={(e) => setIsCreatingUser(e.target.checked)}
                    >
                      Create new user
                    </Checkbox>
                  </Flex>
                  {isCreatingUser && (
                    <Box mt={4}>
                      <FormControl>
                        <FormLabel>New User Name</FormLabel>
                        <Input
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          placeholder="Enter user name"
                        />
                      </FormControl>
                      <FormControl mt={4}>
                        <FormLabel>New User Image</FormLabel>
                        <Input type="file" onChange={handleUserImageUpload} />
                      </FormControl>
                    </Box>
                  )}
                </FormControl>
              </Box>
            )}
          </FormControl>
          <Flex gap= {2}>
            <Button
              type="submit"
              isLoading={loading}
              colorScheme="blue"
              size="md"
              width="min"
            >
              Add Event
            </Button>
            <Button
              onClick={() => navigate("/")}
              colorScheme="gray"
              size={["sm", "sm", "md"]}
            >
             CANCEL
            </Button>
          </Flex>
        </VStack>
      </form>
      <ScrollToTopButton />
    </Box>
  );
};
