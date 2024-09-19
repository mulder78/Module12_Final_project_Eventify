// src/components/ui/FormControlComponent.jsx
import React from "react";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";

export const FormControlComponent = ({
  id,
  label,
  type,
  value,
  onChange,
  isRequired,
}) => {
  return (
    <FormControl id={id} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {type === "textarea" ? (
        <Textarea value={value} onChange={onChange} />
      ) : (
        <Input type={type} value={value} onChange={onChange} />
      )}
    </FormControl>
  );
};

