import {
  Button,
  Card,
  ImageInputBlock,
  Input,
  InputLabel,
  PageTitle,
  Switch,
} from "@/components/ui";
import formatRupiah from "@/helper/formatRupiah";
import useFetchData from "@/hooks/useFetchData";
import { getCategory } from "@/store/setting/category/action";
import { Data } from "@/types/CategoryTypes";
import { FormData } from "@/types/ProductTypes";
import { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  AiFillMinusSquare,
  AiFillPlusSquare,
  AiFillSave,
} from "react-icons/ai";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { createProduct } from "@/store/setting/product/action";
import toBase64 from "@/helper/toBase64";
import Select from "@/components/ui/Select";

const Status = [
  {
    label: "Ada",
    value: 1,
  },
  {
    label: "Habis",
    value: 0,
  },
];

const Type = [
  {
    label: "Toping",
    value: "Toping",
  },
  {
    label: "Level",
    value: "Level",
  },
];

const Add = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      photo_url: "",
      product_category_id: null,
      is_available: null,
      price: "",
      description: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const detail = useFetchData<Data>({
    action: getCategory,
    onSuccess: (item) => {
      console.log(item);
    },
  });

  const add = useFetchData<Data>({
    action: createProduct,
    onSuccess: (item) => {
      console.log(item);
    },
  });

  useEffect(() => {
    void detail.fetch();
  }, []);

  const handleBack = () => {
    navigate("/menu");
  };

  const onSubmit = async (data: FormData) => {
    if (data.photo_url) {
      data.photo_url = await toBase64(data.photo_url);
    }
    void add.fetch(data);
  };

  return (
    <>
      <PageTitle title="Tambah Menu" />

      <Card border type="primary" padding>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Controller
              control={control}
              name="photo_url"
              render={({ field }) => <ImageInputBlock {...field} />}
            />
            <div className="flex flex-col gap-2 col-span-2">
              <InputLabel label="Nama" name="name" errors={errors}>
                <Input
                  {...register("name", {
                    required: "Nama wajib diisi",
                  })}
                  placeholder="Nama user"
                />
              </InputLabel>
              <InputLabel
                label="Kategori"
                name="product_category_id"
                errors={errors}
              >
                <Controller
                  name="product_category_id"
                  control={control}
                  rules={{
                    required: "Kategori wajib diisi",
                  }}
                  render={({ field }) => (
                    <Switch
                      {...field}
                      data={detail?.response?.list || []}
                      label="name"
                      returnValue="id"
                    />
                  )}
                />
              </InputLabel>
              <InputLabel label="Status" name="is_available" errors={errors}>
                <Controller
                  name="is_available"
                  control={control}
                  rules={{
                    required: "Status wajib diisi",
                  }}
                  render={({ field }) => <Switch {...field} data={Status} />}
                />
              </InputLabel>
              <InputLabel label="Harga" name="price" errors={errors}>
                <Controller
                  name="price"
                  control={control}
                  rules={{
                    required: "Harga wajib diisi",
                  }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={formatRupiah(field.value)}
                      placeholder="10.000"
                    />
                  )}
                />
              </InputLabel>
              <InputLabel label="Deskripsi" name="description" errors={errors}>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <CKEditor
                      {...field}
                      editor={ClassicEditor}
                      onChange={(_, i) => field.onChange(i.getData())}
                    />
                  )}
                />
              </InputLabel>
            </div>
            <div className="col-span-2">
              <table className="w-full border-collapse">
                <thead className="bg-gray-100 h-12 font-bold">
                  <tr>
                    <td className="w-16">
                      <AiFillPlusSquare
                        className="text-gray-400 cursor-pointer flex m-auto"
                        size="1.8em"
                        onClick={() =>
                          append({ description: "", type: "", price: "" })
                        }
                      />
                    </td>
                    <td>Keterangan</td>
                    <td>Type</td>
                    <td>Harga</td>
                  </tr>
                </thead>
                <tbody>
                  {fields.map((item, index) => (
                    <tr className="h-16 border-b" key={item.id}>
                      <td>
                        <AiFillMinusSquare
                          className="text-red-400 rounded-md cursor-pointer flex m-auto"
                          size="1.8em"
                          onClick={() => {
                            remove(index);
                          }}
                        />
                      </td>
                      <td>
                        <Input
                          className="w-28"
                          {...register(`details.${index}.description`)}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`details.${index}.type`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              {...field}
                              data={Type}
                              label="label"
                              returnValue="value"
                            />
                          )}
                        />
                      </td>
                      <td>
                        <Controller
                          name={`details.${index}.price`}
                          control={control}
                          render={({ field }) => (
                            <Input
                              {...field}
                              value={formatRupiah(field.value)}
                              placeholder="10.000"
                              className="w-28"
                            />
                          )}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end gap-3 ml-auto w-full ">
            <Button
              variant="primary-outlined"
              text="Kembali"
              icon={BsArrowLeft}
              onClick={handleBack}
            />
            <Button text="Simpan" icon={AiFillSave} />
          </div>
        </form>
      </Card>
    </>
  );
};

export default Add;
