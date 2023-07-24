import { fetcher } from "./fetcher";

export type IUser = {
  fullName: string;
  email: string;
  phone_number: string;
  id: string;
};

export async function handleCreate(info: Omit<IUser, "id">) {
  return await fetcher("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
}

export async function handleUpdate(info: IUser) {
  return await fetcher("/contact", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
}

export async function handleDelete(id: string) {
  return await fetcher(`/contact/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
