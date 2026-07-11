import { useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";

function SignupPage({ onBack, onSubmit }) {
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
        <h1>새 계정 만들기</h1>
        <p>나의 목표를 적어보아요!</p>

        <label className="form-field">
          <span>이름</span>
          <input
            autoComplete="name"
            onChange={(event) => setName(event.target.value)}
            required
            type="text"
            value={name}
          />
        </label>

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
            autoComplete="new-password"
            minLength={4}
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
            value={password}
          />
        </label>

        <label className="form-field">
          <span>기본 목표</span>
          <input
            onChange={(event) => setTargetGoal(event.target.value)}
            placeholder="예: 토익 루틴 회복"
            required
            type="text"
            value={targetGoal}
          />
        </label>

        <div className="auth-form__actions">
          <Button type="submit">회원가입</Button>
          <Button onClick={onBack} type="button" variant="ghost">
            뒤로
          </Button>
        </div>
      </Card>
    </main>
  );
}

export default SignupPage;
