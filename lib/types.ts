import { z } from "zod";

export type Branded<K, T> = K & { __brand: T };

export type Minute = Branded<number, "Minute">;

export const RangeSchema = z.object({
  offset: z.number().positive().int(),
  length: z.number().positive().int(),
});

export type Range = z.infer<typeof RangeSchema> & {
  offset: Minute;
  length: Minute;
};

export const SlotSchema = z.intersection(
  RangeSchema,
  z.object({
    name: z.string().nullable(),
    discord_id: z.string().nullable(),
  }),
);

export type Slot = z.infer<typeof SlotSchema> & {
  offset: Minute;
  length: Minute;
};
