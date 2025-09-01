import { Link } from "react-router";

export default function Navigation() {
  return (
    <header className="bg-muted border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              to="/learning"
              className="text-foreground hover:text-primary font-medium transition-colors"
            >
              Learning
            </Link>
          </nav>
          <div className="text-muted-foreground font-medium">
            This is example project
          </div>
        </div>
      </div>
    </header>
  );
}
