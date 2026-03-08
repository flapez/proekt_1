import type { Answers } from '../types';

export function getRecommendation(answers: Answers): string {
  let riskScore = 0;

  const q1 = typeof answers.q1 === 'string' ? answers.q1 : '';
  const q2 = typeof answers.q2 === 'string' ? answers.q2 : '';
  const q3 = typeof answers.q3 === 'string' ? answers.q3 : '';
  const q5 = typeof answers.q5 === 'string' ? answers.q5 : '';
  const q7 = typeof answers.q7 === 'string' ? answers.q7 : '';
  const q8 = typeof answers.q8 === 'string' ? answers.q8 : '';
  const q10 = typeof answers.q10 === 'string' ? answers.q10 : '';
  const q4 = Array.isArray(answers.q4) && answers.q4.length > 0;

  if (q1.includes('Более 5')) riskScore++;
  if (q2 === 'Да') riskScore++;
  if (q4) riskScore++;
  if (q5.includes('никогда') || q5.toLowerCase().includes('редко')) riskScore++;
  if (q8.includes('Менее 6')) riskScore++;
  if (q10.startsWith('Да,')) riskScore++;
  if (q3.includes('часто')) riskScore++;
  if (q7.includes('Плохое')) riskScore++;

  if (riskScore >= 6) {
    return 'Вам стоит серьёзно задуматься о своём образе жизни. Множество факторов указывают на высокий риск ухудшения здоровья. Рекомендуем как можно скорее обратиться к врачу и начать работать над собой: снизить время за гаджетами, улучшить питание, начать физическую активность, отказаться от вредных привычек.';
  } else if (riskScore >= 4) {
    return 'Ваш образ жизни требует внимания. Некоторые привычки могут негативно влиять на здоровье. Рекомендуется сократить время за гаджетами, увеличить физическую активность, улучшить режим сна и питания. Попробуйте пройти обследование у врача.';
  } else if (riskScore >= 2) {
    return 'Вы на правильном пути, но есть области для улучшения. Обратите внимание на режим дня, сон, физическую активность и питание. Старайтесь избегать вредных привычек и поддерживать активный образ жизни.';
  } else if (riskScore >= 1) {
    return 'Вы в целом ведёте здоровый образ жизни! Однако стоит продолжать следить за своим здоровьем, не пренебрегать физической активностью и правильным питанием. Регулярные профилактические осмотры — отличная привычка.';
  }

  return 'Отличные результаты! Вы ведёте здоровый образ жизни, следите за своим здоровьем и осознанно подходите к своим привычкам. Продолжайте в том же духе!';
}

export function getRiskLevel(answers: Answers): 'high' | 'medium' | 'low' | 'good' | 'excellent' {
  let riskScore = 0;

  const q1 = typeof answers.q1 === 'string' ? answers.q1 : '';
  const q2 = typeof answers.q2 === 'string' ? answers.q2 : '';
  const q3 = typeof answers.q3 === 'string' ? answers.q3 : '';
  const q5 = typeof answers.q5 === 'string' ? answers.q5 : '';
  const q7 = typeof answers.q7 === 'string' ? answers.q7 : '';
  const q8 = typeof answers.q8 === 'string' ? answers.q8 : '';
  const q10 = typeof answers.q10 === 'string' ? answers.q10 : '';
  const q4 = Array.isArray(answers.q4) && answers.q4.length > 0;

  if (q1.includes('Более 5')) riskScore++;
  if (q2 === 'Да') riskScore++;
  if (q4) riskScore++;
  if (q5.includes('никогда') || q5.toLowerCase().includes('редко')) riskScore++;
  if (q8.includes('Менее 6')) riskScore++;
  if (q10.startsWith('Да,')) riskScore++;
  if (q3.includes('часто')) riskScore++;
  if (q7.includes('Плохое')) riskScore++;

  if (riskScore >= 6) return 'high';
  if (riskScore >= 4) return 'medium';
  if (riskScore >= 2) return 'low';
  if (riskScore >= 1) return 'good';
  return 'excellent';
}
