import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";

function AuthEntryPage({ onGuest, onLogin, onSignup }) {
  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <Tag tone="main">Questlog</Tag>
        <h1>오늘의 루틴을 사용자별로 시작하세요</h1>
        <p>회원가입/로그인해서 저장된 프로필과 기록을 불러오거나, 게스트 모드로 시작할 수 있어요.</p>

        <div className="auth-actions">
          <Button onClick={onLogin}>로그인</Button>
          <Button onClick={onSignup} variant="secondary">
            회원가입
          </Button>
          <Button onClick={onGuest} variant="ghost">
            게스트 모드
          </Button>
        </div>
      </section>

      <div className="auth-card-grid">
        <Card>
          <Tag tone="success">Member</Tag>
          <h3>회원가입 시</h3>
          <p>리더보드를 포함한 모든 기능을 이용할 수 있어요. 클라우드에서 저장된 프로필과 기록을 불러올 수 있어요.</p>
        </Card>
        <Card>
          <Tag tone="warning">Guest</Tag>
          <h3>게스트 모드</h3>
          <p>제한적인 기능만 사용할 수 있어요. 클라우드 동기화 없이, 이 기기 안에서만 데이터를 유지해요.</p>
        </Card>
      </div>
    </main>
  );
}

export default AuthEntryPage;
