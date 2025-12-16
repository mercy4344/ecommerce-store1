"use client";

import { PackageCheck, ShoppingCart } from "lucide-react";
import Button from "./ui/button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

const NavbarActions = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);


    const router = useRouter();
    const cart = useCart();

    if (!isMounted) {
        return null;
    }
    
    return ( 
<div className="ml-auto hidden lg:flex items-center gap-x-4">
<Button
onClick={() => router.push("/orders")}
  className="flex items-center rounded-full bg-black px-4 py-2"
  >
<PackageCheck  size={20} color="white"  />
  </Button>
  <Button
    onClick={() => router.push("/cart")}
    className="flex items-center rounded-full bg-black px-4 py-2"
  >
    <ShoppingCart size={20} color="white" />
    <span className="ml-2 text-sm font-medium text-white">
    {cart.getTotalQuantity()}
    </span>
  </Button>
  <UserButton />

</div>

     );
}
 
export default NavbarActions;