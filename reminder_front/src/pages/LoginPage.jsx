import { useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";

function LoginPage({ error, isSubmitting = false, onBack, onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <main className="auth-shell">
      <Card as="form" className="auth-form" onSubmit={handleSubmit} tone="accent">
        <Tag tone="main">Login</Tag>
        <h1>Log in</h1>
        <p>Welcome back. Your synced Questlog data will load after login.</p>

        <label className="form-field">
          <span>Email</span>
          <input
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>

        <label className="form-field">
          <span>Password</span>
          <input
            autoComplete="current-password"
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="auth-form__actions">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Signing in..." : "Log in"}
          </Button>
          <Button disabled={isSubmitting} onClick={onBack} type="button" variant="ghost">
            Back
          </Button>
        </div>
      </Card>
    </main>
  );
}

export default LoginPage;
