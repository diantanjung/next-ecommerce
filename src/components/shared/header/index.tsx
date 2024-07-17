import { ShoppingCart, UserIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Env } from '@/lib/constants'

const Header = async () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Link href="/" className="flex-start">
            <Image
              src="assets/images/logo.svg"
              width={138}
              height={48}
              alt={`${Env.APP_NAME} logo`}
            />
          </Link>
        </div>
        <div className="space-x-2">
          <Button asChild variant="ghost">
            <Link href="/cart">
              <ShoppingCart />
              Cart
            </Link>
          </Button>
          <Button asChild>
            <Link href="/signin">
              <UserIcon />
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
export default Header