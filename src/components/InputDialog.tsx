import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Button,
  Label,
  Input,
} from "@edge-ui/react";
import { useState } from "react";
import { Resp } from "../pages/Home";

export function InputDialog({
  children,
  onCreate,
  update = false,
  data,
}: React.PropsWithChildren<{
  data?: Resp["data"][number];
  onCreate: (info: {
    fullName: string;
    email: string;
    phone_number: string;
  }) => void;
  update?: boolean;
}>) {
  const [info, setInfo] = useState({
    fullName: data?.fullName || "",
    email: data?.email || "",
    phone_number: String(data?.phone_number || ""),
  });
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{update ? "Update" : "Create"} contact</DialogTitle>
          <DialogDescription>
            {update ? "Update" : "Create"} a new user profile.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              className="col-span-3"
              onChange={(e) => {
                setInfo((p) => ({ ...p, fullName: e.target.value }));
              }}
              defaultValue={data?.fullName}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="hello@johndoe.com"
              className="col-span-3"
              onChange={(e) => {
                setInfo((p) => ({ ...p, email: e.target.value }));
              }}
              defaultValue={data?.email}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone no.
            </Label>
            <Input
              id="phone"
              placeholder="9800000000"
              type="tel"
              className="col-span-3"
              onChange={(e) => {
                setInfo((p) => ({ ...p, phone_number: e.target.value }));
              }}
              defaultValue={data?.phone_number}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={() => {
              setOpen(false);
              onCreate(info);
            }}
          >
            {update ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
