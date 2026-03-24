import Image from "next/image";

export function Navbar() {
  return (
    <nav className="w-full h-16 text-gray-700 flex items-center justify-between px-4 ">
      <div className="text-lg font-bold flex space-x-4 items-center">
        <Image src="/images/cinema.jpg" alt="Logo" width={48} height={48} />
        <span>MovieAttitude</span>
      </div>
      <div className="space-x-4">
        {/* <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Movies</a>*/}
            <a href="/movies/add" className="hover:underline bg-green-700 text-gray-50 px-6 py-2 rounded-md uppercase">Ajouter un film</a> 
      </div>
    </nav>
  );
}
