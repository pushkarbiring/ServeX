import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t py-10 bg-muted/40">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ServeX</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Professional technology services for your business and personal needs
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/services?category=web" className="text-muted-foreground hover:text-foreground">
                Web Development
              </Link>
            </li>
            <li>
              <Link to="/services?category=app" className="text-muted-foreground hover:text-foreground">
                App Development
              </Link>
            </li>
            <li>
              <Link to="/services?category=testing" className="text-muted-foreground hover:text-foreground">
                App Testing
              </Link>
            </li>
            <li>
              <Link to="/services?category=tools" className="text-muted-foreground hover:text-foreground">
                Tools & APIs
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/careers" className="text-muted-foreground hover:text-foreground">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t pt-6">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} ServeX. All rights reserved.
        </p>
      </div>
    </footer>
  );
}