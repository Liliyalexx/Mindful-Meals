import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input className="border p-3 w-full mb-4 rounded" type="text" placeholder="Full Name" />
        <input className="border p-3 w-full mb-4 rounded" type="email" placeholder="Email" />
        <input className="border p-3 w-full mb-4 rounded" type="password" placeholder="Password" />
        <button className="bg-green-500 text-white px-4 py-3 rounded-lg w-full">Create Account</button>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/signin" className="text-blue-500">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;