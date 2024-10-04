import React from "react";
import { Box, Button, Input, Stack, Image } from "@chakra-ui/react";

export const ImageUploadComponent = ({
  imageOption,
  setImageOption,
  imageUrl,
  setImageUrl,
  uploadImage,
  imageUploadUrl,
}) => {
  return (
    <Box mb="6">
      <Stack direction="row" spacing="4" mb="4">
        <Button
          onClick={() => setImageOption("upload")}
          colorScheme={imageOption === "upload" ? "teal" : "gray"}
        >
          Upload Image
        </Button>
        <Button
          onClick={() => setImageOption("url")}
          colorScheme={imageOption === "url" ? "teal" : "gray"}
        >
          Use Image URL
        </Button>
      </Stack>

      {imageOption === "url" ? (
        <>
          <Input
            placeholder="Enter Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            mb="4"
          />
          {/* Render the preview if imageUrl is set */}
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="URL preview"
              maxWidth="200px"
              mt="4"
              borderRadius="md"
              boxShadow="md"
            />
          )}
        </>
      ) : (
        <Input type="file" accept="image/*" onChange={uploadImage} mb="6" />
      )}

      {imageUploadUrl && (
        <Image
          src={imageUploadUrl}
          alt="Uploaded preview"
          maxWidth="200px"
          mt="4"
          borderRadius="md"
          boxShadow="md"
        />
      )}
    </Box>
  );
};
