import { Menu } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function MenuAppBar() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Menu className='text-white' />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Laporan</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>TES MENU 1</DropdownMenuItem>
        <DropdownMenuItem>TES MENU 2</DropdownMenuItem>
        <DropdownMenuItem>TES MENU 3</DropdownMenuItem>
        <DropdownMenuItem>TES MENU 4</DropdownMenuItem>
        <DropdownMenuItem>TES MENU 5</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
