import { useState, useCallback, useMemo } from 'react';
import { questions } from './questions';
import { QuestionCard } from './components/QuestionCard';
import { MaterialIcon } from './components/MaterialIcon';
import { getRecommendation, getRiskLevel } from './utils/recommendations';
import type { UserData, Answers } from './types';

type Page = 'registration' | 'survey' | 'results';

export function App() {
  const [page, setPage] = useState<Page>('registration');
  const [userData, setUserData] = useState<UserData>({ firstName: '', lastName: '', age: '' });
  const [answers, setAnswers] = useState<Answers>({});

  const isRegValid = useMemo(
    () =>
      userData.firstName.trim() !== '' &&
      userData.lastName.trim() !== '' &&
      parseInt(userData.age) >= 14,
    [userData]
  );

  const isSurveyComplete = useMemo(
    () =>
      questions.every((q) => {
        if (!q.required) return true;
        const answer = answers[q.id];
        if (q.type === 'checkbox') return Array.isArray(answer) && answer.length > 0;
        return typeof answer === 'string' && answer.trim() !== '';
      }),
    [answers]
  );

  const handleAnswer = useCallback((questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }, []);

  const handleStartSurvey = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isRegValid) {
        setPage('survey');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [isRegValid]
  );

  const handleSubmitSurvey = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isSurveyComplete) {
        setPage('results');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [isSurveyComplete]
  );

  const answeredCount = useMemo(
    () =>
      questions.filter((q) => {
        const answer = answers[q.id];
        if (q.type === 'checkbox') return Array.isArray(answer) && answer.length > 0;
        if (q.type === 'textarea') return false;
        return typeof answer === 'string' && answer.trim() !== '';
      }).length,
    [answers]
  );

  const requiredCount = questions.filter((q) => q.required).length;
  const progressPercent = (answeredCount / requiredCount) * 100;

  return (
    <div className="m-bg-gradient min-h-screen flex items-start justify-center">
      <div className="w-full max-w-[540px] mx-auto px-5 py-10 sm:px-8 sm:py-14">

        {/* ── Header ── */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-[20px] bg-m-primary-container m-elevation-2 mb-5">
            <MaterialIcon icon="health_and_safety" size={32} filled className="text-m-primary" />
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-bold text-m-on-surface leading-tight tracking-tight">
            Влияние вредных привычек
          </h1>
          <p className="text-[16px] sm:text-[18px] text-m-on-surface-variant mt-3 font-medium">
            на здоровье подростков
          </p>
        </div>

        {/* ── Registration ── */}
        {page === 'registration' && (
          <form onSubmit={handleStartSurvey} className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="bg-m-surface-container-lowest rounded-[32px] m-elevation-2 overflow-hidden">
              {/* Card header */}
              <div className="px-10 pt-12 pb-8 sm:px-14 sm:pt-14 sm:pb-10 text-center">
                <div className="w-12 h-12 rounded-full bg-m-secondary-container flex items-center justify-center mx-auto mb-5">
                  <MaterialIcon icon="person" size={24} className="text-m-secondary" />
                </div>
                <h2 className="text-[24px] font-bold text-m-on-surface">Данные участника</h2>
                <p className="text-[16px] text-m-on-surface-variant mt-4">Заполните информацию для начала</p>
              </div>

              <div className="mx-10 sm:mx-14 h-px bg-m-outline-variant/30" />

              {/* Input fields */}
              <div className="px-10 sm:px-14 pt-12 pb-14 sm:pt-14 sm:pb-16 flex flex-col gap-10">
                <InputField
                  icon="badge"
                  placeholder="Введите имя"
                  value={userData.firstName}
                  onChange={(v) => setUserData((p) => ({ ...p, firstName: v }))}
                />
                <InputField
                  icon="person"
                  placeholder="Введите фамилию"
                  value={userData.lastName}
                  onChange={(v) => setUserData((p) => ({ ...p, lastName: v }))}
                />
                <InputField
                  icon="cake"
                  placeholder="Возраст (от 14 лет)"
                  type="number"
                  min={14}
                  value={userData.age}
                  onChange={(v) => setUserData((p) => ({ ...p, age: v }))}
                />
              </div>
            </div>

            {/* Start button */}
            <div className="mt-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <button type="submit" disabled={!isRegValid} className="m-fab">
                <MaterialIcon icon="arrow_forward" size={22} />
                Начать опрос
              </button>
            </div>
          </form>
        )}

        {/* ── Survey ── */}
        {page === 'survey' && (
          <form onSubmit={handleSubmitSurvey}>
            {/* Progress */}
            <div className="bg-m-surface-container-lowest rounded-[28px] px-8 py-8 sm:px-10 sm:py-9 m-elevation-1 mb-12 sm:mb-14 animate-scale-in sticky top-4 z-10">
              <div className="flex items-center gap-5">
                <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                  isSurveyComplete ? 'bg-m-primary-container' : 'bg-m-surface-container-high'
                }`}>
                  <MaterialIcon
                    icon={isSurveyComplete ? 'check_circle' : 'edit_note'}
                    size={22}
                    filled={isSurveyComplete}
                    className={isSurveyComplete ? 'text-m-primary' : 'text-m-on-surface-variant'}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold text-m-on-surface-variant mb-3">Прогресс</p>
                  <div className="h-4 bg-m-surface-container-highest rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${progressPercent}%`,
                        background: isSurveyComplete
                          ? 'var(--color-m-primary)'
                          : 'linear-gradient(90deg, var(--color-m-primary), var(--color-m-tertiary))',
                      }}
                    />
                  </div>
                </div>
                <span className="text-[17px] font-bold text-m-on-surface tabular-nums whitespace-nowrap min-w-[56px] text-right">
                  {answeredCount}/{requiredCount}
                </span>
              </div>
            </div>

            {/* Questions */}
            <div className="flex flex-col gap-8 m-scrollbar">
              {questions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  answer={answers[question.id]}
                  onAnswer={handleAnswer}
                  index={index}
                />
              ))}
            </div>

            {/* Submit */}
            <div className="mt-10 animate-fade-in-up">
              <button type="submit" disabled={!isSurveyComplete} className="m-fab">
                <MaterialIcon icon="check_circle" size={22} />
                Завершить опрос
              </button>
            </div>
          </form>
        )}

        {/* ── Results ── */}
        {page === 'results' && (
          <ResultsView
            userData={userData}
            answers={answers}
            onRestart={() => {
              setPage('registration');
              setUserData({ firstName: '', lastName: '', age: '' });
              setAnswers({});
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* Bottom spacer */}
        <div className="h-10" />
      </div>
    </div>
  );
}

/* ───────── Styled Input Field ───────── */
interface InputFieldProps {
  icon: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  min?: number;
}

function InputField({ icon, placeholder, value, onChange, type = 'text', min }: InputFieldProps) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-m-surface-container-high flex items-center justify-center pointer-events-none z-10">
        <MaterialIcon icon={icon} size={20} className="text-m-on-surface-variant" />
      </div>
      <input
        type={type}
        min={min}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="m-field-large"
      />
    </div>
  );
}

/* ───────── Results View ───────── */
interface ResultsViewProps {
  userData: UserData;
  answers: Answers;
  onRestart: () => void;
}

function ResultsView({ userData, answers, onRestart }: ResultsViewProps) {
  const riskLevel = getRiskLevel(answers);
  const recommendation = getRecommendation(answers);

  const riskConfig = {
    high:      { icon: 'warning',             color: 'bg-m-error-container text-m-on-error-container',                      chipBg: 'bg-m-error',     chipText: 'text-m-on-error',     label: 'Высокий риск' },
    medium:    { icon: 'info',                color: 'bg-m-warning-container text-[#4A3800]',                                chipBg: 'bg-m-warning',   chipText: 'text-white',          label: 'Средний риск' },
    low:       { icon: 'thumb_up',            color: 'bg-m-secondary-container text-m-on-secondary-container',               chipBg: 'bg-m-secondary', chipText: 'text-m-on-secondary', label: 'Низкий риск' },
    good:      { icon: 'sentiment_satisfied', color: 'bg-m-primary-container/60 text-m-on-primary-container',                chipBg: 'bg-m-primary',   chipText: 'text-m-on-primary',   label: 'Хорошо' },
    excellent: { icon: 'star',                color: 'bg-m-primary-container text-m-on-primary-container',                   chipBg: 'bg-m-primary',   chipText: 'text-m-on-primary',   label: 'Отлично' },
  };

  const config = riskConfig[riskLevel];

  return (
    <div className="flex flex-col gap-7">
      {/* Thank you */}
      <div className="bg-m-surface-container-lowest rounded-[32px] m-elevation-2 overflow-hidden animate-fade-in-up text-center px-10 py-16 sm:px-14 sm:py-20">
        <div className="w-16 h-16 rounded-[24px] bg-m-primary-container flex items-center justify-center mx-auto mb-6 m-elevation-1">
          <MaterialIcon icon="celebration" size={32} filled className="text-m-primary" />
        </div>
        <h2 className="text-[28px] sm:text-[32px] font-bold text-m-on-surface mb-5">Спасибо за участие!</h2>
        <p className="text-[17px] text-m-on-surface-variant">Ваши ответы успешно сохранены</p>
      </div>

      {/* User info */}
      <div className="bg-m-surface-container-lowest rounded-[32px] m-elevation-1 overflow-hidden animate-fade-in-up" style={{ animationDelay: '80ms' }}>
        <div className="px-10 py-10 sm:px-14 sm:py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-m-secondary-container flex items-center justify-center mx-auto mb-4">
            <MaterialIcon icon="person" size={24} filled className="text-m-secondary" />
          </div>
          <h3 className="text-[22px] font-bold text-m-on-surface">Участник</h3>
        </div>
        <div className="mx-10 sm:mx-14 h-px bg-m-outline-variant/30" />
        <div className="px-10 sm:px-14 py-12 flex flex-col gap-7">
          <InfoRow icon="badge" label="Имя" value={userData.firstName} />
          <InfoRow icon="person" label="Фамилия" value={userData.lastName} />
          <InfoRow icon="cake" label="Возраст" value={`${userData.age} лет`} />
        </div>
      </div>

      {/* Answers */}
      <div className="bg-m-surface-container-lowest rounded-[32px] m-elevation-1 overflow-hidden animate-fade-in-up" style={{ animationDelay: '160ms' }}>
        <div className="px-10 py-10 sm:px-14 sm:py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-m-tertiary-container flex items-center justify-center mx-auto mb-4">
            <MaterialIcon icon="quiz" size={24} filled className="text-m-tertiary" />
          </div>
          <h3 className="text-[22px] font-bold text-m-on-surface">Ваши ответы</h3>
        </div>
        <div className="mx-10 sm:mx-14 h-px bg-m-outline-variant/30" />
        <div className="px-10 sm:px-14 py-10 flex flex-col gap-0">
          {questions.map((q, i) => {
            const answer = answers[q.id];
            let displayValue = '—';
            if (Array.isArray(answer)) {
              displayValue = answer.length > 0 ? answer.join(', ') : '—';
            } else if (typeof answer === 'string' && answer.trim()) {
              displayValue = answer;
            }
            return (
              <div key={q.id} className={`py-7 ${i < questions.length - 1 ? 'border-b border-m-outline-variant/20' : ''}`}>
                <p className="text-[13px] font-bold text-m-primary uppercase tracking-wider mb-4">
                  {q.resultLabel}
                </p>
                <p className="text-[16px] sm:text-[17px] text-m-on-surface leading-relaxed">{displayValue}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendation */}
      <div className={`rounded-[32px] overflow-hidden m-elevation-2 animate-fade-in-up ${config.color}`} style={{ animationDelay: '240ms' }}>
        <div className="px-10 sm:px-14 py-14 sm:py-16 text-center">
          <div className={`w-14 h-14 rounded-full ${config.chipBg} ${config.chipText} flex items-center justify-center mx-auto mb-6`}>
            <MaterialIcon icon={config.icon} size={28} filled />
          </div>
          <h3 className="text-[24px] font-bold mb-5">Рекомендации</h3>
          <span className={`inline-flex items-center px-7 py-3 rounded-full text-[15px] font-bold mb-8 ${config.chipBg} ${config.chipText}`}>
            {config.label}
          </span>
          <p className="text-[16px] sm:text-[17px] leading-relaxed opacity-90 text-left mt-6">{recommendation}</p>
        </div>
      </div>

      {/* Restart */}
      <div className="animate-fade-in-up mt-2" style={{ animationDelay: '320ms' }}>
        <button onClick={onRestart} className="m-fab">
          <MaterialIcon icon="refresh" size={22} />
          Пройти заново
        </button>
      </div>
    </div>
  );
}

/* ───────── Info Row ───────── */
function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-5 bg-m-surface-container-low rounded-[20px] px-6 py-5">
      <div className="w-10 h-10 rounded-full bg-m-surface-container-high flex items-center justify-center flex-shrink-0">
        <MaterialIcon icon={icon} size={20} className="text-m-on-surface-variant" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-m-on-surface-variant font-semibold uppercase tracking-wider mb-3">{label}</p>
        <p className="text-[18px] text-m-on-surface font-semibold truncate">{value}</p>
      </div>
    </div>
  );
}
