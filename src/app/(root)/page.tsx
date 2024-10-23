// import {
//   CredentialsSignInButton,
//   GithubSignInButton,
//   GoogleSignInButton,
// } from "@/components/authButtons";
// import { getServerSession } from "next-auth";
// import { authConfig } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import { CredentialsForm } from "@/components/credentialsForm";

// export default async function SignInPage() {
//   const session = await getServerSession(authConfig);

//   console.log("Session: ", session);

//   if (session) return redirect("/home");

//   return (
//     <div className="w-full flex flex-col items-center justify-center min-h-screen py-2">
//       <div className="flex flex-col items-center mt-10 p-10 shadow-md">
//         <h1 className="mt-10 mb-4 text-4xl font-bold">Sign In</h1>
//         <GoogleSignInButton />
//         <GithubSignInButton />
//         <span className="text-2xl font-semibold text-white text-center mt-8">
//           Or
//         </span>
//         {/* <CredentialsSignInButton /> */}
//         <CredentialsForm />
//       </div>
//     </div>
//   );
// }

import ProductList from '@/components/shared/product/product-list'
import { getLatestProducts } from '@/lib/actions/product.actions'
import Hero from "@/sections/Hero"

export default async function Home() {
  const latestProducts = await getLatestProducts()

  return (
    <>
      <div className="w-full">
        <Hero />
      </div>
      <div className="space-y-8">
        <ProductList title="Newest Arrivals" data={latestProducts} />
      </div>
    </>
  )
}
