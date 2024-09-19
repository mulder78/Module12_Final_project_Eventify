import { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import  { ChevronUpIcon } from "@chakra-ui/icons";

export  const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <IconButton
        icon={<ChevronUpIcon />}
        onClick={scrollToTop}
        position="fixed"
        bottom="30px"
        right="30px"
        zIndex="1000"
        backgroundColor="blue.500"
        color="white"
        _hover={{ backgroundColor: "blue.700" }}
        aria-label="Scroll to top"
      />
    )
  );
};


