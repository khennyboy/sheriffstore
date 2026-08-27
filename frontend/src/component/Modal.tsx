import { CloseButton, Dialog } from "@chakra-ui/react";
import { useProductStore } from "../store/product-store";
import ProductForm from "./ProductForm";

const Modal = () => {
  const open = useProductStore((state) => state.open);
  const setIsOpen = useProductStore((state) => state.setIsOpen);
  const selectedProduct = useProductStore((state) => state.selectedProduct);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(e) => setIsOpen(e.open)}
      placement={"center"}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner p={4}>
        <Dialog.Content rounded={"2xl"} w={"full"} maxW={"420px"}>
          <Dialog.Header px={5} pt={5}>
            <Dialog.Title fontSize={"lg"} fontWeight={"bold"}>
              Update Product
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.CloseTrigger asChild>
            <CloseButton
              size="sm"
              position="absolute"
              top="3"
              right="3"
              rounded={"lg"}
            />
          </Dialog.CloseTrigger>

          <Dialog.Body px={4} pb={5}>
            <ProductForm
              initialValues={selectedProduct ?? undefined}
              submitLabel="Save Changes"
            />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default Modal;
