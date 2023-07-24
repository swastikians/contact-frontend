import {
  Button,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@edge-ui/react";
import Confirmation from "./Confirmation";
import { InputDialog } from "./InputDialog";
import type { Resp } from "../pages/Home";
import { IUser } from "../lib/api";

export function DataTable({
  data,
  onDelete,
  onUpdate,
}: {
  onUpdate: (user: IUser) => void;
  data: Resp;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <Table className="border rounded-md">
        <TableCaption>Contact List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((item, idx) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">{++idx}</TableCell>
              <TableCell>{item.fullName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone_number}</TableCell>
              <TableCell className="flex flex-col md:flex-row gap-2 items-center">
                <InputDialog
                  data={item}
                  update
                  onCreate={(e) => {
                    onUpdate({
                      ...e,
                      id: item._id,
                    });
                  }}
                >
                  <Button variant="outline" className="w-full md:w-auto">
                    Edit
                  </Button>
                </InputDialog>
                <Confirmation
                  onConfirmation={(x) => {
                    if (x) onDelete(item._id);
                  }}
                >
                  <Button variant="destructive" className="w-full md:w-auto">
                    Delete
                  </Button>
                </Confirmation>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
