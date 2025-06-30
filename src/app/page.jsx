'use client';

export default function HomePage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-white px-4 sm:px-8">
      <div className="bg-white rounded-4xl shadow-2xl lg:p-100 max-w-4xl w-full h-full flex flex-col justify-between text-center items-center p-4 sm:p-8">
      <div >
      <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 text-blue-600"
        >
          <rect width="24" height="24" fill="white" />
          <path
            d="M12 6.90909C10.8999 5.50893 9.20406 4.10877 5.00119 4.00602C4.72513 3.99928 4.5 4.22351 4.5 4.49965C4.5 6.54813 4.5 14.3034 4.5 16.597C4.5 16.8731 4.72515 17.09 5.00114 17.099C9.20405 17.2364 10.8999 19.0998 12 20.5M12 6.90909C13.1001 5.50893 14.7959 4.10877 18.9988 4.00602C19.2749 3.99928 19.5 4.21847 19.5 4.49461C19.5 6.78447 19.5 14.3064 19.5 16.5963C19.5 16.8724 19.2749 17.09 18.9989 17.099C14.796 17.2364 13.1001 19.0998 12 20.5M12 6.90909L12 20.5"
            stroke="currentColor"
            strokeLinejoin="round"
          />
          <path
            d="M19.2353 6H21.5C21.7761 6 22 6.22386 22 6.5V19.539C22 19.9436 21.5233 20.2124 21.1535 20.0481C20.3584 19.6948 19.0315 19.2632 17.2941 19.2632C14.3529 19.2632 12 21 12 21C12 21 9.64706 19.2632 6.70588 19.2632C4.96845 19.2632 3.64156 19.6948 2.84647 20.0481C2.47668 20.2124 2 19.9436 2 19.539V6.5C2 6.22386 2.22386 6 2.5 6H4.76471"
            stroke="currentColor"
            strokeLinejoin="round"
          />
        </svg>
      </div>
        <h1 className="text-4xl md:text-5xl font-bold text-blue-800">
          Welcome to <span className="text-green-600">English Learning</span>
        </h1>


        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
          Explore <strong>HOTS-based</strong> reading and writing modules designed for high school English learners.
        </p>

        <div className="flex flex-cols-1 sm:flex-cols-2 gap-5 mx-10">
          <a
            href="/student/dashboard/home"
            className="w-100 h-10 content-center-safe bg-linear-to-t from-blue-800 to-blue-500 hover:bg-blue-950 text-white py-4 m-10 rounded-xl shadow-lg transition-all font-semibold text-lg"
          >
            📘 Start Learnings
          </a>
          <a
            href="/dashboard"
            className="w-100 h-10 content-center-safe bg-linear-to-t from-teal-800 to-teal-600 hover:bg-green-700 text-white py-4 rounded-xl shadow-lg transition-all font-semibold text-lg"
          >
            🎓 Teacher Dashboard
          </a>
        </div>

        <p className="block text-sm text-gray-400 sm:mb-4">
          &copy; {new Date().getFullYear()} English For Engineering • Empowering learners through critical thinking
        </p>
      </div>
    </section>
  );
}
