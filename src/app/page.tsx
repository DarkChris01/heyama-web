import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-6xl font-bold text-center sm:text-left">
          Welcome to{" "}
          <a
            href="https://nextjs.org"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Next.js!
          </a>
        </h1>
        <p className="mt-4 text-2xl text-center sm:text-left">
          Get started by editing{" "}
          <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5">
            src/app/page.tsx
          </code>
        </p>
      </main>
    </div>
  );
}
