import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { onboardingSteps } from "../data/mockData";

function OnboardingPage({ onNavigate }) {
  return (
    <div className="page">
      <section className="page-hero">
        <Tag tone="main">AI 온보딩</Tag>
        <h2>큰 목표를 첫 주 퀘스트 세트로 바꿉니다.</h2>
        <p>
          목표, 생활 패턴, 컨디션을 받아 무리한 계획 대신 오늘 실행 가능한 행동과 실패 시 복구 행동을 함께 만듭니다.
        </p>
        <Button onClick={() => onNavigate("home")}>오늘 퀘스트 보기</Button>
      </section>

      <section className="onboarding-flow">
        <SectionTitle
          description="기획의 온보딩 흐름을 화면 단위로 나누면 이후 API 연결 지점도 명확해집니다."
          title="첫 주 생성 흐름"
        />
        <div className="step-grid">
          {onboardingSteps.map((step, index) => (
            <Card className="step-card" key={step.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default OnboardingPage;
