"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarPlus, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TimetableOptionalDefaultsSchema } from "@/prisma/generated/zod";
import { createTable } from "@/lib/table";
import { Textarea } from "@/components/ui/textarea";
import redirect from "@/lib/redirect";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const schema = TimetableOptionalDefaultsSchema.merge(
  z.object({
    userId: z.string().optional(),
  }),
);

type Model = z.infer<typeof schema>;

export default function CreateEventDialogClient() {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<Model>({
    resolver: zodResolver(schema),
    defaultValues: {
      state: "DRAFT",
      applyLimit: null,
    },
  });

  function onSubmit(value: Model) {
    setSubmitting(true);
    void createTable(value)
      .then((resp) => resp && redirect(`/table/${resp.id}/edit`))
      .catch(() => setSubmitting(false));
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8">
          <DialogHeader>
            <DialogTitle>Create new event</DialogTitle>
            <DialogDescription>
              Start organizing your event in a minute!
            </DialogDescription>
          </DialogHeader>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="New Event" {...field} />
                </FormControl>
                <div className="flex flex-row gap-1">
                  <FormDescription>Name of the event.</FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            defaultValue={null}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="It is an awesome event."
                    {...field}
                    value={field.value ?? undefined}
                  />
                </FormControl>
                <FormDescription>
                  Description of the event. Optional.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button
              type="submit"
              variant="default"
              disabled={!!submitting}
              className="flex flex-row items-center justify-center gap-2">
              {submitting ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <CalendarPlus className="h-4 w-4" />
              )}
              Create
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
