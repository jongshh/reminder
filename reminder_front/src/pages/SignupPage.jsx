import { useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";

function SignupPage({ error, isSubmitting = false, onBack, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [targetGoal, setTargetGoal] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ email, name, password, targetGoal });
  };

  return (
    <main className="auth-shell">
      <Card as="form" className="auth-form" onSubmit={handleSubmit} tone="accent">
        <Tag tone="success">Signup</Tag>
        <h1>Create account</h1>
        <p>Your profile will be saved in Supabase and used to seed your app data.</p>

        <label className="form-field">
          <span>Name</span>
          <input
            autoComplete="name"
            onChange={(event) => setName(event.target.value)}
            required
            type="text"
            value={name}
          />
        </label>

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
            autoComplete="new-password"
            minLength={6}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        <label className="form-field">
          <span>Main goal</span>
          <input
            onChange={(event) => setTargetGoal(event.target.value)}
            placeholder="Build a steady daily routine"
            required
            type="text"
            value={targetGoal}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <div className="auth-form__actions">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "Creating..." : "Create account"}
          </Button>
          <Button disabled={isSubmitting} onClick={onBack} type="button" variant="ghost">
            Back
          </Button>
        </div>
      </Card>
    </main>
  );
}

export default SignupPage;
