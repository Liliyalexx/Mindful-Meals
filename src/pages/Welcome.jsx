import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-lg">
        <h1 className="text-3xl font-bold mb-4">Welcome to Mindful Meals</h1>
        <p className="mb-6">Find the best gluten-free restaurants near you!</p>
        <Link to="/signin" className="bg-blue-500 text-white px-6 py-3 rounded-lg block mb-3">Sign In</Link>
        <Link to="/signup" className="bg-green-500 text-white px-6 py-3 rounded-lg block ">Sign Up</Link>
      </div>
    </div>
  );
}

export default Welcome;
