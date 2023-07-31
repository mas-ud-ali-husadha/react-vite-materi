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
import Dialog from "./Dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import DeleteModal from "@/components/ui/DeleteModal";
import useFetchData from "@/hooks/useFetchData";
import {
  deleteCategory,
  getListCategory,
} from "@/store/setting/category/action";
import { changePage } from "@/store/setting/category/slice";
import { CategoryParams, ListData } from "@/types/CategoryTypes";

const Category = () => {
  const [dialog, setDialog] = useState({
    modal: false,
    delete: false,
  });

  const initialForm = {
    id: null,
    name: "",
  };

  const EditData = useRef<ListData>(initialForm);
  const deleteId = useRef<number | null>(null);
  const { list, params, total, loading } = useAppSelector(
    (state) => state.category
  );

  const headers = [
    {
      name: "Nama",
      key: "name",
    },
  ];

  const handleAdd = () => {
    EditData.current = initialForm;
    setDialog({
      ...dialog,
      modal: true,
    });
  };

  const deleteRequest = useFetchData({
    action: deleteCategory,
    onSuccess: async () => {
      await fetch();
      setDialog({
        ...dialog,
        delete: false,
      });
    },
  });

  const handleClickEdit = ({ id, name }: ListData) => {
    const data = { id, name };
    EditData.current = data;
    setDialog({
      ...dialog,
      modal: true,
    });
  };

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
      const oi: CategoryParams = params;
      const response = await dispatch(getListCategory(oi));
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
      <PageTitle title="Kategori">
        <div className="md:flex hidden md:flex-row gap-2 items-center">
          <Button
            icon={BsPlusLg}
            text="Tambah Kategori"
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
              editBtn
              deletedBtn
              item={item}
              onClickEdit={handleClickEdit}
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

      <Dialog
        open={dialog.modal}
        editData={EditData.current}
        refresh={fetch}
        onClose={() =>
          setDialog({
            ...dialog,
            modal: false,
          })
        }
      />

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

export default Category;
