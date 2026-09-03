import { CloseButton, Dialog } from "@chakra-ui/react";
import { useProductStore } from "../store/product-store";
import { useShallow } from "zustand/react/shallow";
import ProductForm from "./ProductForm";

const UpdateDialog = () => {
  const { updateDialog, setUpdateDialog} = useProductStore(
    useShallow((state) => ({
      updateDialog: state.updateDialog,
      setUpdateDialog: state.setUpdateDialog,
      // selectedProduct: state.selectedProduct,
    })),
  );

  return (
    <Dialog.Root
      open={updateDialog}
      onOpenChange={(e) => setUpdateDialog(e.open)}
      placement={"center"}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner p={4}>
        <Dialog.Content rounded={"2xl"} w={"full"} maxW={"420px"}>
          <Dialog.Header>
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

          <Dialog.Body px={4}>
            <ProductForm
              submitLabel="Save Changes"
            />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default UpdateDialog;
