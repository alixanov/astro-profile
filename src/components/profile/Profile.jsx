import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// Анимации
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const ProfileContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  padding: 2rem 1rem;
`;

const StarField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  .star {
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    animation: ${sparkle} 3s infinite;
    
    &:nth-child(1) { top: 15%; left: 10%; animation-delay: 0s; }
    &:nth-child(2) { top: 25%; right: 15%; animation-delay: 0.5s; }
    &:nth-child(3) { top: 45%; left: 8%; animation-delay: 1s; }
    &:nth-child(4) { top: 60%; right: 12%; animation-delay: 1.5s; }
    &:nth-child(5) { top: 75%; left: 20%; animation-delay: 2s; }
    &:nth-child(6) { top: 85%; right: 25%; animation-delay: 2.5s; }
  }
`;

const ProfileHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
  z-index: 2;
`;

const ProfileTitle = styled.h1`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 2.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProfileSubtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 400;
`;

const ProfileCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  z-index: 2;
  animation: ${float} 6s ease-in-out infinite;
`;

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ProfileSection = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.3rem;
  color: #ffffff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SectionIcon = styled.div`
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const SectionContent = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
`;

const TraitsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TraitTag = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }
`;

const MessageSection = styled(motion.div)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
  backdrop-filter: blur(15px);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  margin-top: 2rem;
`;

const MessageText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.2rem;
  color: #ffffff;
  font-weight: 500;
  line-height: 1.7;
  font-style: italic;
`;

const ZodiacIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Profile = () => {
  const { state } = useLocation();
  const { name, birthDate } = state || { name: 'Пользователь', birthDate: 'Неизвестно' };

  // Заглушка астрологических данных
  const astroProfile = {
    zodiac: 'Лев ♌',
    element: 'Огонь 🔥',
    planet: 'Солнце ☀️',
    traits: {
      strengths: ['Уверенный', 'Амбициозный', 'Щедрый', 'Творческий'],
      weaknesses: ['Гордый', 'Упрямый', 'Драматичный'],
    },
    compatibility: {
      high: ['Овен', 'Стрелец', 'Близнецы'],
      low: ['Телец', 'Скорпион', 'Водолей'],
    },
    starMessage: 'Твоя внутренняя сила сияет ярче звезд. Веди за собой других своим примером и не бойся быть в центре внимания.',
    luckyNumbers: [1, 8, 10, 19],
    birthstone: 'Рубин 💎',
  };

  return (
    <ProfileContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <StarField>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
        <div className="star"></div>
      </StarField>

      <ProfileHeader
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ProfileTitle>Добро пожаловать, {name}!</ProfileTitle>
        <ProfileSubtitle>Ваш космический профиль готов</ProfileSubtitle>
      </ProfileHeader>

      <ProfileCard
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <ProfileGrid>
          <ProfileSection
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <SectionTitle>
              <SectionIcon>♌</SectionIcon>
              Знак зодиака
            </SectionTitle>
            <SectionContent>
              <ZodiacIcon>{astroProfile.zodiac}</ZodiacIcon>
              Дата рождения: {new Date(birthDate).toLocaleDateString('ru-RU')}
            </SectionContent>
          </ProfileSection>

          <ProfileSection
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <SectionTitle>
              <SectionIcon>🔥</SectionIcon>
              Стихия и планета
            </SectionTitle>
            <SectionContent>
              <div>Стихия: {astroProfile.element}</div>
              <div>Планета-покровитель: {astroProfile.planet}</div>
              <div>Камень: {astroProfile.birthstone}</div>
            </SectionContent>
          </ProfileSection>

          <ProfileSection
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <SectionTitle>
              <SectionIcon>⭐</SectionIcon>
              Сильные стороны
            </SectionTitle>
            <SectionContent>
              <TraitsList>
                {astroProfile.traits.strengths.map((trait, index) => (
                  <TraitTag key={index}>{trait}</TraitTag>
                ))}
              </TraitsList>
            </SectionContent>
          </ProfileSection>

          <ProfileSection
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <SectionTitle>
              <SectionIcon>⚠️</SectionIcon>
              Области для роста
            </SectionTitle>
            <SectionContent>
              <TraitsList>
                {astroProfile.traits.weaknesses.map((trait, index) => (
                  <TraitTag key={index}>{trait}</TraitTag>
                ))}
              </TraitsList>
            </SectionContent>
          </ProfileSection>

          <ProfileSection
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <SectionTitle>
              <SectionIcon>💕</SectionIcon>
              Совместимость
            </SectionTitle>
            <SectionContent>
              <div><strong>Высокая:</strong> {astroProfile.compatibility.high.join(', ')}</div>
              <div><strong>Сложная:</strong> {astroProfile.compatibility.low.join(', ')}</div>
            </SectionContent>
          </ProfileSection>

          <ProfileSection
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <SectionTitle>
              <SectionIcon>🍀</SectionIcon>
              Счастливые числа
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
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <SectionTitle style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            <SectionIcon>🌟</SectionIcon>
            Послание звезд
          </SectionTitle>
          <MessageText>{astroProfile.starMessage}</MessageText>
        </MessageSection>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile;