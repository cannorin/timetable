import Link from "next/link";
import { Calendar, MessageCircleMore, LogOut } from "lucide-react";

import { getUser } from "@/lib/user";

import LogInOutButton from "../LogInOutButton";
import CreateEventDialog from "../CreateEventDialog";
import ThemeSwitcher from "../ThemeSwitcher";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default async function Topbar() {
  const { id, name, image } = await getUser();

  return (
    <header className="sticky top-0 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex flex-row items-center gap-4 py-2">
        <Link href="/" className="mr-auto bg-background">
          Logo
        </Link>

        {id ? <CreateEventDialog /> : <LogInOutButton />}

        {id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="transition-opacity hover:cursor-pointer hover:opacity-80 motion-reduce:transition-none">
                <AvatarImage src={image} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-1 w-60 max-w-full">
              <DropdownMenuLabel>{name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ThemeSwitcher />
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Calendar className="mr-2 h-4 w-4" />
                My Events
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircleMore className="mr-2 h-4 w-4" />
                My Entries
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <LogInOutButton className="w-full justify-start px-2">
                <LogOut className=" h-4 w-4" />
                Sign Out
              </LogInOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </nav>
    </header>
  );
}
