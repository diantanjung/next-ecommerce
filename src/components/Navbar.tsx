import logo from "@/public/assets/images/logo.svg";
import iconCart from "@/public/assets/images/icon-cart.svg";
import imageAvatar from "@/public/assets/images/image-avatar.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="flex justify-between py-7 px-6">
      <div className="flex">
        <div className="relative w-6 h-6 flex flex-col justify-around md:invisible">
          <div className="p-[1px] bg-black"></div>
          <div className="p-[1px] bg-black"></div>
          <div className="p-[1px] bg-black"></div>
        </div>

        <Image src={logo.src} alt="Logo" width={138} height={20} className="ml-5" />
      </div>

      <div className="flex">
        <Image src={iconCart.src} alt="Cart" width={22} height={20} className="mr-7" />
        <Image src={imageAvatar.src} alt="User" width={20} height={20} />
      </div>
    </nav>
  );
};

export default Navbar;
