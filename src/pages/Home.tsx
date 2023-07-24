import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "../lib/fetcher";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Loader,
} from "@edge-ui/react";

import { useState } from "react";
import { InputDialog } from "../components/InputDialog";
import { handleCreate, handleDelete, handleUpdate } from "../lib/api";
import { DataTable } from "../components/DataTable";

export type Resp = {
  data: {
    _id: string;
    fullName: string;
    email: string;
    phone_number: number;
    createdDate: string;
    updateDate: string;
    __v: number;
  }[];
};

export default function Home() {
  const { data, error, isLoading } = useSWR<Resp>("/contacts", fetcher);
  const { mutate } = useSWRConfig();
  const [err, setErr] = useState<string | null>(null);

  const createUser = async (info: {
    fullName: string;
    email: string;
    phone_number: string;
  }) => {
    try {
      await handleCreate(info);

      setErr(null);
      mutate("/contacts");
    } catch (e) {
      setErr(String(e));
    }
  };

  const updateUser = async (info: {
    fullName: string;
    email: string;
    phone_number: string;
    id: string;
  }) => {
    try {
      await handleUpdate(info);

      setErr(null);
      mutate("/contacts");
    } catch (e) {
      setErr(String(e));
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await handleDelete(id);

      setErr(null);
      mutate("/contacts");
    } catch (e) {
      setErr(String(e));
    }
  };

  if (isLoading)
    return (
      <div>
        <Loader variant="bars" className="h-8 w-8" />
      </div>
    );

  if (error || err)
    return (
      <div>
        <Alert variant="destructive">
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>
            Failed to load: {String(error || err)}
          </AlertDescription>
        </Alert>
      </div>
    );

  return (
    <div className="p-4 space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Contact List</h1>
        <div className="flex gap-2 items-center">
          <InputDialog onCreate={createUser}>
            <Button variant="default">Create</Button>
          </InputDialog>
          <Button
            variant="outline"
            onClick={() => {
              mutate("/contacts");
            }}
          >
            Refresh
          </Button>
        </div>
      </div>
      <DataTable
        data={data as Resp}
        onDelete={deleteUser}
        onUpdate={updateUser}
      />
    </div>
  );
}
