// src/components/ui/CategorySelectComponent.jsx
import React from "react";
import { Select, Checkbox, Input, Flex, Box } from "@chakra-ui/react";

export const CategorySelectComponent = ({
  categories,
  categoryId,
  setCategoryId,
  isCreatingCategory,
  setIsCreatingCategory,
  newCategory,
  setNewCategory,
}) => {
  return (
    <div>
      <Select
        placeholder="Select category"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>

      <Flex align="center" mt={2} mb= {6}>
        <Checkbox
          isChecked={isCreatingCategory}
          onChange={(e) => setIsCreatingCategory(e.target.checked)}
        >
          Add New Category
        </Checkbox>
      </Flex>

      {isCreatingCategory && (
        <Box mt={4}>
          <Input
            placeholder="New category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </Box>
      )}
    </div>
  );
};
