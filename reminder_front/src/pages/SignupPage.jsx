import { useState } from "react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";

function SignupPage({ error, isSubmitting = false, message = "", onBack, onSubmit }) {
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
        <Tag tone="success">회원가입</Tag>
        <h1>계정 만들기</h1>
        <p>이메일 인증을 마치면 자동으로 앱에 로그인되고, 첫 루틴 데이터가 생성됩니다.</p>

        <label className="form-field">
          <span>이름</span>
          <input autoComplete="name" onChange={(event) => setName(event.target.value)} required type="text" value={name} />
        </label>

        <label className="form-field">
          <span>이메일</span>
          <input autoComplete="email" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
        </label>

        <label className="form-field">
          <span>비밀번호</span>
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
          <span>기본 목표</span>
          <input
            onChange={(event) => setTargetGoal(event.target.value)}
            placeholder="매일 이어가는 작은 루틴 만들기"
            required
            type="text"
            value={targetGoal}
          />
        </label>

        {message ? <p className="form-feedback">{message}</p> : null}
        {error ? <p className="form-error">{error}</p> : null}

        <div className="auth-form__actions">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "계정 만드는 중..." : "회원가입"}
          </Button>
          <Button disabled={isSubmitting} onClick={onBack} type="button" variant="ghost">
            뒤로
          </Button>
        </div>
      </Card>
    </main>
  );
}

export default SignupPage;
