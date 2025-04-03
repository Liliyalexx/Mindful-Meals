import { Link } from "react-router-dom";

function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign In</h2>
        <input className="border border-gray-300 p-3 w-full mb-4 rounded" type="email" placeholder="Email" />
        <input className="border border-gray-300 p-3 w-full mb-4 rounded" type="password" placeholder="Password" />
        <button className="bg-golden text-black font-semibold px-4 py-3 rounded-lg w-full transition hover:bg-opacity-80">
          Sign In
        </button>
        <p className="mt-4 text-sm text-center text-black">
          Don't have an account? <Link to="/signup" className="text-golden font-semibold">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
