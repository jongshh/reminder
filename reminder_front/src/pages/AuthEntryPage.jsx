import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Tag from "../components/ui/Tag";

function AuthEntryPage({ onGuest, onLogin, onSignup }) {
  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <Tag tone="main">Questlog</Tag>
        <h1>오늘의 루틴을 사용자별로 시작하세요</h1>
        <p>
          회원가입 또는 로그인하면 저장된 프로필과 기록을 불러올 수 있고, 게스트 모드로도 바로 시작할 수
          있어요.
        </p>

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
          <Tag tone="success">회원</Tag>
          <h3>계정으로 저장</h3>
          <p>
            클라우드 동기화와 리더보드 같은 연결 기능을 사용할 수 있어요. Supabase에 저장된 프로필과
            기록을 다시 불러옵니다.
          </p>
        </Card>
        <Card>
          <Tag tone="warning">게스트</Tag>
          <h3>로컬로 체험</h3>
          <p>클라우드 동기화 없이 이 브라우저 안에만 데이터를 저장합니다. 가볍게 앱 흐름을 먼저 볼 수 있어요.</p>
        </Card>
      </div>
    </main>
  );
}

export default AuthEntryPage;
