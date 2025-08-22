import axios from "axios";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

export default function RecipeTable() {
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // New states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: "success" | "error"

// generate new recipe
const handleGenerate = async () => {
  try {
    await axios.post(
      "/api/Aireciepe",
      { name: recipeName },
      { withCredentials: true }
    );
    setRecipeName("");
    setMessage({ text: "Recipe generated successfully!", type: "success" });
    fetchRecipes(); // refresh table
  } catch (error) {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    } else {
      console.error("Error generating recipe:", error);
      setMessage({ text: "Failed to generate recipe. Try again.", type: "error" });
    }
  } finally {
    setLoading(false);
  }
};

 // fetch all recipes
const fetchRecipes = async () => {
  try {
    const res = await axios.get("/api/getAllRecipes", { withCredentials: true });
    setRecipes(res.data);
  } catch (err) {
    if (err.response && err.response.status === 401) {
      // token invalid or expired → redirect to login
      window.location.href = "/login";
    } else {
      console.error("Error fetching recipes:", err);
    }
  }
};

  useEffect(() => {
    fetchRecipes();
  }, []);

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setShowModal(false);
  };

  return (
    <div className="container my-5">
      {/* Input and Button */}
      <div className="d-flex mb-2 gap-2 justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter recipe name"
        />
        <button
          className="btn btn-primary"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            "Generate Recipe"
          )}
        </button>
      </div>

      {/* Message below input */}
      {message.text && (
        <div
          className={`text-center mb-3 ${
            message.type === "success" ? "text-success" : "text-danger"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Recipes Table */}
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Ingredients</th>
              <th>Recipe</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {recipes.map((r) => (
              <tr key={r._id}>
                <td>
                  {r.imageUrl ? (
                    <img
                      src={r.imageUrl}
                      alt="Recipe"
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{r.ingredients}</td>
                <td
                  style={{ maxWidth: "400px", cursor: "pointer" }}
                  onClick={() => openModal(r)}
                  className="text-truncate"
                  title="Click to view full recipe"
                >
                  {r.recipeText.length > 50
                    ? r.recipeText.slice(0, 50) + "..."
                    : r.recipeText}
                </td>
                <td>{new Date(r.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Recipe Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRecipe?.imageUrl && (
            <img
              src={selectedRecipe.imageUrl}
              alt="Recipe"
              className="img-fluid mb-3 rounded"
            />
          )}
          <h6>
            <strong>Ingredients:</strong>
          </h6>
          <p>{selectedRecipe?.ingredients}</p>
          <h6>
            <strong>Recipe:</strong>
          </h6>
          <p style={{ whiteSpace: "pre-wrap" }}>{selectedRecipe?.recipeText}</p>
          <h6>
            <strong>Created At:</strong>
          </h6>
          <p>
            {selectedRecipe
              ? new Date(selectedRecipe.createdAt).toLocaleString()
              : ""}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
