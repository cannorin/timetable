"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import redirect from "./redirect";

const schema = TimetableOptionalDefaultsSchema.merge(
  z.object({
    userId: z.string().optional(),
  }),
);

type Model = z.infer<typeof schema>;

export default function Page() {
  const form = useForm<Model>({
    resolver: zodResolver(schema),
    defaultValues: {
      state: "DRAFT",
      applyLimit: null,
    },
  });

  function onSubmit(value: Model) {
    void createTable(value).then(
      (resp) => resp && redirect(`/table/${resp.id}`),
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="New Event" {...field} />
              </FormControl>
              <FormDescription>Name of the event</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="It is an awesome event." {...field} />
              </FormControl>
              <FormDescription>Description of the event</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
