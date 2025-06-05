import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

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

const InfoContainer = styled(motion.div)`
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
    background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent);
    border-radius: 50%;
    filter: blur(15px);
    opacity: 0.4;
    
    &:nth-child(1) { left: 15%; top: 20%; }
    &:nth-child(2) { left: 30%; top: 60%; }
    &:nth-child(3) { left: 70%; top: 30%; }
    &:nth-child(4) { left: 85%; top: 80%; }
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
  animation: ${gentleGlow} 5s ease-in-out infinite;
  
  &::before {
    content: '⚹ ☽ ⚹ ☾ ⚹ ☽ ⚹ ☾';
    position: absolute;
    top: -15px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #8b5cf6;
    animation: ${subtleFlicker} 4s ease-in-out infinite;
    letter-spacing: 30px;
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
`;

const InfoHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  z-index: 2;
`;

const InfoTitle = styled.h1`
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

  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

const InfoSubtitle = styled.p`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.3rem;
  color: #a78bfa;
  font-weight: 300;
  font-style: italic;
  opacity: 0.7;
  letter-spacing: 0.05em;
`;

const ForecastCard = styled(motion.div)`
  background: rgba(26, 11, 46, 0.85);
  backdrop-filter: blur(25px);
  padding: 3rem;
  border: 2px solid rgba(139, 92, 246, 0.25);
  border-radius: 25px;
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.15), inset 0 0 20px rgba(0, 0, 0, 0.4);
  max-width: 900px;
  width: 100%;
  z-index: 2;
  animation: ${gentleGlow} 5s ease-in-out infinite;

  @media (max-width: 768px) {
    padding: 2.5rem;
  }
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const DayCell = styled(motion.div)`
  background: ${props => {
    if (props.isLucky) return 'rgba(22, 163, 74, 0.3)';
    if (props.isUnlucky) return 'rgba(220, 38, 38, 0.3)';
    return 'rgba(0, 0, 0, 0.65)';
  }};
  border: 1px solid ${props => {
    if (props.isLucky) return '#16a34a';
    if (props.isUnlucky) return '#dc2626';
    return 'rgba(139, 92, 246, 0.3)';
  }};
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  font-size: 1rem;
  color: #ddd6fe;
  font-family: 'Spline Sans Mono', monospace;
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px ${props => {
    if (props.isLucky) return 'rgba(22, 163, 74, 0.5)';
    if (props.isUnlucky) return 'rgba(220, 38, 38, 0.5)';
    return 'rgba(139, 92, 246, 0.4)';
  }};
  }
`;

const ForecastSection = styled(motion.div)`
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(15px);
  padding: 2rem;
  border-radius: 20px;
  border: 2px solid rgba(139, 92, 246, 0.3);
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: #8b5cf6;
    background: rgba(26, 11, 46, 0.9);
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
  }
`;

const ForecastTitle = styled.h2`
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 500;
  font-size: 1.4rem;
  color: #ddd6fe;
  margin-bottom: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  letter-spacing: 0.05em;
`;

const ForecastIcon = styled.div`
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  animation: ${subtleFlicker} 3s ease-in-out infinite;
`;

const ForecastContent = styled.div`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.1rem;
  color: #ddd6fe;
  line-height: 1.7;
  opacity: 0.85;
  letter-spacing: 0.05em;
`;

const ForecastDate = styled.span`
  font-weight: 600;
  color: #c084fc;
`;

const BackButton = styled(motion.button)`
  margin-top: 2rem;
  padding: 1.2rem 3rem;
  font-size: 1.2rem;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 500;
  background: linear-gradient(135deg, #6b21a8 0%, #8b5cf6 50%, #a855f7 100%);
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
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
    animation: ${gentleGlow} 0.5s ease-in-out;
  }

  &::before {
    content: '←';
    font-size: 18px;
    animation: ${subtleFlicker} 2s ease-in-out infinite;
  }
`;

const Info = () => {
  const { state } = useLocation();
  const { name, zodiac } = state || { name: 'User', zodiac: 'Leo ♌' };
  const navigate = useNavigate();

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const luckyDays = [11];
  const unluckyDays = [2, 3];

  const forecast = {
    luckyDay: {
      date: 'July 11, 2025',
      message: 'On this day, Venus forms a harmonious trine with Jupiter, amplifying your charisma and luck, oh Leo. The stars whisper of opportunities in love and creativity. Act boldly, and the cosmos will support you!',
    },
    unluckyDays: {
      date: 'July 2–3, 2025',
      message: 'Mercury retrograde stirs chaos in communication, while a tense Mars-Saturn aspect adds obstacles. Avoid major decisions and stay calm to navigate this cosmic turbulence.',
    },
  };

  const handleBackClick = () => {
    navigate('/profile', { state: { name, zodiac } });
  };

  return (
    <InfoContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <MysticalBackground>
        <div className="smoke"></div>
        <div className="smoke"></div>
        <div className="smoke"></div>
        <div className="smoke"></div>
        <div className="candle"></div>
        <div className="candle"></div>
      </MysticalBackground>

      <RunicCircle />

      <InfoHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <InfoTitle>Forecast for July 2025, {name}</InfoTitle>
        <InfoSubtitle>The Cosmos Unveils Your Fate, {zodiac}</InfoSubtitle>
      </InfoHeader>

      <ForecastCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <ForecastSection
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <ForecastTitle>
            <ForecastIcon>📅</ForecastIcon>
            Calendar of Fate
          </ForecastTitle>
          <DayGrid>
            {days.map(day => (
              <DayCell
                key={day}
                isLucky={luckyDays.includes(day)}
                isUnlucky={unluckyDays.includes(day)}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {day}
              </DayCell>
            ))}
          </DayGrid>
        </ForecastSection>

        <ForecastSection
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <ForecastTitle>
            <ForecastIcon>🌞</ForecastIcon>
            Lucky Day
          </ForecastTitle>
          <ForecastContent>
            <ForecastDate>{forecast.luckyDay.date}</ForecastDate>: {forecast.luckyDay.message}
          </ForecastContent>
        </ForecastSection>

        <ForecastSection
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <ForecastTitle>
            <ForecastIcon>🌑</ForecastIcon>
            Unlucky Days
          </ForecastTitle>
          <ForecastContent>
            <ForecastDate>{forecast.unluckyDays.date}</ForecastDate>: {forecast.unluckyDays.message}
          </ForecastContent>
        </ForecastSection>
      </ForecastCard>

      <BackButton
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleBackClick}
      >
        Return to Profile
      </BackButton>
    </InfoContainer>
  );
};

export default Info;