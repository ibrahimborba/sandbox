import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      <div className="max-x-[600px] mx-auto">
        <h1 className="text-6xl mb-4">A Journal app.</h1>
        <p className="text-2xl text-white/60 mb-4">
          An app for tracking mood through out your life. All you have to do is
          be honest.
        </p>
        <div>
          <Link href="/journal">
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
