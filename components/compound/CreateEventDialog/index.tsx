import { CalendarPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import CreateEventDialogClient from "./client";

export default async function CreateEventDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex max-w-48 flex-row items-center justify-center gap-2">
          <CalendarPlus className="h-4 w-4" />
          Create new event
        </Button>
      </DialogTrigger>

      <CreateEventDialogClient />
    </Dialog>
  );
}
