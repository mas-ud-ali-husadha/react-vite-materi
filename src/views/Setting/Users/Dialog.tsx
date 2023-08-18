import {
  Button,
  Form,
  ImageInputBlock,
  Input,
  InputLabel,
  Modal,
  Switch,
} from "@/components/ui";
import toBase64 from "@/helper/toBase64";
import useFetchData from "@/hooks/useFetchData";
import { createUser, editUser } from "@/store/setting/users/action";
import { ListData } from "@/types/UserTypes";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoSaveSharp } from "react-icons/io5";
import { Status, defaultValues } from "./variable";

interface DialogType {
  open: boolean;
  refresh: () => void;
  onClose: () => void;
  editData: ListData;
}

const Dialog = ({ open, refresh, onClose, editData }: DialogType) => {
  const { id } = editData;

  const {
    register,
    handleSubmit,
    reset,
    control,
    setError,
    formState: { errors },
  } = useForm<ListData>();

  useEffect(() => {
    if (id) {
      reset(editData);
    } else {
      reset(defaultValues);
    }
  }, [reset, id, editData]);

  const request = useFetchData({
    action: id ? editUser : createUser,
    setError: setError,
    onSuccess: () => {
      reset();
      refresh();
      onClose();
    },
  });

  const onSubmit = async (data: ListData) => {
    if (data.photo) {
      data.photo = await toBase64(data.photo);
    }
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
      title={id ? "Edit User" : "Tambah User"}
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="items-center justify-center"
      >
        <Controller
          control={control}
          name="photo"
          render={({ field }) => <ImageInputBlock {...field} />}
        />

        <InputLabel label="Nama" name="name" errors={errors}>
          <Input
            {...register("name", {
              required: "Nama wajib diisi",
            })}
            placeholder="Nama user"
          />
        </InputLabel>
        <InputLabel label="Email" name="email" errors={errors}>
          <Input
            {...register("email", {
              required: "Email wajib diisi",
              pattern: {
                value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                message: "Format Email salah",
              },
            })}
            placeholder="admin@javacode.landa.id"
          />
        </InputLabel>

        <InputLabel label="Phone" name="phone_number" errors={errors}>
          <Input
            {...register("phone_number", {
              required: "Phone wajib diisi",
              pattern: {
                value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                message: "Format Phone salah",
              },
            })}
            placeholder="+62"
          />
        </InputLabel>

        <InputLabel
          label="Password"
          name="password"
          errors={errors}
          desc="Apabila kosong, password generate dari email"
        >
          <Input
            {...register("password", {
              required: "Password wajib diisi",
              minLength: {
                message: "Kolom Kata Sandi minimal harus 6 karakter. ",
                value: 6,
              },
            })}
            type="password"
            placeholder="Password User"
          />
        </InputLabel>

        <InputLabel label="Status" name="user_roles_id" errors={errors}>
          <Controller
            name="user_roles_id"
            control={control}
            rules={{
              required: "Status wajib diisi",
            }}
            render={({ field }) => <Switch {...field} data={Status} />}
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
