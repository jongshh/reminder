import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";

function AuthEntryPage({ onGuest, onLogin, onSignup }) {
  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <Tag tone="main">Questlog</Tag>
        <h1>오늘의 루틴을 사용자별로 시작하세요</h1>
        <p>회원은 저장된 프로필과 기록을 불러오고, 비회원은 이 기기 안에서만 데이터를 유지합니다.</p>

        <div className="auth-actions">
          <Button onClick={onLogin}>로그인</Button>
          <Button onClick={onSignup} variant="secondary">
            회원가입
          </Button>
          <Button onClick={onGuest} variant="ghost">
            비회원으로 접속
          </Button>
        </div>
      </section>

      <div className="auth-card-grid">
        <Card>
          <Tag tone="success">Member</Tag>
          <h3>프로필 기반 데이터</h3>
          <p>목표, 레벨, 퀘스트, 리포트를 사용자별 저장소에서 불러올 수 있도록 준비합니다.</p>
        </Card>
        <Card>
          <Tag tone="warning">Guest</Tag>
          <h3>앱 내부 데이터</h3>
          <p>비회원 데이터는 로컬에만 보관되며 리더보드와 클라우드 동기화는 꺼집니다.</p>
        </Card>
      </div>
    </main>
  );
}

export default AuthEntryPage;
