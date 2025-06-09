import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import XIcon from '@mui/icons-material/X';
import EffectVideo from "../../video/216794.mp4"; // Make sure this path is correct

// Register GSAP plugin
gsap.registerPlugin(MotionPathPlugin);

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

const cosmicPulse = keyframes`
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 20px #4c1d95) drop-shadow(0 0 40px #7c3aed); }
  50% { transform: scale(1.2); filter: drop-shadow(0 0 40px #8b5cf6) drop-shadow(0 0 80px #c084fc); }
`;

// Styled Components
const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: radial-gradient(ellipse at center, rgb(8, 1, 18) 0%, #0a001a 100%);
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
  background: radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.2) 0%, transparent 70%);
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
  background: radial-gradient(circle, rgba(124, 58, 237, 0.15), transparent);

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
  left: 50%;
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
  left: 15%;
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

const TextContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 3rem;
  background: rgba(30, 11, 58, 0);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  z-index: 1002;
  position: relative;

  &::before {
    content: '✧ ☽ ✧';
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    color: #a855f7;
    animation: ${ghostlyFlicker} 2s ease-in-out infinite;
    letter-spacing: 10px;
  }

  @media (max-width: 767px) {
    padding: 1.5rem 2rem;
    gap: 0.8rem;

    &::before {
      font-size: 14px;
      top: -15px;
      letter-spacing: 8px;
    }
  }
`;

const LoadingTitle = styled(motion.h2)`
  font-family: 'Spline Sans Mono', monospace, monospace;
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(#0c1345,#0c1345,#0c1345);
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
  letter-spacing: 0.1em;
  animation: ${mysticalPulse} 4s ease-in-out infinite;

  @media (max-width: 767px) {
    font-size: 2rem;
  }
`;

const LoadingSubtitle = styled(motion.p)`
  font-family: 'Spline Sans Mono', monospace, monospace;
  font-size: 1.8rem;
  font-weight: 400;
background: linear-gradient(rgb(1, 6, 41), rgb(34, 50, 120));
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
  font-style: italic;
  letter-spacing: 0.08em;
  line-height: 1.5;
  animation: ${ghostlyFlicker} 3s ease-in-out infinite;

  @media (max-width: 767px) {
    font-size: 1.2rem;
  }
`;

const VideoOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1000;
  will-change: opacity;
`;

const Start = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);
  const hasNavigatedRef = useRef(false);

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
    setShowVideo(true);
  };

  useEffect(() => {
    if (showVideo && videoRef.current && !hasNavigatedRef.current) {
      videoRef.current.play().catch((err) => {
        console.error('Video playback failed:', err);
      });

      timeoutRef.current = setTimeout(() => {
        if (!hasNavigatedRef.current) {
          hasNavigatedRef.current = true;
          setShowVideo(false);
          navigate('/profile', { state: { name, birthDate } });
        }
      }, 10000);

      videoRef.current.onended = () => {
        if (!hasNavigatedRef.current) {
          hasNavigatedRef.current = true;
          clearTimeout(timeoutRef.current);
          setShowVideo(false);
          navigate('/profile', { state: { name, birthDate } });
        }
      };
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (videoRef.current) {
        videoRef.current.onended = null;
      }
    };
  }, [showVideo, name, birthDate, navigate]);

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
      <CosmicBackground id="cosmic-background">
        {[...Array(4)].map((_, i) => (
          <div
            key={`constellation-${i}`}
            style={{
              position: 'absolute',
              width: '100px',
              height: '100px',
              background: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M10 90 L40 60 L90 80 L60 20 L20 50 Z" fill="none" stroke="rgba(168, 85, 247, 0.3)" stroke-width="1"/></svg>')`,
              opacity: 0.4,
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
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

      <AnimatePresence mode="wait">
        {showVideo && (
          <VideoOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <StyledVideo ref={videoRef} src={EffectVideo} autoPlay muted playsInline />
            <TextContainer
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              <LoadingTitle
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
              >
                Cosmic Journey
              </LoadingTitle>
              <LoadingSubtitle
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
              >
                Your stellar path is being woven...
              </LoadingSubtitle>
            </TextContainer>
          </VideoOverlay>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Start;