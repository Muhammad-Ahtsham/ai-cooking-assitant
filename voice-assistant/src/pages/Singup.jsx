import { useState } from "react";
import { useSingupMutation } from "../../reduxApi/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [Singup, { data, error }] = useSingupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await Singup({ name, email, password }).unwrap();
      if (result.user) {
        toast.success("Signup successful");
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err.message || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      {error && (
        <p className="text-red-600 mb-2">
          {error.data?.message || error.error || "Login failed"}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="signup-name"
          >
            Name
          </label>
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="signup-email"
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="signup-password"
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-red-500 cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
