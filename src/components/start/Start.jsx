import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Animations for a gothic vibe
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotateY(0deg); }
  50% { transform: translateY(-15px) rotate(2deg); }
`;

const ghostlyFlicker = keyframes`
  0%, 100% { opacity: 0.3; filter: brightness(0.8); }
  25% { opacity: 1; filter: brightness(1.2); }
  50% { opacity: 0.2; filter: brightness(0.5); }
  75% { opacity: 0.9; filter: brightness(1.4); }
`;

const mysticalPulse = keyframes`
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px #8b5cf6); }
  50% { transform: scale(1.05); filter: drop-shadow(0 0 20px #c084fc); }
`;

const runicGlow = keyframes`
  0%, 100% { box-shadow: 0 0 8px rgba(139, 92, 246, 0.5); }
  50% { box-shadow: 0 0 15px rgba(192, 132, 252, 0.8); }
`;

const smokeRise = keyframes`
  0% { transform: translateY(100px) scale(0.8); opacity: 0; }
  50% { opacity: 0.6; }
  100% { transform: translateY(-200px) scale(1.2); opacity: 0; }
`;

const candleFlame = keyframes`
  0%, 100% { transform: scaleY(1) scaleX(1); }
  25% { transform: scaleY(1.1) scaleX(0.9); }
  50% { transform: scaleY(0.9) scaleX(1.1); }
  75% { transform: scaleY(1.05) scaleX(0.95); }
`;

const GlobalDatePickerStyles = createGlobalStyle`
  .react-datepicker {
    background: rgba(26, 11, 46, 0.8);
    backdrop-filter: blur(20px);
    border: 2px solid rgba(139, 92, 246, 0.5);
    border-radius: 12px;
    box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
    font-family: 'Spline Sans Mono', monospace;
    color: #ddd6fe;
  }

  .react-datepicker__header {
    background: linear-gradient(135deg, #6b21a8, #8b5cf6);
    border-bottom: 1px solid rgba(192, 132, 252, 0.3);
    padding: 1rem;
    border-radius: 10px 10px 0 0;
  }

  .react-datepicker__month-container {
    padding: 0.5rem;
  }

  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: #ddd6fe;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .react-datepicker__day {
    color: #a78bfa;
    width: 2rem;
    height: 2rem;
    line-height: 2rem;
    border-radius: 50%;
    margin: 0.2rem;
    transition: all 0.3s ease;
  }

  .react-datepicker__day:hover {
    background: rgba(139, 92, 246, 0.3);
    color: #c084fc;
    animation: ${ghostlyFlicker} 1s ease-in-out;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background: #8b5cf6;
    color: #ffffff;
    animation: ${runicGlow} 2s ease-in-out infinite;
  }

  .react-datepicker__day--outside-month {
    color: rgba(167, 139, 250, 0.3);
  }

  .react-datepicker__navigation {
    top: 1rem;
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
    cursor: pointer;
  }

  .react-datepicker__navigation--previous::before,
  .react-datepicker__navigation--next::before {
    content: '';
    display: block;
    width: 1rem;
    height: 1rem;
    border: 2px solid #c084fc;
    border-width: 2px 2px 0 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%) rotate(-45deg);
  }

  .react-datepicker__navigation--previous::before {
    left: 0.5rem;
    transform: translateY(-50%) rotate(-135deg);
  }

  .react-datepicker__navigation--next::before {
    right: 0.5rem;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__month {
    margin: 0;
  }

  .react-datepicker__month-text {
    color: #a78bfa;
    padding: 0.5rem;
    border-radius: 8px;
  }

  .react-datepicker__month-text:hover {
    background: rgba(139, 92, 246, 0.3);
    color: #c084fc;
  }

  .react-datepicker__month--selected {
    background: #8b5cf6;
    color: #ffffff;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #1a0b2e 0%, #0a0a0a 100%);
  overflow: hidden;
  position: relative;
  font-family: 'Spline Sans Mono', monospace;
  color: #ddd6fe;
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
    width: 40px;
    height: 40px;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent);
    border-radius: 50%;
    animation: ${smokeRise} 8s infinite linear;
    
    &:nth-child(1) { left: 10%; animation-delay: 0s; }
    &:nth-child(2) { left: 25%; animation-delay: 2s; }
    &:nth-child(3) { left: 75%; animation-delay: 4s; }
    &:nth-child(4) { left: 90%; animation-delay: 6s; }
  }
  
  .candle {
    position: absolute;
    bottom: 20%;
    width: 2px;
    height: 8px;
    background: linear-gradient(to top, #fbbf24, #f59e0b);
    animation: ${candleFlame} 2s ease-in-out infinite;
    filter: blur(0.5px);
    
    &:nth-child(5) { left: 5%; }
    &:nth-child(6) { right: 5%; }
  }
`;

const RunicCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 50%;
  z-index: 1;
  animation: ${float} 8s ease-in-out infinite;
  
  &::before {
    content: '⚹ ☾ ⚹ ☽';
    position: absolute;
    top: -10px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #8b5cf6;
    animation: ${ghostlyFlicker} 3s ease-in-out infinite;
    letter-spacing: 25px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    border: 1px solid rgba(192, 132, 252, 0.2);
    border-radius: 50%;
    animation: ${mysticalPulse} 4s ease-in-out infinite;
  }
`;

const Title = styled.h1`
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  font-size: 4.5rem;
  background: linear-gradient(to bottom, #ddd6fe 0%, #8b5cf6 50%, #c084fc 100%);
  -webkit-background-clip: text;
  color: transparent;
  background-clip: text;
  margin-bottom: 3rem;
  text-align: center;
  z-index: 2;
  letter-spacing: 0.1em;
  text-shadow: 0 0 10px rgba(139, 92, 246, 0.3);

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.3rem;
  font-weight: 300;
  color: #a78bfa;
  text-align: center;
  margin-bottom: 2rem;
  font-style: italic;
  z-index: 2;
  opacity: 0.8;
  letter-spacing: 0.05em;
  line-height: 1.5;
`;

const InputContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  background: rgba(26, 11, 46, 0.8);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(139, 92, 246, 0.3);
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(139, 92, 246, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.3);
  z-index: 2;
  min-width: 420px;
  padding: 3rem;
  position: relative;
  
  @media (max-width: 768px) {
    min-width: 320px;
    padding: 2rem;
  }
  
  &::before {
    content: '✦';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
    color: #8b5cf6;
    animation: ${mysticalPulse} 2s ease-in-out infinite;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const Input = styled.input`
  padding: 1.2rem 1.8rem;
  font-size: 1.1rem;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 400;
  border: 2px solid rgba(139, 92, 246, 0.4);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.6);
  color: #ddd6fe;
  outline: none;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  
  &::placeholder {
    color: rgba(221, 214, 254, 0.5);
    font-style: italic;
  }

  &:focus {
    border-color: #8b5cf6;
    background: rgba(26, 11, 46, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.2);
    animation: ${mysticalPulse} 1s ease-in-out;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  padding: 1.2rem 1.8rem;
  font-size: 1.1rem;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 400;
  border: 2px solid rgba(139, 92, 246, 0.4);
  border-radius: 12px;
  background: rgba(0,0,0,1.2);
  color: #ffffff;
  outline: none;
  transition: all 0.4s ease;
  backdrop-filter: blur(10px);
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(221, 214, 254, 0.5);
    font-style: italic;
  }

  &:focus {
    border-color: #8b5cf6;
    background: rgba(26, 11, 46, 0.8);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.2);
    animation: ${mysticalPulse} 1s ease-in-out;
  }
`;

const SubmitButton = styled(motion.button)`
  margin-top: 1.5rem;
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

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(139, 92, 246, 0.6);
    background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
    animation: ${mysticalPulse} 0.5s ease-in-out;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  &::before {
    content: '☾';
    font-size: 18px;
    animation: ${ghostlyFlicker} 2s ease-in-out infinite;
  }
  
  &::after {
    content: '☽';
    font-size: 18px;
    animation: ${ghostlyFlicker} 2s ease-in-out infinite reverse;
  }
`;

const ErrorMessage = styled(motion.p)`
  color: #ef4444;
  font-size: 1rem;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 400;
  text-align: center;
  margin: 0;
  background: rgba(239, 68, 68, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(239, 68, 68, 0.3);
  letter-spacing: 0.05em;
`;

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, #1a0b2e 0%, #0a0a0a 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const CrystalBall = styled.div`
  width: 220px;
  height: 220px;
  position: relative;
  margin-bottom: 3rem;
  
  .orb {
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 30%, rgba(192, 132, 252, 0.4), rgba(139, 92, 246, 0.2), rgba(26, 11, 46, 0.8));
    border-radius: 50%;
    position: relative;
    animation: ${mysticalPulse} 3s ease-in-out infinite;
    box-shadow: 0 0 50px rgba(139, 92, 246, 0.5), inset 0 0 30px rgba(0, 0, 0, 0.3);
    
    &::before {
      content: '';
      position: absolute;
      top: 20%;
      left: 25%;
      width: 40px;
      height: 40px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      filter: blur(10px);
      animation: ${ghostlyFlicker} 2s ease-in-out infinite;
    }
    
    &::after {
      content: '☆ ✦ ☆ ✧ ☆';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #c084fc;
      font-size: 14px;
      animation: ${float} 4s ease-in-out infinite;
      letter-spacing: 8px;
    }
  }
  
  .rune {
    position: absolute;
    color: #8b5cf6;
    font-size: 18px;
    animation: ${ghostlyFlicker} 2s ease-in-out infinite;
    
    &:nth-child(2) { top: 5%; left: 45%; content: '☽'; animation-delay: 0.2s; }
    &:nth-child(3) { top: 25%; right: 10%; content: '⚹'; animation-delay: 0.4s; }
    &:nth-child(4) { bottom: 25%; right: 10%; content: '☾'; animation-delay: 0.6s; }
    &:nth-child(5) { bottom: 5%; left: 45%; content: '✦'; animation-delay: 0.8s; }
    &:nth-child(6) { top: 25%; left: 10%; content: '☆'; animation-delay: 1s; }
    &:nth-child(7) { bottom: 25%; left: 10%; content: '✧'; animation-delay: 1.2s; }
  }
`;

const LoadingText = styled(motion.h2)`
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 500;
  font-size: 2rem;
  color: #ddd6fe;
  text-align: center;
  animation: ${mysticalPulse} 2s ease-in-out infinite;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const LoadingSubtext = styled(motion.p)`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.1rem;
  font-weight: 300;
  color: #a78bfa;
  text-align: center;
  font-style: italic;
  margin-top: 1rem;
  opacity: 0.8;
  letter-spacing: 0.05em;
`;

const Start = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = birthDate ? new Date(birthDate) : null;
    if (!name.trim()) {
      setError('Reveal thy name to the stars');
      return;
    }
    if (!birthDate || !date || isNaN(date.getTime())) {
      setError('Reveal thy birth date');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/profile', { state: { name, birthDate: date.toISOString() } });
    }, 4000);
  };

  return (
    <>
      <GlobalDatePickerStyles />
      <Container>
        <MysticalBackground>
          <div className="smoke"></div>
          <div className="smoke"></div>
          <div className="smoke"></div>
          <div className="smoke"></div>
          <div className="candle"></div>
          <div className="candle"></div>
        </MysticalBackground>

        <RunicCircle />

        <Title>
          Mystical Codex
        </Title>

        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Unveil the secrets written in the stars
        </Subtitle>

        <InputContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Whisper your name to the cosmos..."
                required
                aria-label="Enter your name"
              />
              <StyledDatePicker
                selected={birthDate}
                onChange={(date) => setBirthDate(date)}
                placeholderText="Choose thy birth date..."
                dateFormat="yyyy-MM-dd"
                required
                aria-label="Select your birth date"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
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
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={!name || !birthDate}
            >
              Invoke the Oracle
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
            <CrystalBall>
              <div className="orb"></div>
              <div className="rune">☽</div>
              <div className="rune">⚹</div>
              <div className="rune">☾</div>
              <div className="rune">✦</div>
              <div className="rune">☆</div>
              <div className="rune">✧</div>
            </CrystalBall>
            <LoadingText
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Consulting the Ancient Wisdom
            </LoadingText>
            <LoadingSubtext
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              The celestial spirits are aligning your destiny...
            </LoadingSubtext>
          </LoadingOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default Start;