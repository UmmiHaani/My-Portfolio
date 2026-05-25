export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-800 bg-gray-900">
      <div className="max-w-6xl mx-auto text-center text-gray-400">
        <p>© {new Date().getFullYear()} Haani Shahrul. Built with React & Tailwind CSS.</p>
      </div>
    </footer>
  );
}
