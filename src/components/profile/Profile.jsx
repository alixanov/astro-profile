import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { AutoAwesome, Public, Star, Warning, Favorite, Casino, NightsStay } from '@mui/icons-material';

// Animations
const gentleGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 8px rgba(139, 92, 246, 0.2)); }
  50% { filter: drop-shadow(0 0 12px rgba(192, 132, 252, 0.4)); }
`;

const subtleFlicker = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 0.9; }
`;

const candleFlicker = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.05); }
`;

const runicGlow = keyframes`
  0%, 100% { text-shadow: 0 0 4px #8b5cf6, 0 0 8px #8b5cf6; }
  50% { text-shadow: 0 0 6px #c084fc, 0 0 12px #c084fc; }
`;

const mysticalPulse = keyframes`
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 6px #8b5cf6); }
  50% { transform: scale(1.03); filter: drop-shadow(0 0 15px #c084fc); }
`;

const stardustSparkle = keyframes`
  0% { transform: scale(0) translate(0, 0); opacity: 0; }
  50% { opacity: 0.8; }
  100% { transform: scale(1.2) translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px); opacity: 0; }
`;

// Styled Components
const ProfileContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #1a0b2e 0%, #0a0a0a 100%);
  font-family: 'Spline Sans Mono', monospace;
  color: #ddd6fe;
  position: relative;
  overflow: hidden;
  padding: 3rem 1.5rem;

  @media (max-width: 767px) {
    padding: 2rem 1rem;
    justify-content: flex-start;
    overflow-y: auto;
  }
`;

const MysticalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  .stardust {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #e0d7ff;
    border-radius: 50%;
    animation: ${stardustSparkle} 3s ease-in-out infinite;

    &:nth-child(1) { top: 15%; left: 25%; animation-delay: 0.3s; }
    &:nth-child(2) { top: 35%; left: 65%; animation-delay: 0.6s; }
    &:nth-child(3) { top: 55%; left: 35%; animation-delay: 0.9s; }
  }

  .smoke {
    position: absolute;
    width: 40px;
    height: 40px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.5), transparent);
    border-radius: 50%;
    filter: blur(8px);
    opacity: 0.3;

    &:nth-child(4) { left: 20%; top: 25%; }
    &:nth-child(5) { left: 60%; top: 45%; }
    &:nth-child(6) { left: 40%; top: 75%; }
  }

  .candle {
    position: absolute;
    bottom: 10%;
    width: 2px;
    height: 8px;
    background: linear-gradient(to top, #fbbf24, #f59e0b);
    animation: ${candleFlicker} 3s ease-in-out infinite;
    filter: blur(1px);

    &:nth-child(7) { left: 15%; }
    &:nth-child(8) { right: 15%; }
  }

  @media (max-width: 767px) {
    .stardust {
      width: 1.5px;
      height: 1.5px;
    }

    .smoke {
      width: 30px;
      height: 30px;
      filter: blur(6px);
      opacity: 0.25;
    }

    .candle {
      width: 1.5px;
      height: 6px;
      bottom: 8%;
    }
  }
`;

const RunicCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 50%;
  z-index: 1;
  animation: ${mysticalPulse} 6s ease-in-out infinite;

  &::before {
    content: '⚹ ☽ ⚹ ☾ ⚹';
    position: absolute;
    top: -12px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #8b5cf6;
    animation: ${subtleFlicker} 4s ease-in-out infinite;
    letter-spacing: 20px;
  }

  @media (max-width: 767px) {
    width: 200px;
    height: 200px;
    animation: none;
    border: 1px solid rgba(139, 92, 246, 0.1);

    &::before {
      font-size: 10px;
      letter-spacing: 12px;
      top: -8px;
    }
  }
`;

const ProfileHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  z-index: 2;

  @media (max-width: 767px) {
    margin-bottom: 2rem;
    margin-top: 3rem;
  }
`;

const ProfileTitle = styled.h1`
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  font-size: 3rem;
  background: linear-gradient(135deg, #ddd6fe 0%, #8b5cf6 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: 0.1em;
  animation: ${runicGlow} 5s ease-in-out infinite;

  @media (max-width: 767px) {
    font-size: 2rem;
    margin-bottom: 0.3rem;
  }
`;

const ProfileSubtitle = styled.p`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.2rem;
  color: #a78bfa;
  font-weight: 400;
  font-style: italic;
  opacity: 0.8;
  letter-spacing: 0.05em;

  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const ProfileCard = styled(motion.div)`
  background: linear-gradient(rgba(26, 11, 46, 0.85), rgba(10, 10, 10, 0.85));
  backdrop-filter: blur(12px);
  padding: 2.5rem;
  border: 2px solid #d4b4fc;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.2);
  max-width: 800px;
  width: 100%;
  z-index: 2;

  @media (max-width: 767px) {
    padding: 1.5rem;
    border-radius: 12px;
    max-width: 90vw;
    border: 1px solid #d4b4fc;
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2.5rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

const ProfileSection = styled(motion.div)`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    border-color: #8b5cf6;
    background: rgba(26, 11, 46, 0.8);
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
  }

  @media (max-width: 767px) {
    padding: 1rem;
    border-radius: 10px;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  font-size: 1.3rem;
  color: #ddd6fe;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: 0.02em;

  @media (max-width: 767px) {
    font-size: 1.1rem;
    margin-bottom: 0.7rem;
    gap: 0.4rem;
  }
`;

const SectionIcon = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  animation: ${subtleFlicker} 3s ease-in-out infinite;

  @media (max-width: 767px) {
    width: 20px;
    height: 20px;
    font-size: 10px;
  }
`;

const SectionContent = styled.div`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1rem;
  color: #ddd6fe;
  line-height: 1.6;
  opacity: 0.9;

  @media (max-width: 767px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const TraitsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;

  @media (max-width: 767px) {
    gap: 0.4rem;
    margin-top: 0.4rem;
  }
`;

const TraitTag = styled.span`
  background: rgba(0, 0, 0, 0.6);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid rgba(139, 92, 246, 0.2);
  color: #ddd6fe;
  font-family: 'Spline Sans Mono', monospace;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;

  &:hover {
    background: rgba(26, 11, 46, 0.8);
    border-color: #8b5cf6;
    box-shadow: 0 0 8px rgba(139, 92, 246, 0.2);
  }

  @media (max-width: 767px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.75rem;
    border-radius: 15px;
  }
`;

const MessageSection = styled(motion.div)`
  background: linear-gradient(rgba(26, 11, 46, 0.85), rgba(10, 10, 10, 0.85));
  backdrop-filter: blur(8px);
  padding: 2rem;
  border: 2px solid rgba(139, 212, 255, 0.2);
  border-radius: 20px;
  text-align: center;
  margin-top: 2.5rem;
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.1);
  animation: ${gentleGlow} 6s ease-in-out infinite;

  @media (max-width: 767px) {
    padding: 1.2rem;
    margin-top: 1.5rem;
    border-radius: 12px;
    border: 1px solid rgba(139, 212, 255, 0.15);
  }
`;

const MessageText = styled.p`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.2rem;
  color: #ddd6fe;
  font-weight: 500;
  line-height: 1.7;
  font-style: italic;
  opacity: 0.9;

  @media (max-width: 767px) {
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const ZodiacIcon = styled(motion.div)`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #a78bfa;
  animation: ${subtleFlicker} 3s ease-in-out infinite;

  @media (max-width: 767px) {
    font-size: 1.6rem;
    margin-bottom: 0.4rem;
  }
`;

const ForecastButton = styled(motion.button)`
  margin-top: 1.5rem;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 500;
  background: linear-gradient(135deg, #6b21a8, #8b5cf6, #a855f7);
  border: 1px solid rgba(139, 92, 246, 0.4);
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  transition: background 0.3s ease, border-color 0.3s ease;
  box-shadow: 0 3px 12px rgba(139, 92, 246, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  z-index: 2;

  &:hover {
    background: linear-gradient(135deg, #7c3aed, #a855f7);
    border-color: #a855f7;
    box-shadow: 0 6px 25px rgba(139, 92, 246, 0.5);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.5);
    border-color: #a855f7;
  }

  @media (max-width: 767px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
    border-radius: 8px;
    gap: 0.4rem;
    min-height: 40px;
  }
`;

const HomeButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.6rem;
  font-size: 0.9rem;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 500;
  background: linear-gradient(135deg, #6b21a8, #8b5cf6);
  border: 1px solid rgba(139, 92, 246, 0.4);
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, border-color 0.3s ease;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
  z-index: 3;

  &:hover {
    background: linear-gradient(135deg, #7c3aed, #a855f7);
    border-color: #a855f7;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.5);
    border-color: #a855f7;
  }

  @media (max-width: 767px) {
    top: 0.5rem;
    right: 0.5rem;
    left: auto;
    padding: 0.5rem;
    font-size: 0.8rem;
    min-height: 40px;
    min-width: 40px;
  }
`;

const getZodiac = (birthDate, name) => {
  if (!birthDate || isNaN(new Date(birthDate).getTime())) {
    return {
      sign: 'Unknown',
      emoji: '❓',
      element: 'Unknown',
      planet: 'Unknown',
      birthstone: 'Unknown',
      strengths: [],
      weaknesses: [],
      compatibility: { high: [], low: [] },
      starMessage: 'The stars conceal your fate...',
      luckyNumbers: [],
    };
  }

  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Zodiac sign data
  const zodiacSigns = [
    { sign: 'Aries', emoji: '♈', start: { month: 3, day: 21 }, end: { month: 4, day: 19 }, element: 'Fire', planet: 'Mars', birthstone: 'Diamond' },
    { sign: 'Taurus', emoji: '♉', start: { month: 4, day: 20 }, end: { month: 5, day: 20 }, element: 'Earth', planet: 'Venus', birthstone: 'Emerald' },
    { sign: 'Gemini', emoji: '♊', start: { month: 5, day: 21 }, end: { month: 6, day: 20 }, element: 'Air', planet: 'Mercury', birthstone: 'Pearl' },
    { sign: 'Cancer', emoji: '♋', start: { month: 6, day: 21 }, end: { month: 7, day: 22 }, element: 'Water', planet: 'Moon', birthstone: 'Ruby' },
    { sign: 'Leo', emoji: '♌', start: { month: 7, day: 23 }, end: { month: 8, day: 22 }, element: 'Fire', planet: 'Sun', birthstone: 'Peridot' },
    { sign: 'Virgo', emoji: '♍', start: { month: 8, day: 23 }, end: { month: 9, day: 22 }, element: 'Earth', planet: 'Mercury', birthstone: 'Sapphire' },
    { sign: 'Libra', emoji: '♎', start: { month: 9, day: 23 }, end: { month: 10, day: 22 }, element: 'Air', planet: 'Venus', birthstone: 'Opal' },
    { sign: 'Scorpio', emoji: '♏', start: { month: 10, day: 23 }, end: { month: 11, day: 21 }, element: 'Water', planet: 'Pluto', birthstone: 'Topaz' },
    { sign: 'Sagittarius', emoji: '♐', start: { month: 11, day: 22 }, end: { month: 12, day: 21 }, element: 'Fire', planet: 'Jupiter', birthstone: 'Turquoise' },
    { sign: 'Capricorn', emoji: '♑', start: { month: 12, day: 22 }, end: { month: 1, day: 19 }, element: 'Earth', planet: 'Saturn', birthstone: 'Garnet' },
    { sign: 'Aquarius', emoji: '♒', start: { month: 1, day: 20 }, end: { month: 2, day: 18 }, element: 'Air', planet: 'Uranus', birthstone: 'Amethyst' },
    { sign: 'Pisces', emoji: '♓', start: { month: 2, day: 19 }, end: { month: 3, day: 20 }, element: 'Water', planet: 'Neptune', birthstone: 'Aquamarine' },
  ];

  // Find zodiac sign
  const zodiac = zodiacSigns.find(({ start, end }) => {
    if (start.month === 12 && end.month === 1) {
      return (month === 12 && day >= start.day) || (month === 1 && day <= end.day);
    }
    return (month === start.month && day >= start.day) || (month === end.month && day <= end.day) ||
      (month > start.month && month < end.month);
  }) || zodiacSigns[4]; // Default to Leo if not found

  // Attribute pools
  const strengthPool = {
    Aries: ['Bold', 'Energetic', 'Courageous', 'Pioneering', 'Passionate', 'Determined'],
    Taurus: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Stable', 'Sensual'],
    Gemini: ['Adaptable', 'Curious', 'Witty', 'Communicative', 'Versatile', 'Intellectual'],
    Cancer: ['Nurturing', 'Empathetic', 'Loyal', 'Intuitive', 'Protective', 'Compassionate'],
    Leo: ['Confident', 'Ambitious', 'Generous', 'Charismatic', 'Creative', 'Warm-hearted'],
    Virgo: ['Analytical', 'Diligent', 'Precise', 'Helpful', 'Organized', 'Modest'],
    Libra: ['Diplomatic', 'Charming', 'Fair', 'Sociable', 'Artistic', 'Harmonious'],
    Scorpio: ['Intense', 'Resourceful', 'Determined', 'Insightful', 'Passionate', 'Resilient'],
    Sagittarius: ['Optimistic', 'Adventurous', 'Honest', 'Philosophical', 'Free-spirited', 'Enthusiastic'],
    Capricorn: ['Disciplined', 'Ambitious', 'Responsible', 'Practical', 'Patient', 'Persistent'],
    Aquarius: ['Innovative', 'Independent', 'Humanitarian', 'Visionary', 'Intellectual', 'Original'],
    Pisces: ['Compassionate', 'Imaginative', 'Intuitive', 'Gentle', 'Artistic', 'Empathetic'],
  };

  const weaknessPool = {
    Aries: ['Impulsive', 'Impatient', 'Aggressive', 'Reckless', 'Short-tempered'],
    Taurus: ['Stubborn', 'Possessive', 'Inflexible', 'Materialistic', 'Lazy'],
    Gemini: ['Inconsistent', 'Restless', 'Superficial', 'Indecisive', 'Nervous'],
    Cancer: ['Moody', 'Clingy', 'Over-sensitive', 'Insecure', 'Overprotective'],
    Leo: ['Arrogant', 'Stubborn', 'Vain', 'Dramatic', 'Domineering'],
    Virgo: ['Critical', 'Overthinking', 'Perfectionist', 'Worrying', 'Judgmental'],
    Libra: ['Indecisive', 'People-pleasing', 'Superficial', 'Avoidant', 'Vain'],
    Scorpio: ['Jealous', 'Secretive', 'Vindictive', 'Controlling', 'Obsessive'],
    Sagittarius: ['Tactless', 'Restless', 'Irresponsible', 'Overconfident', 'Careless'],
    Capricorn: ['Pessimistic', 'Cold', 'Workaholic', 'Unforgiving', 'Detached'],
    Aquarius: ['Aloof', 'Unpredictable', 'Detached', 'Stubborn', 'Rebellious'],
    Pisces: ['Escapist', 'Over-sensitive', 'Indecisive', 'Gullible', 'Unrealistic'],
  };

  const starMessagePool = {
    Aries: [
      'Your fiery spirit ignites new paths; charge forward with courage.',
      'The cosmos fuels your ambition; seize bold opportunities today.',
      'Your energy dazzles the stars; lead with unwavering passion.',
    ],
    Taurus: [
      'Steadfast soul, the universe rewards your patience with abundance.',
      'Grounded in strength, you build lasting legacies under the stars.',
      'Your calm resolve aligns with cosmic harmony; stay true to your path.',
    ],
    Gemini: [
      'Your wit sparkles like starlight; embrace new ideas with curiosity.',
      'The cosmos dances to your versatile tune; connect and inspire.',
      'Your mind is a celestial map; explore its boundless possibilities.',
    ],
    Cancer: [
      'Your heart’s warmth lights the night; nurture those you love.',
      'The moon guides your intuition; trust your inner cosmic compass.',
      'Your empathy weaves a tapestry of stars; protect your gentle soul.',
    ],
    Leo: [
      'Your radiance outshines the stars; lead with bold charisma.',
      'The sun fuels your creative fire; shine brightly in all you do.',
      'Your heart roars with cosmic pride; embrace your destined spotlight.',
    ],
    Virgo: [
      'Your precision crafts cosmic order; refine your world with care.',
      'The stars applaud your diligence; small steps lead to great destinies.',
      'Your mind aligns with celestial clarity; serve with humble wisdom.',
    ],
    Libra: [
      'Your charm balances the cosmos; seek harmony in all connections.',
      'The stars favor your grace; create beauty in every encounter.',
      'Your heart seeks cosmic equilibrium; choose fairness and love.',
    ],
    Scorpio: [
      'Your depth pierces the cosmic veil; uncover hidden truths.',
      'The stars empower your resilience; rise stronger from every challenge.',
      'Your passion burns like a supernova; transform with fierce intensity.',
    ],
    Sagittarius: [
      'Your spirit soars among the stars; chase adventure with zeal.',
      'The cosmos fuels your optimism; seek wisdom in every journey.',
      'Your honesty lights the galactic path; aim high and roam free.',
    ],
    Capricorn: [
      'Your ambition builds cosmic empires; climb with unwavering focus.',
      'The stars reward your discipline; your legacy will endure.',
      'Your resolve is a celestial anchor; persist through any storm.',
    ],
    Aquarius: [
      'Your vision reshapes the cosmos; innovate with fearless originality.',
      'The stars celebrate your independence; inspire change in the world.',
      'Your mind is a galactic beacon; dream beyond the ordinary.',
    ],
    Pisces: [
      'Your soul swims in cosmic oceans; let intuition guide your dreams.',
      'The stars weave your empathy into light; heal with gentle compassion.',
      'Your imagination paints the galaxy; create with boundless wonder.',
    ],
  };

  // Random selection helper
  const seedRandom = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return (hash & 0x7fffffff) / 0x7fffffff;
  };

  const randomSelect = (array, count, seed) => {
    const rand = seedRandom(seed);
    const shuffled = [...array].sort(() => rand - 0.5);
    return shuffled.slice(0, count);
  };

  // Generate unique attributes
  const seed = `${name}-${birthDate}`;
  const strengths = randomSelect(strengthPool[zodiac.sign], 4, seed + 'strengths');
  const weaknesses = randomSelect(weaknessPool[zodiac.sign], 3, seed + 'weaknesses');
  const starMessage = randomSelect(starMessagePool[zodiac.sign], 1, seed + 'message')[0];
  const allSigns = zodiacSigns.map(s => s.sign);
  const highCompatibility = randomSelect(allSigns.filter(s => s !== zodiac.sign), 3, seed + 'high');
  const lowCompatibility = randomSelect(allSigns.filter(s => !highCompatibility.includes(s) && s !== zodiac.sign), 2, seed + 'low');
  const luckyNumbers = Array.from({ length: 6 }, () => Math.floor(seedRandom(seed + Math.random()) * 49) + 1).sort((a, b) => a - b);

  return {
    sign: zodiac.sign,
    emoji: zodiac.emoji,
    element: zodiac.element,
    planet: zodiac.planet,
    birthstone: zodiac.birthstone,
    strengths,
    weaknesses,
    compatibility: { high: highCompatibility, low: lowCompatibility },
    starMessage,
    luckyNumbers,
  };
};

const Profile = () => {
  const { state } = useLocation();
  const { name = 'User', birthDate = null } = state || {};
  const navigate = useNavigate();
  const astroProfile = getZodiac(birthDate, name);

  useEffect(() => {
    // GSAP Timeline for subtle cosmic unfold
    const tl = gsap.timeline({ overwrite: 'auto' });

    // Initial state for ProfileContainer
    gsap.set('.profile-container', {
      opacity: 0,
      y: 20,
    });

    // Gentle fade-in and upward drift
    tl.to('.profile-container', {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
    });

    // Staggered reveal for ProfileHeader
    tl.fromTo(
      '.profile-header',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=1.0'
    );

    // Staggered reveal for ProfileCard
    tl.fromTo(
      '.profile-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.8'
    );

    // Staggered reveal for ProfileSections
    tl.fromTo(
      '.profile-section',
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
      },
      '-=0.6'
    );

    // Staggered reveal for MessageSection
    tl.fromTo(
      '.message-section',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );

    // Staggered reveal for ForecastButton
    tl.fromTo(
      '.forecast-button',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    // Subtle stardust animation
    tl.fromTo(
      '.stardust',
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 0.8,
        duration: 1,
        stagger: 0.2,
        ease: 'power1.out',
      },
      0.5
    );

    return () => {
      tl.kill(); // Clean up on unmount
    };
  }, []);

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) return 'Unknown';
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleForecastClick = () => {
    const zodiacSign = astroProfile.sign || 'Unknown';
    navigate('/info', { state: { name, birthDate, zodiac: zodiacSign } });
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <ProfileContainer className="profile-container">
      <HomeButton
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleHomeClick}
        aria-label="Return to home"
      >
        /
      </HomeButton>

      <MysticalBackground>
        <div className="stardust"></div>
        <div className="stardust"></div>
        <div className="stardust"></div>
        <div className="smoke"></div>
        <div className="smoke"></div>
        <div className="smoke"></div>
        <div className="candle"></div>
        <div className="candle"></div>
      </MysticalBackground>

      <RunicCircle />

      <ProfileHeader className="profile-header">
        <ProfileTitle>Welcome, {name}!</ProfileTitle>
        <ProfileSubtitle>Your Cosmic Profile</ProfileSubtitle>
      </ProfileHeader>

      <ProfileCard className="profile-card">
        <ProfileGrid>
          <ProfileSection className="profile-section">
            <SectionTitle>
              <SectionIcon><AutoAwesome fontSize="small" /></SectionIcon>
              Zodiac Sign
            </SectionTitle>
            <SectionContent>
              <ZodiacIcon>{astroProfile.emoji}</ZodiacIcon>
              Birth Date: {formatDate(birthDate)}
            </SectionContent>
          </ProfileSection>

          <ProfileSection className="profile-section">
            <SectionTitle>
              <SectionIcon><Public fontSize="small" /></SectionIcon>
              Element & Planet
            </SectionTitle>
            <SectionContent>
              <div>Element: {astroProfile.element}</div>
              <div>Ruling Planet: {astroProfile.planet}</div>
              <div>Birthstone: {astroProfile.birthstone}</div>
            </SectionContent>
          </ProfileSection>

          <ProfileSection className="profile-section">
            <SectionTitle>
              <SectionIcon><Star fontSize="small" /></SectionIcon>
              Strengths
            </SectionTitle>
            <SectionContent>
              <TraitsList>
                {astroProfile.strengths.map((trait, index) => (
                  <TraitTag key={index}>{trait}</TraitTag>
                ))}
              </TraitsList>
            </SectionContent>
          </ProfileSection>

          <ProfileSection className="profile-section">
            <SectionTitle>
              <SectionIcon><Warning fontSize="small" /></SectionIcon>
              Areas for Growth
            </SectionTitle>
            <SectionContent>
              <TraitsList>
                {astroProfile.weaknesses.map((trait, index) => (
                  <TraitTag key={index}>{trait}</TraitTag>
                ))}
              </TraitsList>
            </SectionContent>
          </ProfileSection>

          <ProfileSection className="profile-section">
            <SectionTitle>
              <SectionIcon><Favorite fontSize="small" /></SectionIcon>
              Compatibility
            </SectionTitle>
            <SectionContent>
              <div><strong>High:</strong> {astroProfile.compatibility.high.join(', ')}</div>
              <div><strong>Low:</strong> {astroProfile.compatibility.low.join(', ')}</div>
            </SectionContent>
          </ProfileSection>

          <ProfileSection className="profile-section">
            <SectionTitle>
              <SectionIcon><Casino fontSize="small" /></SectionIcon>
              Lucky Numbers
            </SectionTitle>
            <SectionContent>
              <TraitsList>
                {astroProfile.luckyNumbers.map((number, index) => (
                  <TraitTag key={index}>{number}</TraitTag>
                ))}
              </TraitsList>
            </SectionContent>
          </ProfileSection>
        </ProfileGrid>

        <MessageSection className="message-section">
          <SectionTitle style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            <SectionIcon><NightsStay fontSize="small" /></SectionIcon>
            Message from the Stars
          </SectionTitle>
          <MessageText>{astroProfile.starMessage}</MessageText>
        </MessageSection>

        <ForecastButton
          className="forecast-button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleForecastClick}
          aria-label="Discover your star forecast"
        >
          Discover Your Star Forecast
        </ForecastButton>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;