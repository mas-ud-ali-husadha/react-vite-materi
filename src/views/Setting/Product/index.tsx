import {
  Card,
  ActionButton,
  Table,
  PageTitle,
  Button,
  Pagination,
} from "@/components/ui";
import { useState, useEffect, useRef, useCallback } from "react";
import { BsPlusLg } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { ListData, UserParams } from "@/types/UserTypes";
import DeleteModal from "@/components/ui/DeleteModal";
import useFetchData from "@/hooks/useFetchData";
import formatRupiah from "@/helper/formatRupiah";
import { deleteProduct, getListProduct } from "@/store/setting/product/action";
import { changePage } from "@/store/setting/product/slice";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [dialog, setDialog] = useState({
    modal: false,
    delete: false,
  });

  const navigate = useNavigate();
  const deleteId = useRef<number | null>(null);
  const { list, params, total, loading } = useAppSelector(
    (state) => state.product
  );

  const headers = [
    {
      name: "Gambar",
      custom: (item: any) => {
        return <img src={item.photo_url} />;
      },
    },
    {
      name: "Nama",
      key: "name",
      className: "text-center",
    },
    {
      name: "Kategori",
      key: "product_category_name",
      className: "text-center",
    },
    {
      name: "Status",
      custom: (item: any) => {
        return (
          <div className="p-1 text-center rounded justify-center text-white bg-badge flex">
            {item.is_available ? "Ada" : "Habis"}
          </div>
        );
      },
      className: "text-center",
    },
    {
      name: "Harga",
      custom: (item: any) => {
        return <span>Rp. {formatRupiah(item.price)}</span>;
      },
    },
  ];

  const handleAdd = () => {
    setDialog({
      ...dialog,
      modal: true,
    });
    navigate("/menu/add");
  };

  const deleteRequest = useFetchData({
    action: deleteProduct,
    onSuccess: async () => {
      await fetch();
      setDialog({
        ...dialog,
        delete: false,
      });
    },
  });

  

  const handleClickDelete = ({ id }: ListData) => {
    deleteId.current = Number(id);
    setDialog({
      ...dialog,
      delete: true,
    });
  };

  const onSubmit = () => {
    void deleteRequest.fetch(Number(deleteId.current));
  };

  const dispatch = useAppDispatch();

  const fetch = useCallback(async () => {
    try {
      const oi: UserParams = params;
      const response = await dispatch(getListProduct(oi));
      return response;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [dispatch, params]);

  useEffect(() => {
    void fetch();
  }, [fetch]);

  return (
    <>
      <PageTitle title="Menu">
        <div className="md:flex hidden md:flex-row gap-2 items-center ">
          <Button
            icon={BsPlusLg}
            text="Tambah Menu"
            variant="primary"
            onClick={handleAdd}
          />
        </div>
      </PageTitle>

      <Card border type="primary" padding>
        <Table<ListData>
          headers={headers}
          data={list}
          loading={loading}
          action={(item) => (
            <ActionButton
              deletedBtn
              item={item}
              onClickDelete={handleClickDelete}
            />
          )}
        />
        <Pagination
          entries={total}
          showing={params.page}
          of={list.length}
          limit={params.per_page}
          onChange={(page) => dispatch(changePage(page))}
        />
      </Card>

      <DeleteModal
        open={dialog.delete}
        onClose={() =>
          setDialog({
            ...dialog,
            delete: false,
          })
        }
        loading={deleteRequest.loading}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Product;
