import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="welcome-section bg-white shadow-lg rounded-lg p-8 text-center max-w-lg w-full mx-4">
      <h1 className="text-3xl font-bold mb-4 text-black">Welcome to Mindful Meals</h1>
      <p className="mb-6 text-black">Find the best gluten-free restaurants near you!</p>
    </div>
  );
}

export default Welcome;
