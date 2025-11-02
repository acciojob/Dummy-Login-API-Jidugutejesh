import React, { useState } from 'react';

function App() {

  return (
   <div>
    <DummyLoginAPI />

   </div>
  );
}

export default App;



function DummyLoginAPI() {
  const userdata = [
    { id: 1, name: "ABC", email: "abc@gmail.com", password: "12" },
    { id: 2, name: "DEF", email: "def@gmail.com", password: "1234" },
    { id: 3, name: "GHI", email: "ghi@gmail.com", password: "123456" },
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserError("");
    setPasswordError("");

    const trimmedEmail = email.trim();

    const foundUser = userdata.find(u => u.email === trimmedEmail);

    setIsSubmitting(true);

    setTimeout(() => {
      if (!foundUser) {
        setUserError("User not found");
        console.log({ error: "User not found", email: trimmedEmail });
      } else if (foundUser.password !== password) {
        setPasswordError("Password Incorrect");
        console.log({ error: "Password Incorrect", email: trimmedEmail });
      } else {
        console.log(foundUser);
      }

      setIsSubmitting(false);
    }, 3000);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            id="input-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <div id="user-error" aria-live="assertive" style={{ minHeight: 18 }}>
          {userError && <span style={{ color: 'red' }}>{userError}</span>}
        </div>

        <label>
          Password
          <input
            id="input-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <div id="password-error" aria-live="assertive" style={{ minHeight: 18 }}>
          {passwordError && <span style={{ color: 'red' }}>{passwordError}</span>}
        </div>

        <button id="submit-form-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Submit"}
        </button>
      </form>
    </div>
  );
}


