import { Button, Form, Input, InputLabel, Modal } from "@/components/ui";
import useFetchData from "@/hooks/useFetchData";
import { createCategory, editCategory } from "@/store/setting/category/action";
import { ListData } from "@/types/CategoryTypes";
import { DialogType } from "@/types/DialogTypes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoSaveSharp } from "react-icons/io5";

const defaultValues = {
  name: "",
};

const Dialog = ({ open, refresh, onClose, editData }: DialogType<ListData>) => {
  const { id } = editData;

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ListData>({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (id) {
      reset(editData);
    } else {
      reset(defaultValues);
    }
  }, [reset, id, editData]);

  const request = useFetchData({
    action: id ? editCategory : createCategory,
    setError: setError,
    onSuccess: () => {
      reset();
      refresh();
      onClose();
    },
  });

  const onSubmit = (data: ListData) => {
    void request.fetch(data);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        reset();
      }}
      loading={request.loading}
      title={id ? "Edit Kategori" : "Tambah Kategori"}
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="items-center justify-center"
      >
        <InputLabel label="Nama" name="name" errors={errors}>
          <Input
            {...register("name", {
              required: "Nama wajib diisi",
            })}
            placeholder="Nama kategori"
          />
        </InputLabel>

        <div className="flex ml-auto ">
          <Button
            icon={IoSaveSharp}
            disabled={request.loading}
            variant="primary-border"
            text="Simpan"
          />
        </div>
      </Form>
    </Modal>
  );
};

export default Dialog;
