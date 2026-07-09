import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import SectionTitle from "../components/ui/SectionTitle";
import Tag from "../components/ui/Tag";
import { onboardingSteps } from "../data/mockData";

function OnboardingPage({ onNavigate }) {
  return (
    <div className="page">
      <section className="page-hero">
        <Tag tone="main">Start</Tag>
        <h2>목표를 퀘스트로</h2>
        <p>큰 계획은 작게, 실패는 복구로.</p>
        <Button onClick={() => onNavigate("home")}>오늘 보기</Button>
      </section>

      <section className="onboarding-flow">
        <SectionTitle
          description="4단계"
          title="시작 흐름"
        />
        <div className="step-grid">
          {onboardingSteps.map((step, index) => (
            <Card className="step-card" key={step.id}>
              <span>{step.icon ?? String(index + 1).padStart(2, "0")}</span>
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
