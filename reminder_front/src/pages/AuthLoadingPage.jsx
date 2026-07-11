import { useEffect } from "react";
import Tag from "../components/ui/Tag";

function AuthLoadingPage({ onComplete }) {
  useEffect(() => {
    if (!onComplete) {
      return undefined;
    }

    const timerId = window.setTimeout(onComplete, 760);
    return () => window.clearTimeout(timerId);
  }, [onComplete]);

  return (
    <main className="auth-shell auth-shell--loading">
      <section className="auth-loading">
        <div className="auth-spinner" aria-hidden="true" />
        <Tag tone="main">Loading</Tag>
        <h1>프로필 데이터를 준비하는 중</h1>
        <p>곧 Onboarding으로 이동합니다.</p>
      </section>
    </main>
  );
}

export default AuthLoadingPage;
