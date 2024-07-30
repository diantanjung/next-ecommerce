import Image from 'next/image'
import Link from 'next/link'

import { Env } from '@/lib/constants'
import Menu from "./menu"

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
        <Menu />
      </div>
    </header>
  )
}
export default Header