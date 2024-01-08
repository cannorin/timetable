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
          className="inline-flex items-center justify-center gap-2">
          <CalendarPlus className="h-4 w-4" />
          <span className="leading-[16px]">Create Event</span>
        </Button>
      </DialogTrigger>

      <CreateEventDialogClient />
    </Dialog>
  );
}
