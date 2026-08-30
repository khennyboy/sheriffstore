import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import ConfirmDeleteDialog from "./component/ConfirmDalog";
import Footer from "./component/Footer";
import NavBar from "./component/NavBar";
import UpdateDialog from "./component/UpdateDialog";
import { useColorModeValue } from "./components/ui/color-mode";
import { Toaster } from "./components/ui/toaster";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.50", "gray.950")}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <Footer />
      <UpdateDialog />
      <ConfirmDeleteDialog />
      <Toaster />
    </Box>
  );
}

export default App;
