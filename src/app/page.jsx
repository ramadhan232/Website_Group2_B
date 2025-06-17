'use client';

export default function HomePage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-white px-4 sm:px-8">
      <div className="bg-white rounded-2xl shadow-2xl p-10 sm:p-10 md:p-14 lg:p-20 max-w-4xl w-full h-[60vh] flex flex-col justify-evenly text-center items-center">

        <h1 className="text-4xl md:text-5xl font-bold text-blue-800">
          Welcome to <span className="text-green-600">English Learning</span>
        </h1>


        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Explore <strong>HOTS-based</strong> reading and writing modules designed for high school English learners.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md mx-auto">
          <a
            href="/chapters"
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 m-10 rounded-xl shadow-lg transition-all font-semibold text-lg"
          >
            📘 Start Learning
          </a>
          <a
            href="/dashboard"
            className="bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl shadow-lg transition-all font-semibold text-lg"
          >
            🎓 Teacher Dashboard
          </a>
        </div>

        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} English Lens • Empowering learners through critical thinking
        </p>
      </div>
    </section>
  );
}
