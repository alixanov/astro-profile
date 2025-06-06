import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import XIcon from '@mui/icons-material/X';

// Animations
const float = keyframes`
  0%, 100% { transform: translateY(0) rotateY(0deg); }
  50% { transform: translateY(-20px) rotate(2deg); }
`;

const ghostlyFlicker = keyframes`
  0%, 100% { opacity: 0.4; filter: brightness(0.7); }
  25% { opacity: 1; filter: brightness(1); }
  50% { opacity: 0.3; filter: brightness(0.5); }
  75% { opacity: 0.7; filter: brightness(0.8); }
`;

const mysticalPulse = keyframes`
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 10px #7c3aed); }
  50% { transform: scale(1.05); filter: drop-shadow(0 0 20px #a855f7); }
`;

const runicGlow = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(124, 58, 237, 0.5); }
  50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.8); }
`;

const smokeRise = keyframes`
  0% { transform: translateY(100px) scale(0.8); opacity: 0; }
  50% { opacity: 0.4; }
  100% { transform: translateY(-200px) scale(1.2); opacity: 0; }
`;

const candleFlame = keyframes`
  0%, 100% { transform: scaleY(1) scaleX(1); }
  25% { transform: scaleY(1.1) scaleX(0.9); }
  50% { transform: scaleY(0.9) scaleX(1.1); }
  75% { transform: scaleY(1.05) scaleX(0.95); }
`;

const starTwinkle = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const nebulaFlow = keyframes`
  0% { transform: translateX(-100%) rotate(0deg); opacity: 0; }
  50% { opacity: 0.8; }
  100% { transform: translateX(100%) rotate(360deg); opacity: 0; }
`;

const planetOrbit = keyframes`
  0% { transform: rotate(0deg) translateX(150px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
`;

const shootingStar = keyframes`
  0% { transform: translateX(-100vw) translateY(100vh) rotate(45deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(100vw) translateY(-100vh) rotate(45deg); opacity: 0; }
`;

const cosmicPulse = keyframes`
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 20px #4c1d95) drop-shadow(0 0 40px #7c3aed); }
  50% { transform: scale(1.2); filter: drop-shadow(0 0 40px #8b5cf6) drop-shadow(0 0 80px #c084fc); }
`;

const zodiacGlow = keyframes`
  0%, 100% { opacity: 0.7; text-shadow: 0 0 5px #8b5cf6; }
  50% { opacity: 1; text-shadow: 0 0 15px #c084fc; }
`;

const stardustSparkle = keyframes`
  0% { transform: scale(0) translate(0, 0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: scale(1.3) translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px); opacity: 0; }
`;

const supernovaBurst = keyframes`
  0% { transform: scale(1); opacity: 1; filter: brightness(1); }
  50% { transform: scale(1.4); opacity: 0.9; filter: brightness(1.8); }
  100% { transform: scale(1.8); opacity: 0; filter: brightness(0); }
`;

const constellationFade = keyframes`
  0% { opacity: 0; transform: scale(0.9); }
  50% { opacity: 0.5; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.1); }
`;

// Styled Components
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(ellipse at center, #1e0b3a 0%, #0a001a 100%);
  overflow: hidden;
  position: relative;
  font-family: 'Spline Sans Mono', monospace;
  color: #e0d7ff;

  @media (max-width: 767px) {
    padding: 1rem;
  }
`;

const CosmicBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 70%);
`;

const Constellation = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M10 90 L40 60 L90 80 L60 20 L20 50 Z" fill="none" stroke="rgba(168, 85, 247, 0.3)" stroke-width="1"/></svg>');
  animation: ${constellationFade} 8s ease-in-out infinite;
  opacity: 0.4;

  @media (max-width: 767px) {
    width: 60px;
    height: 60px;
  }
`;

const Smoke = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent);
  border-radius: 50%;
  animation: ${smokeRise} 10s infinite linear;

  @media (max-width: 767px) {
    width: 30px;
    height: 30px;
  }
`;

const Candle = styled.div`
  position: absolute;
  bottom: 15%;
  width: 3px;
  height: 10px;
  background: linear-gradient(to top, #f59e0b, #fef08a);
  animation: ${candleFlame} 1.5s ease-in-out infinite;
  filter: blur(0.7px);
  box-shadow: 0 0 15px #f59e0b;

  @media (max-width: 767px) {
    height: 8px;
  }
`;

const RunicCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 450px;
  border: 2px solid rgba(168, 85, 247, 0.4);
  border-radius: 50%;
  z-index: 1;
  animation: ${float} 10s ease-in-out infinite;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.1), transparent);

  &::before {
    content: '☽ ✧ ⚸ ✧ ☾';
    position: absolute;
    top: -15px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #a855f7;
    animation: ${ghostlyFlicker} 2.5s ease-in-out infinite;
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
    border: 1px solid rgba(168, 85, 247, 0.3);
    border-radius: 50%;
    animation: ${mysticalPulse} 5s ease-in-out infinite;
  }

  @media (max-width: 767px) {
    width: 250px;
    height: 250px;

    &::before {
      font-size: 12px;
      letter-spacing: 20px;
      top: -10px;
    }

    &::after {
      width: 150px;
      height: 150px;
    }
  }
`;

const Title = styled(motion.h1)`
    font-family: 'Spline Sans Mono', monospace;
  font-weight: 700;
  font-size: 4.5rem;
  background: linear-gradient(to bottom, #e0d7ff 0%, #7c3aed 50%, #c084fc 100%);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 2.5rem;
  text-align: center;
  z-index: 2;
  letter-spacing: 0.15em;
  text-shadow: 0 0 15px rgba(124, 58, 237, 0.5), 0 0 30px rgba(168, 85, 247, 0.3);
  animation: ${cosmicPulse} 6s ease-in-out infinite;

  @media (max-width: 767px) {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.3rem;
  font-weight: 400;
  color: #c084fc;
  text-align: center;
  margin-bottom: 3rem;
  font-style: italic;
  z-index: 2;
  opacity: 0.9;
  letter-spacing: 0.1em;
  line-height: 1.6;
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.3);

  @media (max-width: 767px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

const InputContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  background: rgba(30, 11, 58, 0.85);
  backdrop-filter: blur(25px);
  border: 2px solid rgba(168, 85, 247, 0.4);
  border-radius: 25px;
  box-shadow: 0 0 40px rgba(124, 58, 237, 0.3), inset 0 0 25px rgba(0, 0, 0, 0.4);
  z-index: 2;
  width: 450px;
  padding: 3.5rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '✧';
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    color: #a855f7;
    animation: ${mysticalPulse} 1.8s ease-in-out infinite;
  }

  @media (max-width: 767px) {
    width: 90vw;
    max-width: 350px;
    padding: 2rem;
    gap: 1.5rem;

    &::before {
      font-size: 18px;
      top: -10px;
    }
  }
`;

const Stardust = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background: #e0d7ff;
  border-radius: 50%;
  animation: ${stardustSparkle} 2s ease-in-out infinite;
  z-index: 1;
`;

const Form = styled.form`
  width: 100%;
  position: relative;
  z-index: 2;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;

  @media (max-width: 767px) {
    gap: 1.5rem;
  }
`;

const Input = styled.input`
  padding: 1.3rem 2rem;
  font-size: 1.2rem;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 400;
  border: 2px solid rgba(168, 85, 247, 0.5);
  border-radius: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: #e0d7ff;
  outline: none;
  transition: all 0.5s ease;
  backdrop-filter: blur(15px);
  box-shadow: 0 0 15px rgba(124, 58, 237, 0.2);
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border-color: #a855f7;
    background: rgba(30, 11, 58, 0.9);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(168, 85, 247, 0.4), 0 0 25px rgba(124, 58, 237, 0.3);
  }

  @media (max-width: 767px) {
    padding: 1rem 1.5rem;
    font-size: 1rem;
  }
`;

const DateInput = styled(Input)`
  cursor: pointer;
`;

const CalendarOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const CalendarModal = styled(motion.div)`
  position: fixed;
  top: 40%;
  left: 60%;
  transform: translate(-50%, -50%);
  background: rgba(30, 11, 58, 0.95);
  border: 1px solid rgba(168, 85, 247, 0.5);
  border-radius: 10px;
  z-index: 1000;
  padding: 1rem;
  width: 300px;
  max-height: 70vh;
  overflow-y: auto;

  @media (max-width: 767px) {
    width: 90vw;
    max-width: 280px;
    padding: 0.8rem;
    top: 35%;
    left: 50%;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #6d238a, #a855f7);
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 0.8rem;
  color: #e0d7ff;
  font-weight: bold;

  @media (max-width: 767px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const CalendarButton = styled(motion.button)`
  background: none;
  border: none;
  color: #e0d7ff;
  cursor: pointer;
  font-size: 1rem;

  @media (max-width: 767px) {
    font-size: 0.9rem;
  }
`;

const DayHeaders = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3rem;
  margin-bottom: 0.5rem;

  div {
    text-align: center;
    color: #c084fc;
    font-size: 0.8rem;
  }

  @media (max-width: 767px) {
    div {
      font-size: 0.7rem;
    }
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.3rem;
`;

const DayButton = styled(motion.button)`
  padding: 0.5rem;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #e0d7ff;
  cursor: pointer;
  font-size: 0.8rem;

  @media (max-width: 767px) {
    padding: 0.4rem;
    font-size: 0.7rem;
  }
`;

const CloseButton = styled(motion.button)`
  padding: 0.4rem 1rem;
  background: linear-gradient(135deg, #6d238a, #a855f7);
  border: none;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  font-size: 0.8rem;

  @media (max-width: 767px) {
    padding: 0.3rem 0.8rem;
    font-size: 0.7rem;
  }
`;

const ErrorMessage = styled(motion.p)`
  color: #f87171;
  font-size: 1.1rem;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 400;
  text-align: center;
  margin: 1.2rem 0 0 0;
  background: rgba(248, 113, 113, 0.15);
  padding: 1.2rem 1.8rem;
  border-radius: 15px;
  letter-spacing: 0.1em;
  box-shadow: 0 0 15px rgba(248, 113, 113, 0.2);

  @media (max-width: 767px) {
    font-size: 0.9rem;
    padding: 1rem 1.5rem;
    margin: 1rem 0 0 0;
  }
`;

const SubmitButton = styled(motion.button)`
  margin-top: 2rem;
  padding: 1.3rem 2.5rem;
  height: 65px;
  font-size: 1.3rem;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 600;
  background: linear-gradient(135deg, #6d238a 0%, #a855f7 50%, #c084fc 100%);
  border: 2px solid rgba(168, 85, 247, 0.5);
  border-radius: 15px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: all 0.5s ease;
  box-shadow: 0 5px 20px rgba(168, 85, 247, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  width: 100%;
  position: relative;
  overflow: hidden;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:enabled {
    transform: translateY(-4px);
    box-shadow: 0 10px 40px rgba(168, 85, 247, 0.7);
    background: linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e0d7ff 100%);
    animation: ${mysticalPulse} 0.6s ease-in-out;
  }

  span {
    animation: ${ghostlyFlicker} 1.8s ease-in-out infinite;
  }

  span:last-child {
    animation-direction: reverse;
  }

  @media (max-width: 767px) {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    margin-top: 1.5rem;
    height: 45px;
  }
`;

const FollowButton = styled(motion.a)`
  margin-top: 2rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-family: 'Spline Sans Mono', monospace;
  font-weight: 400;
  background: linear-gradient(135deg, #6d238a 0%, #a855f7 50%, #c084fc 100%);
  border: 2px solid rgba(168, 85, 247, 0.5);
  border-radius: 15px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.5s ease;
  box-shadow: 0 5px 20px rgba(168, 85, 247, 0.5);
  letter-spacing: 0.1em;
  text-decoration: none;
  z-index: 2;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 40px rgba(168, 85, 247, 0.7);
    background: linear-gradient(135deg, #a855f7 0%, #c084fc 50%, #e0d7ff 100%);
    animation: ${mysticalPulse} 0.6s ease-in-out;
  }

  svg {
    animation: ${ghostlyFlicker} 1.8s ease-in-out infinite;
    font-size: 1.2rem;
  }

  @media (max-width: 767px) {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    margin-top: 1.5rem;

    svg {
      font-size: 1rem;
    }
  }
`;

const LoadingScreen = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at center, #12022e 0%, #040010 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
`;

const Spiral = styled.div`
  position: relative;
  width: 350px;
  height: 350px;
  animation: ${cosmicPulse} 5s ease-in-out infinite;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.2), transparent);
  border-radius: 50%;
  transform: rotate(45deg);

  @media (max-width: 767px) {
    width: 250px;
    height: 250px;
  }
`;

const Star = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 50%;
  animation: ${starTwinkle} 2.5s ease-in-out infinite;
  box-shadow: 0 0 10px currentColor;
  z-index: 1;

  @media (max-width: 767px) {
    width: 3px;
    height: 3px;
  }
`;

const Nebula = styled.div`
  position: absolute;
  width: 450px;
  height: 250px;
  background: radial-gradient(ellipse, rgba(124, 58, 237, 0.5), transparent);
  border-radius: 50%;
  animation: ${nebulaFlow} 12s linear infinite;
  filter: blur(25px);
  z-index: 2;

  @media (max-width: 767px) {
    width: 300px;
    height: 150px;
  }
`;

const Planet = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle at 30% 30%, #7c3aed, #4c1d95);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${planetOrbit} 10s linear infinite;
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.6);
  z-index: 3;

  @media (max-width: 767px) {
    width: 30px;
    height: 30px;
  }
`;

const PlanetRing = styled.div`
  position: absolute;
  width: 60px;
  height: 10px;
  background: rgba(168, 85, 247, 0.3);
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.4);

  @media (max-width: 767px) {
    width: 45px;
    height: 8px;
  }
`;

const ShootingStar = styled.div`
  position: absolute;
  width: 3px;
  height: 80px;
  background: linear-gradient(to bottom, transparent, #e0d7ff, transparent);
  animation: ${shootingStar} 4s linear infinite;
  filter: blur(0.7px);
  z-index: 4;

  @media (max-width: 767px) {
    height: 60px;
  }
`;

const ZodiacSymbol = styled.div`
  position: absolute;
  color: #c084fc;
  font-size: 28px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(0deg) translateY(150px);
  animation: ${zodiacGlow} 4s ease-in-out infinite;
  text-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
  z-index: 5;

  @media (max-width: 767px) {
    font-size: 20px;
    transform: translate(-50%, -50%) rotate(0deg) translateY(100px);
  }
`;

const LoadingTitle = styled(motion.h2)`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 2.5rem;
  color: #e0d7ff;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  z-index: 6;
  animation: ${mysticalPulse} 2.5s ease-in-out infinite;

  @media (max-width: 767px) {
    font-size: 1.8rem;
  }
`;

const LoadingSubtitle = styled(motion.p)`
  font-family: 'Spline Sans Mono', monospace;
  font-size: 1.4rem;
  font-weight: 300;
  color: #c084fc;
  text-align: center;
  font-style: italic;
  margin-top: 1.2rem;
  opacity: 0.9;
  letter-spacing: 0.1em;
  z-index: 6;
  text-shadow: 0 0 10px rgba(168, 85, 247, 0.3);

  @media (max-width: 767px) {
    font-size: 1.1rem;
    margin-top: 1rem;
  }
`;

const Start = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name to unlock the stars');
      return;
    }
    if (!birthDate) {
      setError('Select your birth date to align with the cosmos');
      return;
    }
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/profile', { state: { name, birthDate } });
    }, 3000);
  };

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        weekDays.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      days.push(weekDays);
    }

    return days;
  };

  const selectDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    setBirthDate(formattedDate);
    setShowCalendar(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const changeMonth = (delta) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const calendar = generateCalendar();
  const today = new Date();

  return (
    <Container>
      <CosmicBackground>
        {[...Array(4)].map((_, i) => (
          <Constellation
            key={`constellation-${i}`}
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
        {[...Array(3)].map((_, i) => (
          <Smoke
            key={`smoke-${i}`}
            style={{
              left: `${10 + i * 20}%`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
        {[...Array(3)].map((_, i) => (
          <Candle
            key={`candle-${i}`}
            style={{
              [i === 0 ? 'left' : i === 1 ? 'right' : 'left']: `${5 + i * 40}%`,
            }}
          />
        ))}
      </CosmicBackground>

      <RunicCircle />

      <Title
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        AstroProfile
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        Unveil the mysteries written in the stars
      </Subtitle>

      <InputContainer
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        {[...Array(6)].map((_, i) => (
          <Stardust
            key={`stardust-${i}`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}

        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Whisper your name to the cosmos..."
              required
              aria-label="Enter your name"
            />

            <DateInput
              type="text"
              value={birthDate ? formatDate(birthDate) : ''}
              onClick={() => setShowCalendar(!showCalendar)}
              placeholder="Choose your birth date..."
              readOnly
              aria-label="Select your birth date"
            />
          </InputWrapper>

          <AnimatePresence>
            {error && (
              <ErrorMessage
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                {error}
              </ErrorMessage>
            )}
          </AnimatePresence>

          <SubmitButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={!name || !birthDate}
            onClick={(e) => {
              if (name && birthDate) {
                const burst = document.createElement('div');
                burst.style.position = 'absolute';
                burst.style.width = '100px';
                burst.style.height = '100px';
                burst.style.background = 'radial-gradient(circle, rgba(224, 215, 255, 0.8), transparent)';
                burst.style.borderRadius = '50%';
                burst.style.top = '50%';
                burst.style.left = '50%';
                burst.style.transform = 'translate(-50%, -50%)';
                burst.style.animation = 'supernovaBurst 1s ease-out';
                e.target.appendChild(burst);
                setTimeout(() => burst.remove(), 1000);
              }
            }}
            aria-label="Submit form"
          >
            <span>☽</span>
            Invoke the Oracle
            <span>☾</span>
          </SubmitButton>
        </Form>
      </InputContainer>

      <FollowButton
        href="https://x.com/home"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Follow us on X"
      >
        <XIcon />
        Follow Us
      </FollowButton>

      <AnimatePresence>
        {showCalendar && (
          <>
            <CalendarOverlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCalendar(false)}
            />

            <CalendarModal
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
            >
              <CalendarHeader>
                <CalendarButton whileHover={{ scale: 1.1 }} onClick={() => changeMonth(-1)}>
                  &lt;
                </CalendarButton>
                <span>{monthNames[currentMonth]} {currentYear}</span>
                <CalendarButton whileHover={{ scale: 1.1 }} onClick={() => changeMonth(1)}>
                  &gt;
                </CalendarButton>
              </CalendarHeader>

              <DayHeaders>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </DayHeaders>

              <CalendarGrid>
                {calendar.flat().map((date, index) => {
                  const isCurrentMonth = date.getMonth() === currentMonth;
                  const isToday = date.toDateString() === today.toDateString();
                  const isSelected = birthDate && date.toISOString().split('T')[0] === birthDate;

                  return (
                    <DayButton
                      key={index}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => selectDate(date)}
                      style={{
                        background: isSelected
                          ? '#a855f7'
                          : isToday
                            ? 'rgba(168, 85, 247, 0.4)'
                            : 'transparent',
                        color: isSelected
                          ? '#ffffff'
                          : isCurrentMonth
                            ? '#e0d7ff'
                            : 'rgba(224, 215, 255, 0.4)',
                      }}
                    >
                      {date.getDate()}
                    </DayButton>
                  );
                })}
              </CalendarGrid>

              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <CloseButton
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setShowCalendar(false)}
                >
                  Close
                </CloseButton>
              </div>
            </CalendarModal>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Spiral>
              {[...Array(40)].map((_, i) => (
                <Star
                  key={`star-${i}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    background: ['#ffffff', '#c084fc', '#a855f7', '#e0d7ff', '#7c3aed'][Math.floor(Math.random() * 5)],
                  }}
                />
              ))}
              {[...Array(3)].map((_, i) => (
                <Nebula
                  key={`nebula-${i}`}
                  style={{
                    animationDelay: `${i * 2.5}s`,
                    top: `${15 + i * 25}%`,
                    left: '-60%',
                    background: `radial-gradient(ellipse, rgba(${124 + i * 30}, ${58 + i * 40}, ${237 - i * 30}, 0.5), transparent)`,
                  }}
                />
              ))}
              {[...Array(3)].map((_, i) => (
                <Planet
                  key={`planet-${i}`}
                  style={{
                    animationDelay: `${i * 1.5}s`,
                    animationDuration: `${10 + i * 3}s`,
                    background: `radial-gradient(circle at 30% 30%, #${i === 0 ? '7c3aed' : i === 1 ? 'c084fc' : 'e0d7ff'}, #${i === 0 ? '4c1d95' : i === 1 ? 'a855f7' : 'e0d7ff'})`,
                  }}
                >
                  {i === 1 && <PlanetRing />}
                </Planet>
              ))}
              {[...Array(3)].map((_, i) => (
                <ShootingStar
                  key={`shooting-star-${i}`}
                  style={{
                    animationDelay: `${i * 1.2}s`,
                    animationDuration: `${Math.random() * 3 + 4}s`,
                    top: `${Math.random() * 60}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                />
              ))}
              {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((symbol, i) => (
                <ZodiacSymbol
                  key={`zodiac-${i}`}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(150px) rotate(-${i * 30}deg)`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  {symbol}
                </ZodiacSymbol>
              ))}
            </Spiral>

            <LoadingTitle
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Cosmic Journey
            </LoadingTitle>

            <LoadingSubtitle
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              Your stellar path is being woven...
            </LoadingSubtitle>
          </LoadingScreen>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Start;