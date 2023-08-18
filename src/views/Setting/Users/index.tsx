import {
  Card,
  ActionButton,
  Table,
  PageTitle,
  Button,
  Pagination,
  Input,
} from "@/components/ui";
import { useState, useEffect, useRef, useCallback } from "react";
import { BsPlusLg } from "react-icons/bs";
import Dialog from "./Dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { deleteUser, getListUsers } from "@/store/setting/users/action";
import { ListData, UserParams } from "@/types/UserTypes";
import DeleteModal from "@/components/ui/DeleteModal";
import useFetchData from "@/hooks/useFetchData";
import { changePage, changeParams } from "@/store/setting/users/slice";
import { defaultValues } from "./variable";
import DateRange from "@/components/ui/DateRange";

const Users = () => {
  const [dialog, setDialog] = useState({
    modal: false,
    delete: false,
  });
  const [date, setDate] = useState({
    firstDate: "",
    endDate: "",
  });

  const EditData = useRef<ListData>(defaultValues);
  const deleteId = useRef<number | null>(null);

  const { list, params, total, loading } = useAppSelector(
    (state) => state.users
  );

  const headers = [
    {
      name: "Nama",
      key: "name",
    },
    {
      name: "Email",
      key: "email",
      className: "text-center",
    },
    {
      name: "Telepon",
      key: "phone_number",
      className: "text-center",
    },
  ];

  const handleAdd = () => {
    EditData.current = defaultValues;
    setDialog({
      ...dialog,
      modal: true,
    });
  };

  const deleteRequest = useFetchData({
    action: deleteUser,
    onSuccess: async () => {
      await fetch();
      setDialog({
        ...dialog,
        delete: false,
      });
    },
  });

  const handleClickEdit = ({
    id,
    name,
    email,
    phone_number,
    user_roles_id,
  }: ListData) => {
    const data = { id, name, email, phone_number, user_roles_id };
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
      const oi: UserParams = params;
      const response = await dispatch(getListUsers(oi));
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
      <DateRange
        startDate={date.firstDate}
        endDate={date.endDate}
        onChange={(value) =>
          setDate({
            firstDate: value[0],
            endDate: value[1],
          })
        }
      />
      <PageTitle title="User">
        <div className="md:flex hidden md:flex-row gap-2 items-center">
          <span>Nama</span>
          <Input
            onChange={(e) => {
              dispatch(changeParams({ key: "name", value: e.target.value }));
            }}
          />
          <Button
            icon={BsPlusLg}
            text="Tambah User"
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

export default Users;
