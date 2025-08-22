import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-white mt-5" style={{ background: "linear-gradient(to right, #facc15, #f97316, #ef4444)" }}>
      <div className="container py-5">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">About Recipe Master</h5>
            <p className="small">
              Recipe Master uses AI to generate delicious and personalized recipes for you. 
              Explore new dishes, ingredients, and cooking techniques every day!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Generate Recipe</Link></li>
              <li><Link to="/recipes" className="text-white text-decoration-none">All Recipes</Link></li>
              <li><Link to="/about" className="text-white text-decoration-none">About AI</Link></li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Connect with Us</h5>
            <p className="small">Have questions or suggestions? Reach out!</p>
            <div className="d-flex gap-3">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">Twitter</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-3" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
        &copy; {new Date().getFullYear()} Recipe Master. All rights reserved.
      </div>
    </footer>
  );
}
