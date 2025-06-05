import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';

// Анимации
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  overflow: hidden;
  position: relative;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #ffffff;
`;

const StarField = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    animation: ${sparkle} 2s infinite;
  }
  
  &::before {
    top: 20%;
    left: 15%;
    animation-delay: 0s;
  }
  
  &::after {
    top: 60%;
    right: 20%;
    animation-delay: 1s;
  }
`;

const FloatingParticles = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    animation: ${float} 6s ease-in-out infinite;
    
    &:nth-child(1) { top: 10%; left: 10%; animation-delay: 0s; }
    &:nth-child(2) { top: 30%; left: 80%; animation-delay: 1s; }
    &:nth-child(3) { top: 70%; left: 20%; animation-delay: 2s; }
    &:nth-child(4) { top: 50%; left: 60%; animation-delay: 3s; }
    &:nth-child(5) { top: 80%; left: 70%; animation-delay: 4s; }
  }
`;

const Title = styled(motion.h1)`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 3.2rem;
  background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 3rem;
  text-align: center;
  z-index: 2;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const InputContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  z-index: 2;
  min-width: 400px;
  
  @media (max-width: 768px) {
    min-width: 320px;
    padding: 2rem;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const Input = styled.input`
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 16px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled(motion.p)`
  color: #ff6b6b;
  font-size: 0.9rem;
  text-align: center;
  margin: 0;
  background: rgba(255, 107, 107, 0.1);
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
`;

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const GalaxyAnimation = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  margin-bottom: 2rem;
  
  .galaxy {
    width: 100%;
    height: 100%;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    position: absolute;
    animation: ${rotate} 10s linear infinite;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 150px;
      height: 150px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: ${rotate} 8s linear infinite reverse;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 100px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: ${sparkle} 2s ease-in-out infinite;
    }
  }
  
  .star {
    position: absolute;
    width: 3px;
    height: 3px;
    background: white;
    border-radius: 50%;
    animation: ${sparkle} 1.5s ease-in-out infinite;
    
    &:nth-child(2) { top: 20%; left: 30%; animation-delay: 0.2s; }
    &:nth-child(3) { top: 70%; left: 20%; animation-delay: 0.4s; }
    &:nth-child(4) { top: 80%; right: 30%; animation-delay: 0.6s; }
    &:nth-child(5) { top: 30%; right: 20%; animation-delay: 0.8s; }
  }
`;

const LoadingText = styled(motion.h2)`
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.5rem;
  color: #ffffff;
  text-align: center;
`;

const Start = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date(birthDate);
    if (!name.trim()) {
      setError('Пожалуйста, введите ваше имя');
      return;
    }
    if (!birthDate || isNaN(date.getTime())) {
      setError('Пожалуйста, введите корректную дату рождения');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      navigate('/profile', { state: { name, birthDate } });
    }, 3000);
  };

  return (
    <>
      <Container>
        <StarField />
        <FloatingParticles>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </FloatingParticles>

        <Title
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          AstroProfile
        </Title>

        <InputContainer
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите ваше имя"
                required
              />
              <Input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </InputGroup>

            <AnimatePresence>
              {error && (
                <ErrorMessage
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {error}
                </ErrorMessage>
              )}
            </AnimatePresence>

            <SubmitButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={!name || !birthDate}
            >
              <StarIcon />
              Узнать мой профиль
            </SubmitButton>
          </form>
        </InputContainer>
      </Container>

      <AnimatePresence>
        {isLoading && (
          <LoadingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <GalaxyAnimation>
              <div className="galaxy"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
            </GalaxyAnimation>
            <LoadingText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Анализируем звезды...
            </LoadingText>
          </LoadingOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Start;