
    import React from 'react';
    import { Link } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { LogOut, User, Settings } from 'lucide-react';
    import {
      DropdownMenu, DropdownMenuContent, DropdownMenuItem,
      DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

    const UserMenu = ({ user, userName, handleLogout, getAvatarFallback }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-brand-byzantineBlue/80 focus-visible:ring-2 focus-visible:ring-brand-goldOchre focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deepPurple dark:focus-visible:ring-offset-brand-parchmentWhite">
            <Avatar className="h-9 w-9 border-2 border-brand-goldOchre">
              <AvatarImage src={user?.user_metadata?.avatar_url} alt={userName} />
              <AvatarFallback className="bg-brand-byzantineBlue text-brand-parchmentWhite font-semibold">
                {getAvatarFallback(userName)}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-[200px] bg-brand-parchmentWhite dark:bg-brand-deepPurple rounded-lg shadow-xl p-1 z-[100] border border-gray-200 dark:border-brand-byzantineBlue/70"
          sideOffset={8}
          align="end"
        >
          <DropdownMenuLabel className="font-normal px-3 py-2.5 text-gray-800 dark:text-brand-parchmentWhite/90">
            <div className="text-sm font-semibold">{userName}</div>
            <div className="text-xs text-gray-600 dark:text-brand-parchmentWhite/70 truncate">{user?.email}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-200 dark:bg-brand-byzantineBlue/50" />
          <DropdownMenuItem asChild className="relative flex cursor-pointer select-none items-center rounded-md px-2.5 py-2 text-sm outline-none transition-colors text-gray-700 dark:text-brand-parchmentWhite/80 data-[highlighted]:bg-brand-byzantineBlue data-[highlighted]:text-brand-parchmentWhite focus:bg-brand-byzantineBlue focus:text-brand-parchmentWhite">
            <Link to="/profile" className="flex items-center w-full">
              <User className="mr-2.5 h-4 w-4" /> Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="relative flex cursor-pointer select-none items-center rounded-md px-2.5 py-2 text-sm outline-none transition-colors text-gray-700 dark:text-brand-parchmentWhite/80 data-[highlighted]:bg-brand-byzantineBlue data-[highlighted]:text-brand-parchmentWhite focus:bg-brand-byzantineBlue focus:text-brand-parchmentWhite">
            <Link to="/settings" className="flex items-center w-full">
              <Settings className="mr-2.5 h-4 w-4" /> Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-gray-200 dark:bg-brand-byzantineBlue/50" />
          <DropdownMenuItem
            onClick={handleLogout}
            className="relative flex cursor-pointer select-none items-center rounded-md px-2.5 py-2 text-sm outline-none transition-colors text-brand-vermilionRed data-[highlighted]:bg-brand-vermilionRed data-[highlighted]:text-brand-parchmentWhite focus:bg-brand-vermilionRed focus:text-brand-parchmentWhite"
          >
            <LogOut className="mr-2.5 h-4 w-4" /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    export default UserMenu;
  