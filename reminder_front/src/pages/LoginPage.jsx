import { useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";

function LoginPage({ onBack, onSubmit }) {
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
        <h1>로그인</h1>
        <p>돌아오신 것을 환영해요</p>

        <label className="form-field">
          <span>이메일</span>
          <input
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            value={email}
          />
        </label>

        <label className="form-field">
          <span>비밀번호</span>
          <input
            autoComplete="current-password"
            minLength={4}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        <div className="auth-form__actions">
          <Button type="submit">로그인</Button>
          <Button onClick={onBack} type="button" variant="ghost">
            뒤로
          </Button>
        </div>
      </Card>
    </main>
  );
}

export default LoginPage;
