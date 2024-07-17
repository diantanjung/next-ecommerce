"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import PopularProducts from "@/sections/PopularProducts";
import Subscribe from "@/sections/Subscribe";

const Home = () => {
  // const { data: session } = useSession();
  // const router = useRouter();
  // useEffect(() => {
  //   if (!session) {
  //     router.push("/");
  //   }
  // }, []);

  return (
    <main className="relative">
      <Navbar />
      <section className='padding-b'>
        <Hero />
      </section>
      <section className='padding'>
        <PopularProducts />
      </section>
      <section className='padding-x sm:py-32 py-16 w-full'>
        <Subscribe />
      </section>
      <section className=' bg-black padding-x padding-t pb-8'>
        <Footer />
      </section>
      {/* <div>
        <button className="bg-white rounded-full border border-gray-200 text-gray-800 px-4 py-2 flex items-center space-x-2 hover:bg-gray-200">
          <span onClick={() => signOut()}>Logout </span>
        </button>
      </div> */}
    </main>
  );
};

export default Home;
