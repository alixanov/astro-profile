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
`;

const ProfileHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  z-index: 2;
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

  @media (max-width: 768px) {
    font-size: 2.8rem;
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

  @media (max-width: 768px) {
    padding: 2.5rem;
  }
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-bottom: 3rem;
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
`;

const SectionContent = styled.div`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.1rem;
  color: #ddd6fe;
  line-height: 1.7;
  opacity: 0.85;
  letter-spacing: 0.05em;
`;

const TraitsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;
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
`;

const ZodiacIcon = styled(motion.div)`
  font-size: 2.2rem;
  margin-bottom: 0.75rem;
  color: #a78bfa;
  animation: ${subtleFlicker} 3s ease-in-out infinite;
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
    background: linear-gradient(135deg, #7c3aed, #a855f7, #c084fc);
  }

  &::before {
    content: '☾';
    font-size: 18px;
    animation: ${subtleFlicker} 2s ease-in-out infinite;
  }
`;

const getZodiac = (birthDate) => {
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

  let zodiacData = {
    sign: 'Leo',
    emoji: '♌',
    element: 'Fire 🔥',
    planet: 'Sun ☀️',
    birthstone: 'Ruby 💎',
    strengths: ['Confident', 'Ambitious', 'Generous', 'Creative'],
    weaknesses: ['Proud', 'Stubborn', 'Dramatic'],
    compatibility: {
      high: ['Aries', 'Sagittarius', 'Gemini'],
      low: ['Taurus', 'Scorpio', 'Aquarius'],
    },
    starMessage: 'Your inner strength shines brighter than the stars. Lead others with your example and embrace the spotlight.',
    luckyNumbers: [1, 8, 10, 19],
  };

  // Simplified zodiac calculation
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    zodiacData = { ...zodiacData, sign: 'Aries', emoji: '♈', starMessage: 'Your energy ignites new paths.' };
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    zodiacData = { ...zodiacData }; // Leo (default above)
  } // Add other signs as needed

  return zodiacData;
};

const Profile = () => {
  const { state } = useLocation();
  const { name = 'User', birthDate = null } = state || {};
  const navigate = useNavigate();

  const astroProfile = getZodiac(birthDate);

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

  return (
    <ProfileContainer
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
              <SectionIcon>{astroProfile.emoji}</SectionIcon>
              Zodiac Sign
            </SectionTitle>
            <SectionContent>
              <ZodiacIcon>{astroProfile.sign}</ZodiacIcon>
              Birth Date: {formatDate(birthDate)}
            </SectionContent>
          </ProfileSection>

          <ProfileSection
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <SectionTitle>
              <SectionIcon>🔥</SectionIcon>
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
              <SectionIcon>⭐</SectionIcon>
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
              <SectionIcon>⚠️</SectionIcon>
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
              <SectionIcon>💕</SectionIcon>
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
              <SectionIcon>🍀</SectionIcon>
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
            <SectionIcon>🌟</SectionIcon>
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