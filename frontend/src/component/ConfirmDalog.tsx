import { Button, Dialog, Text } from "@chakra-ui/react";
import useDeleteProduct from "../hooks/useDeleteproduct";
import { useProductStore } from "../store/product-store";

const ConfirmDeleteDialog = () => {
  const deleteDialog = useProductStore((state) => state.deleteDialog);
  const selectedProduct = useProductStore((state) => state.selectedProduct);
  const setDeleteDialog = useProductStore((state) => state.setDeleteDialog);
  const { deleteProduct, isDeleting } = useDeleteProduct();

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct._id);
    }
  };

  return (
    <Dialog.Root
      open={deleteDialog}
      onOpenChange={(e) => setDeleteDialog(e.open)}
      placement={"center"}
      role={"alertdialog"}
    >
      <Dialog.Backdrop />
      <Dialog.Positioner p={4}>
        <Dialog.Content rounded={"2xl"} w={"full"} maxW={"400px"}>
          <Dialog.Header px={5} pt={5}>
            <Dialog.Title fontSize={"lg"} fontWeight={"bold"}>
              Delete Product
            </Dialog.Title>
          </Dialog.Header>

          <Dialog.Body px={5}>
            <Text color={"gray.500"} fontSize={"sm"}>
              Are you sure you want to delete{" "}
              <Text as="span" fontWeight={"semibold"}>
                {selectedProduct?.name}
              </Text>
              ? This action cannot be undone.
            </Text>
          </Dialog.Body>

          <Dialog.Footer px={5} pb={5} gap={2}>
            <Button
              variant={"outline"}
              rounded={"lg"}
              onClick={() => setDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              colorPalette={"red"}
              rounded={"lg"}
              onClick={handleConfirmDelete}
              loading={isDeleting}
              loadingText="Deleting..."
            >
              Delete
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default ConfirmDeleteDialog;
