"use server";

import type { Route } from "next";
import { redirect as nextRedirect } from "next/navigation";

export default async function redirect<T extends string = string>(
  href: Route<T>,
) {
  nextRedirect(href);
}
