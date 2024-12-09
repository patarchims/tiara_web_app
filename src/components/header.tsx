import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthStore } from '@/store/auth.store'

export default function Header() {
  const user = useAuthStore((state) => state.user)

  return (
    <header className='h-[56px]'>
      <div className='bg-gradient-to-r from-blue-500  to-blue-700 p-2 max-width flex justify-between items-center sticky top-0'>
        <h3 className='font-semibold text-xl text-white'>
          {user?.bagian ?? ''}
        </h3>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.photo} alt='@shadcn' />
              <AvatarFallback>{user?.nama[0]}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.nama}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='hover:cursor-pointer'
              onClick={() => {
                localStorage.clear()
                window.location.replace('/')
              }}
            >
              Keluar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
