import Link from "next/link";
import Container from "./ui/container";
import MainNav from "@/components/main-nav";
import getCategories from "@/actions/get-categories";
import NavbarActions from "./navbar-actions";
import MobileNav from "./ui/mobilenav";

const Navbar = async () => {
    const categories = await getCategories();

    return ( 
        <div className="border-b">
            <Container>
                <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
                    <MobileNav categories={categories} />
                    <Link href="/" className="ml-4 lg:ml-0 gap-x-2">
                        <p className="font-bold text-xl">TENACIOUS</p>
                    </Link>
                    <div className="hidden lg:block">
                        <MainNav data={categories} />
                    </div>
                    <NavbarActions />
                </div>
            </Container>
        </div>
    );
}
 
export default Navbar;


// import Link from "next/link";
// import Container from "./ui/container";
// import MainNav from "@/components/main-nav";
// import getCategories from "@/actions/get-categories";
// import NavbarActions from "./navbar-actions";
// import MobileNav from "./ui/mobilenav";

// const revalidate = 0;

// const Navbar = async () => {
//     const categories = await getCategories();

//     return ( 
//         <div className="border-b">
//             <Container>
//                 <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
//                 <MobileNav categories={categories} />
//                 <Link href="/" className="ml-4 lg:ml-0 gap-x-2">
//                 <p className="font-bold text-xl">STORE</p>
//                 </Link>
//                 <div className="hidden lg:block">
//                         <MainNav data={categories} />
//                     </div>
//                 <NavbarActions />
//                 </div>
//             </Container>
//         </div>
//      );
// }
 
// export default Navbar;