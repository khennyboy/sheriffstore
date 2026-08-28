import { Box } from "@chakra-ui/react";
import NavBar from "./component/NavBar";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import { useColorModeValue } from "./components/ui/color-mode";
import Modal from "./component/Modal";
import { Toaster } from "./components/ui/toaster";
import Footer from "./component/Footer";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.50", "gray.950")}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <Footer />
      <Modal />
      <Toaster />
    </Box>
  );
}

export default App;
