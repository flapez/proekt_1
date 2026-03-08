import { memo, useCallback } from 'react';
import type { Question } from '../types';
import { RadioOption } from './RadioOption';
import { CheckboxOption } from './CheckboxOption';
import { MaterialIcon } from './MaterialIcon';

interface Props {
  question: Question;
  answer: string | string[] | undefined;
  onAnswer: (questionId: string, value: string | string[]) => void;
  index: number;
}

const questionIcons: Record<string, string> = {
  q1: 'smartphone',
  q2: 'fastfood',
  q3: 'psychology',
  q4: 'accessibility_new',
  q5: 'fitness_center',
  q6: 'work',
  q7: 'mood',
  q8: 'bedtime',
  q9: 'medical_information',
  q10: 'smoking_rooms',
  q11: 'local_hospital',
  q12: 'sports_soccer',
  q13: 'balance',
  q14: 'autorenew',
  q15: 'lightbulb',
  q16: 'language',
  q17: 'group',
  q18: 'volunteer_activism',
  q19: 'source',
  q20: 'chat',
};

export const QuestionCard = memo(function QuestionCard({ question, answer, onAnswer, index }: Props) {
  const handleRadioChange = useCallback(
    (value: string) => onAnswer(question.id, value),
    [onAnswer, question.id]
  );

  const handleCheckboxChange = useCallback(
    (value: string, checked: boolean) => {
      const current = Array.isArray(answer) ? answer : [];
      const updated = checked ? [...current, value] : current.filter((v) => v !== value);
      onAnswer(question.id, updated);
    },
    [onAnswer, question.id, answer]
  );

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onAnswer(question.id, e.target.value),
    [onAnswer, question.id]
  );

  const isAnswered =
    question.type === 'checkbox'
      ? Array.isArray(answer) && answer.length > 0
      : question.type === 'textarea'
      ? typeof answer === 'string' && answer.trim() !== ''
      : typeof answer === 'string' && answer !== '';

  const icon = questionIcons[question.id] || 'help';

  return (
    <div
      className="bg-m-surface-container-lowest rounded-[32px] overflow-hidden m-elevation-1 animate-slide-up"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Header — centered */}
      <div className="px-10 pt-10 pb-6 sm:px-14 sm:pt-12 sm:pb-7 text-center">
        <div className={`
          w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300
          ${isAnswered ? 'bg-m-primary text-m-on-primary' : 'bg-m-surface-container-high text-m-on-surface-variant'}
        `}>
          <MaterialIcon icon={isAnswered ? 'check' : icon} size={22} filled={isAnswered} />
        </div>
        <h3 className="text-[17px] sm:text-[18px] font-semibold text-m-on-surface leading-relaxed px-4">
          {question.title}
        </h3>
      </div>

      {/* Divider */}
      <div className="mx-10 sm:mx-14 h-px bg-m-outline-variant/30" />

      {/* Body */}
      <div className="px-8 py-10 sm:px-14 sm:py-12">
        {question.type === 'radio' && (
          <div className="flex flex-col gap-6">
            {question.options?.map((option) => (
              <RadioOption
                key={option}
                name={question.id}
                value={option}
                checked={answer === option}
                onChange={handleRadioChange}
              />
            ))}
          </div>
        )}

        {question.type === 'checkbox' && (
          <div className="flex flex-col gap-6">
            {question.options?.map((option) => (
              <CheckboxOption
                key={option}
                value={option}
                checked={Array.isArray(answer) ? answer.includes(option) : false}
                onChange={handleCheckboxChange}
              />
            ))}
          </div>
        )}

        {question.type === 'textarea' && (
          <div className="px-0">
            <textarea
              rows={5}
              placeholder="Не обязательное поле"
              value={typeof answer === 'string' ? answer : ''}
              onChange={handleTextChange}
              className="w-full px-8 py-7 rounded-[24px] bg-m-surface-container-low border-2 border-m-outline-variant text-[16px] resize-none outline-none transition-all duration-200 focus:border-m-primary focus:bg-m-surface-container-lowest focus:shadow-[0_0_0_4px_rgba(0,107,94,0.15)] text-m-on-surface placeholder:text-m-outline"
              style={{ fontFamily: 'inherit' }}
            />
          </div>
        )}
      </div>
    </div>
  );
});
