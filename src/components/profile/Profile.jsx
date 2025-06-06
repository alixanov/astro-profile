import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { AutoAwesome, Public, Star, Warning, Favorite, Casino, NightsStay } from '@mui/icons-material';

// Animations
const gentleGlow = keyframes`
  0%, 100% { filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.3)); }
  50% { filter: drop-shadow(0 0 15px rgba(192, 132, 252, 0.5)); }
`;

const subtleFlicker = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 0.8; }
`;

const candleFlicker = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.05); }
`;

const runicGlow = keyframes`
  0%, 100% { text-shadow: 0 0 5px #8b5cf6, 0 0 10px #8b5cf6; }
  50% { text-shadow: 0 0 8px #c084fc, 0 0 15px #c084fc; }
`;

const mysticalPulse = keyframes`
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px #8b5cf6); }
  50% { transform: scale(1.05); filter: drop-shadow(0 0 20px #c084fc); }
`;

const celestialFade = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  100% { opacity: 1; transform: scale(1); }
`;

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

  .smoke {
    position: absolute;
    width: 50px;
    height: 50px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.7), transparent);
    border-radius: 50%;
    filter: blur(10px);
    opacity: 0.4;

    &:nth-child(1) { left: 15%; top: 20%; }
    &:nth-child(2) { left: 30%; top: 50%; }
    &:nth-child(3) { left: 70%; top: 30%; }
    &:nth-child(4) { left: 50%; top: 80%; }
  }

  .candle {
    position: absolute;
    bottom: 15%;
    width: 3px;
    height: 10px;
    background: linear-gradient(to top, #fbbf24, #f59e0b);
    animation: ${candleFlicker} 3s ease-in-out infinite;
    filter: blur(1px);

    &:nth-child(5) { left: 10%; }
    &:nth-child(6) { right: 10%; }
  }

  @media (max-width: 767px) {
    .smoke {
      width: 30px;
      height: 30px;
      filter: blur(8px);
      opacity: 0.3;
    }

    .candle {
      width: 2px;
      height: 8px;
      bottom: 10%;
    }
  }
`;

const RunicCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 450px;
  border: 2px solid rgba(139, 92, 246, 0.2);
  border-radius: 50%;
  z-index: 1;
  animation: ${mysticalPulse} 5s ease-in-out infinite;

  &::before {
    content: '⚹ ☽ ⚹ ☾ ⚹ ☽ ⚹ ☾ ⚹';
    position: absolute;
    top: -15px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #8b5cf6;
    animation: ${subtleFlicker} 4s ease-in-out infinite;
    letter-spacing: 25px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 250px;
    height: 250px;
    border: 1px solid rgba(192, 132, 252, 0.15);
    border-radius: 50%;
    animation: ${gentleGlow} 6s ease-in-out infinite;
  }

  @media (max-width: 767px) {
    width: 250px;
    height: 250px;
    animation: none; /* Disable for performance */
    border: 1px solid rgba(139, 92, 246, 0.15);

    &::before {
      font-size: 12px;
      letter-spacing: 15px;
      top: -10px;
    }

    &::after {
      width: 150px;
      height: 150px;
    }
  }
`;

const ProfileHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  z-index: 2;

  @media (max-width: 767px) {
    margin-bottom: 2.5rem;
    margin-top: 3.5rem; /* Added to prevent overlap with HomeButton */
  }
`;

const ProfileTitle = styled.h1`
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  font-size: 3.5rem;
  background: linear-gradient(135deg, #ddd6fe 0%, #8b5cf6 50%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  letter-spacing: 0.1em;
  animation: ${runicGlow} 4s ease-in-out infinite;

  @media (max-width: 767px) {
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
  }
`;

const ProfileSubtitle = styled.p`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.3rem;
  color: #a78bfa;
  font-weight: 400;
  font-style: italic;
  opacity: 0.7;
  letter-spacing: 0.05em;

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const ProfileCard = styled(motion.div)`
  background: linear-gradient(rgba(26, 11, 46, 0.9), rgba(10, 10, 10, 0.9));
  backdrop-filter: blur(15px);
  padding: 3rem;
  border: 3px solid #d4b4fc;
  border-radius: 25px;
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.25);
  max-width: 900px;
  width: 100%;
  z-index: 2;
  animation: ${celestialFade} 1s ease-out;

  @media (max-width: 767px) {
    padding: 1.5rem;
    border-radius: 15px;
    max-width: 95vw;
    border: 2px solid #d4b4fc;
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const ProfileSection = styled(motion.div)`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  padding: 2rem;
  border-radius: 20px;
  border: 2px solid rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;

  &:hover {
    border-color: #8b5cf6;
    background: rgba(26, 11, 46, 0.9);
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
  }

  @media (max-width: 767px) {
    padding: 1.2rem;
    border-radius: 15px;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  font-size: 1.4rem;
  color: #ddd6fe;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: 0.02em;

  @media (max-width: 767px) {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
    gap: 0.5rem;
  }
`;

const SectionIcon = styled.div`
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  animation: ${subtleFlicker} 3s ease-in-out infinite;

  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
    font-size: 12px;
  }
`;

const SectionContent = styled.div`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.1rem;
  color: #ddd6fe;
  line-height: 1.7;
  opacity: 0.85;
  letter-spacing: 0.05em;

  @media (max-width: 767px) {
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const TraitsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;

  @media (max-width: 767px) {
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const TraitTag = styled.span`
  background: rgba(0, 0, 0, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #ddd6fe;
  font-family: 'Spline Sans Mono', monospace;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;

  &:hover {
    background: rgba(26, 11, 46, 0.9);
    border-color: #8b5cf6;
    box-shadow: 0 0 10px rgba(139, 92, 246, 0.3);
  }

  @media (max-width: 767px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
    border-radius: 20px;
  }
`;

const MessageSection = styled(motion.div)`
  background: linear-gradient(rgba(26, 11, 46, 0.9), rgba(10, 10, 10, 0.9));
  backdrop-filter: blur(8px);
  padding: 2.5rem;
  border: 3px solid rgba(139, 212, 255, 0.25);
  border-radius: 25px;
  text-align: center;
  margin-top: 3rem;
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.15);
  animation: ${gentleGlow} 5s ease-in-out infinite;

  @media (max-width: 767px) {
    padding: 1.5rem;
    margin-top: 2rem;
    border-radius: 15px;
    border: 2px solid rgba(139, 212, 255, 0.2);
  }
`;

const MessageText = styled.p`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.3rem;
  color: #ddd6fe;
  font-weight: 500;
  line-height: 1.8;
  font-style: italic;
  opacity: 0.85;
  letter-spacing: 0.05em;

  @media (max-width: 767px) {
    font-size: 1rem;
    line-height: 1.6;
  }
`;

const ZodiacIcon = styled(motion.div)`
  font-size: 2.2rem;
  margin-bottom: 0.75rem;
  color: #a78bfa;
  animation: ${subtleFlicker} 3s ease-in-out infinite;

  @media (max-width: 767px) {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
`;

const ForecastButton = styled(motion.button)`
  margin-top: 2rem;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 500;
  background: linear-gradient(135deg, #6b21a8, #8b5cf6, #a855f7);
  border: 2px solid rgba(139, 92, 246, 0.5);
  border-radius: 12px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: all 0.4s ease;
  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  z-index: 2;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.6);
    background: linear-gradient(135deg, #7c3aed, #a855f7);
  }

  &::before {
    content: '☾ ';
    font-size: 18px;
    animation: ${subtleFlicker} 2s ease-in-out infinite;
  }

  @media (max-width: 767px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    border-radius: 10px;
    gap: 0.5rem;
    min-height: 44px;
  }
`;

const HomeButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.8rem;
  font-size: 1rem;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 500;
  background: linear-gradient(135deg, #6b21a8, #8b5cf6);
  border: 2px solid rgba(139, 92, 246, 0.5);
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(139, 92, 246, 0.3);
  z-index: 3;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(139, 92, 246, 0.5);
    background: linear-gradient(135deg, #7c3aed, #a855f7);
  }

  @media (max-width: 767px) {
    top: 0.5rem;
    right: 0.5rem; /* Move to top-right */
    left: auto; /* Remove left positioning */
    padding: 0.6rem;
    font-size: 0.9rem;
    min-height: 44px;
    min-width: 44px;
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
    { sign: 'Taurus', emoji: '♉', start: { month: 4, day: 20 }, end: { month: 5, day: 20 }, element: 'Earth', planet: 'Venus', birthstone: 'Emberald' },
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

  const formatDate = (date) => {
    if (!date || isNaN(new Date(date).getTime())) return 'Unknown';
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleForecastClick = () => {
    navigate('/info', { state: { name, birthDate, zodiac: astroProfile.sign } });
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <ProfileContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <HomeButton
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleHomeClick}
      >
        /
      </HomeButton>

      <MysticalBackground>
        <div className="smoke"></div>
        <div className="smoke"></div>
        <div className="smoke"></div>
        <div className="smoke"></div>
        <div className="candle"></div>
        <div className="candle"></div>
      </MysticalBackground>

      <RunicCircle />

      <ProfileHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ProfileTitle>Welcome, {name}!</ProfileTitle>
        <ProfileSubtitle>Your Cosmic Profile</ProfileSubtitle>
      </ProfileHeader>

      <ProfileCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <ProfileGrid>
          <ProfileSection
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <SectionTitle>
              <SectionIcon><AutoAwesome fontSize="small" /></SectionIcon>
              Zodiac Sign
            </SectionTitle>
            <SectionContent>
              <ZodiacIcon>{astroProfile.emoji}</ZodiacIcon>
              Birth Date: {formatDate(birthDate)}
            </SectionContent>
          </ProfileSection>

          <ProfileSection
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
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

          <ProfileSection
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
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

          <ProfileSection
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
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

          <ProfileSection
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <SectionTitle>
              <SectionIcon><Favorite fontSize="small" /></SectionIcon>
              Compatibility
            </SectionTitle>
            <SectionContent>
              <div><strong>High:</strong> {astroProfile.compatibility.high.join(', ')}</div>
              <div><strong>Low:</strong> {astroProfile.compatibility.low.join(', ')}</div>
            </SectionContent>
          </ProfileSection>

          <ProfileSection
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
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

        <MessageSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <SectionTitle style={{ justifyContent: 'center', marginBottom: '1.2rem' }}>
            <SectionIcon><NightsStay fontSize="small" /></SectionIcon>
            Message from the Stars
          </SectionTitle>
          <MessageText>{astroProfile.starMessage}</MessageText>
        </MessageSection>

        <ForecastButton
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleForecastClick}
        >
          Discover Your Star Forecast
        </ForecastButton>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;