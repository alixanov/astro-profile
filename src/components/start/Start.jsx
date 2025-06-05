import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Animations for a gothic vibe
const float = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotateY(0deg); }
    50% { transform: translateY(-15px) rotate(2deg); }
  }
`;

const ghostlyFlicker = `
  @keyframes ghostlyFlicker {
    0%, 100% { opacity: 0.3; filter: brightness(0.8); }
    25% { opacity: 1; filter: brightness(1.2); }
    50% { opacity: 0.2; filter: brightness(0.5); }
    75% { opacity: 0.9; filter: brightness(1.4); }
  }
`;

const mysticalPulse = `
  @keyframes mysticalPulse {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 8px #8b5cf6); }
    50% { transform: scale(1.05); filter: drop-shadow(0 0 20px #c084fc); }
  }
`;

const runicGlow = `
  @keyframes runicGlow {
    0%, 100% { box-shadow: 0 0 8px rgba(139, 92, 246, 0.5); }
    50% { box-shadow: 0 0 15px rgba(192, 132, 252, 0.8); }
  }
`;

const smokeRise = `
  @keyframes smokeRise {
    0% { transform: translateY(100px) scale(0.8); opacity: 0; }
    50% { opacity: 0.6; }
    100% { transform: translateY(-200px) scale(1.2); opacity: 0; }
  }
`;

const candleFlame = `
  @keyframes candleFlame {
    0%, 100% { transform: scaleY(1) scaleX(1); }
    25% { transform: scaleY(1.1) scaleX(0.9); }
    50% { transform: scaleY(0.9) scaleX(1.1); }
    75% { transform: scaleY(1.05) scaleX(0.95); }
  }
`;

const Start = () => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Reveal your name to the stars');
      return;
    }
    if (!birthDate) {
      setError('Select your birth date from the celestial calendar');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/profile', { state: { name, birthDate } });
    }, 4000);
  };

  const generateCalendar = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const calendar = [];
    const current = new Date(startDate);

    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        weekDays.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
      calendar.push(weekDays);
    }

    return calendar;
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
      day: 'numeric'
    });
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calendar = generateCalendar();
  const today = new Date();

  return (
    <>
      <style>{`
        ${float}
        ${ghostlyFlicker}
        ${mysticalPulse}
        ${runicGlow}
        ${smokeRise}
        ${candleFlame}
      `}</style>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at center, #1a0b2e 0%, #0a0a0a 100%)',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'Spline Sans Mono, monospace',
        color: '#ddd6fe',
      }}>
        {/* Mystical Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}>
          {[...Array(4)].map((_, i) => (
            <div
              key={`smoke-${i}`}
              style={{
                position: 'absolute',
                width: '40px',
                height: '40px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)',
                borderRadius: '50%',
                animation: `smokeRise 8s infinite linear`,
                animationDelay: `${i * 2}s`,
                left: `${10 + i * 25}%`
              }}
            />
          ))}

          {[...Array(2)].map((_, i) => (
            <div
              key={`candle-${i}`}
              style={{
                position: 'absolute',
                bottom: '20%',
                [i === 0 ? 'left' : 'right']: '5%',
                width: '2px',
                height: '8px',
                background: 'linear-gradient(to top, #fbbf24, #f59e0b)',
                animation: 'candleFlame 2s ease-in-out infinite',
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>

        {/* Runic Circle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          borderRadius: '50%',
          zIndex: 1,
          animation: 'float 8s ease-in-out infinite'
        }}>
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '0',
            width: '100%',
            textAlign: 'center',
            fontSize: '14px',
            color: '#8b5cf6',
            animation: 'ghostlyFlicker 3s ease-in-out infinite',
            letterSpacing: '25px'
          }}>
            ⚹ ☾ ⚹ ☽
          </div>

          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            border: '1px solid rgba(192, 132, 252, 0.2)',
            borderRadius: '50%',
            animation: 'mysticalPulse 4s ease-in-out infinite'
          }} />
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: 'Spline Sans Mono, monospace',
          fontWeight: 600,
          fontSize: '4.5rem',
          background: 'linear-gradient(to bottom, #ddd6fe 0%, #8b5cf6 50%, #c084fc 100%)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          backgroundClip: 'text',
          marginBottom: '3rem',
          textAlign: 'center',
          zIndex: 2,
          letterSpacing: '0.1em',
          textShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
        }}>
          AstroProfile
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontFamily: 'Spline Sans Mono, monospace',
            fontSize: '1.3rem',
            fontWeight: 300,
            color: '#a78bfa',
            textAlign: 'center',
            marginBottom: '2rem',
            fontStyle: 'italic',
            zIndex: 2,
            opacity: 0.8,
            letterSpacing: '0.05em',
            lineHeight: 1.5
          }}
        >
          Unveil the secrets written in the stars
        </motion.p>

        {/* Input Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
            background: 'rgba(26, 11, 46, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(139, 92, 246, 0.3)',
            borderRadius: '20px',
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.3)',
            zIndex: 2,
            minWidth: '420px',
            padding: '3rem',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '20px',
            color: '#8b5cf6',
            animation: 'mysticalPulse 2s ease-in-out infinite'
          }}>
            ✦
          </div>

          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              width: '100%'
            }}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Whisper your name to the cosmos..."
                required
                style={{
                  padding: '1.2rem 1.8rem',
                  fontSize: '1.1rem',
                  fontFamily: 'Spline Sans Mono, monospace',
                  fontWeight: 400,
                  border: '2px solid rgba(139, 92, 246, 0.4)',
                  borderRadius: '12px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: '#ddd6fe',
                  outline: 'none',
                  transition: 'all 0.4s ease',
                  backdropFilter: 'blur(10px)'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#8b5cf6';
                  e.target.style.background = 'rgba(26, 11, 46, 0.8)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                  e.target.style.background = 'rgba(0, 0, 0, 0.6)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              />

              {/* Custom Date Picker */}
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  value={birthDate ? formatDate(birthDate) : ''}
                  onClick={() => setShowCalendar(!showCalendar)}
                  placeholder="Choose your birth date..."
                  readOnly
                  style={{
                    padding: '1.2rem 1.8rem',
                    fontSize: '1.1rem',
                    fontFamily: 'Spline Sans Mono, monospace',
                    fontWeight: 400,
                    border: '2px solid rgba(139, 92, 246, 0.4)',
                    borderRadius: '12px',
                    background: 'rgba(0, 0, 0, 0.6)',
                    color: '#ddd6fe',
                    outline: 'none',
                    transition: 'all 0.4s ease',
                    backdropFilter: 'blur(10px)',
                    width: '100%',
                    boxSizing: 'border-box',
                    cursor: 'pointer',
                  }}
                />

                {/* Calendar Overlay */}
                <AnimatePresence>
                  {showCalendar && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: 'rgba(0, 0, 0, 0.5)',
                          backdropFilter: 'blur(5px)',
                          zIndex: 999,
                        }}
                        onClick={() => setShowCalendar(false)}
                      />

                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{
                          position: 'fixed',
                          top: '-30%',
                          left: '70%',
                          transform: 'translate(-50%, -50%)',
                          background: 'rgba(26, 11, 46, 0.95)',
                          backdropFilter: 'blur(20px)',
                          border: '2px solid rgba(139, 92, 246, 0.5)',
                          borderRadius: '12px',
                          boxShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
                          zIndex: 1000,
                          padding: '1.5rem',
                          maxWidth: '400px',
                          width: '90%',
                        }}
                      >
                        {/* Calendar Header */}
                        <div style={{
                          background: 'linear-gradient(135deg, #6b21a8, #8b5cf6)',
                          padding: '1rem',
                          borderRadius: '8px',
                          marginBottom: '1rem',
                          textAlign: 'center',
                          color: '#ddd6fe',
                          fontWeight: 'bold',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em'
                        }}>
                          {monthNames[today.getMonth()]} {today.getFullYear()}
                        </div>

                        {/* Day Headers */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(7, 1fr)',
                          gap: '0.25rem',
                          marginBottom: '0.5rem'
                        }}>
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} style={{
                              padding: '0.5rem',
                              textAlign: 'center',
                              color: '#a78bfa',
                              fontSize: '0.9rem',
                              fontWeight: 'bold'
                            }}>
                              {day}
                            </div>
                          ))}
                        </div>

                        {/* Calendar Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(7, 1fr)',
                          gap: '0.25rem'
                        }}>
                          {calendar.flat().map((date, index) => {
                            const isCurrentMonth = date.getMonth() === today.getMonth();
                            const isToday = date.toDateString() === today.toDateString();
                            const isSelected = birthDate && date.toISOString().split('T')[0] === birthDate;

                            return (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => selectDate(date)}
                                style={{
                                  padding: '0.75rem',
                                  border: 'none',
                                  borderRadius: '50%',
                                  background: isSelected
                                    ? '#8b5cf6'
                                    : isToday
                                      ? 'rgba(139, 92, 246, 0.3)'
                                      : 'transparent',
                                  color: isSelected
                                    ? '#ffffff'
                                    : isCurrentMonth
                                      ? '#ddd6fe'
                                      : 'rgba(221, 214, 254, 0.3)',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  fontSize: '0.9rem',
                                  fontFamily: 'Courier New, monospace',
                                  animation: isSelected ? 'runicGlow 2s ease-in-out infinite' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                  if (!isSelected) {
                                    e.target.style.background = 'rgba(139, 92, 246, 0.3)';
                                    e.target.style.animation = 'ghostlyFlicker 1s ease-in-out';
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (!isSelected) {
                                    e.target.style.background = 'transparent';
                                    e.target.style.animation = 'none';
                                  }
                                }}
                              >
                                {date.getDate()}
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Close Button */}
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                          <button
                            onClick={() => setShowCalendar(false)}
                            style={{
                              padding: '0.5rem 1rem',
                              background: 'linear-gradient(135deg, #6b21a8, #8b5cf6)',
                              border: 'none',
                              borderRadius: '8px',
                              color: '#ffffff',
                              cursor: 'pointer',
                              fontSize: '0.9rem',
                              fontFamily: 'Courier New, monospace'
                            }}
                          >
                            Close
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    color: '#ef4444',
                    fontSize: '1rem',
                    fontFamily: 'Courier New, monospace',
                    fontWeight: 400,
                    textAlign: 'center',
                    margin: '1rem 0 0 0',
                    background: 'rgba(239, 68, 68, 0.1)',
                    padding: '1rem 1.5rem',
                    borderRadius: '12px',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    letterSpacing: '0.05em'
                  }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={!name || !birthDate}
              style={{
                marginTop: '1.5rem',
                padding: '1.2rem 3rem',
                fontSize: '1.2rem',
                fontFamily: 'Spline Sans Mono, monospace',
                fontWeight: 500,
                background: 'linear-gradient(135deg, #6b21a8 0%, #8b5cf6 50%, #a855f7 100%)',
                border: '2px solid rgba(139, 92, 246, 0.5)',
                borderRadius: '12px',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8rem',
                transition: 'all 0.4s ease',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                width: '100%',
                opacity: (!name || !birthDate) ? 0.5 : 1
              }}
              onMouseEnter={(e) => {
                if (name && birthDate) {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.6)';
                  e.target.style.background = 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)';
                  e.target.style.animation = 'mysticalPulse 0.5s ease-in-out';
                }
              }}
              onMouseLeave={(e) => {
                if (name && birthDate) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.4)';
                  e.target.style.background = 'linear-gradient(135deg, #6b21a8 0%, #8b5cf6 50%, #a855f7 100%)';
                  e.target.style.animation = 'none';
                }
              }}
            >
              <span style={{ animation: 'ghostlyFlicker 2s ease-in-out infinite' }}>☾</span>
              Invoke the Oracle
              <span style={{ animation: 'ghostlyFlicker 2s ease-in-out infinite reverse' }}>☽</span>
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'radial-gradient(ellipse at center, #1a0b2e 0%, #0a0a0a 100%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            {/* Crystal Ball */}
            <div style={{
              width: '220px',
              height: '220px',
              position: 'relative',
              marginBottom: '3rem'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at 30% 30%, rgba(192, 132, 252, 0.4), rgba(139, 92, 246, 0.2), rgba(26, 11, 46, 0.8))',
                borderRadius: '50%',
                position: 'relative',
                animation: 'mysticalPulse 3s ease-in-out infinite',
                boxShadow: '0 0 50px rgba(139, 92, 246, 0.5), inset 0 0 30px rgba(0, 0, 0, 0.3)'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '20%',
                  left: '25%',
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '50%',
                  filter: 'blur(10px)',
                  animation: 'ghostlyFlicker 2s ease-in-out infinite'
                }} />

                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: '#c084fc',
                  fontSize: '14px',
                  animation: 'float 4s ease-in-out infinite',
                  letterSpacing: '8px'
                }}>
                  ☆ ✦ ☆ ✧ ☆
                </div>
              </div>

              {['☽', '⚹', '☾', '✦', '☆', '✧'].map((rune, index) => (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    color: '#8b5cf6',
                    fontSize: '18px',
                    animation: 'ghostlyFlicker 2s ease-in-out infinite',
                    animationDelay: `${index * 0.2}s`,
                    ...(index === 0 && { top: '5%', left: '45%' }),
                    ...(index === 1 && { top: '25%', right: '10%' }),
                    ...(index === 2 && { bottom: '25%', right: '10%' }),
                    ...(index === 3 && { bottom: '5%', left: '45%' }),
                    ...(index === 4 && { top: '25%', left: '10%' }),
                    ...(index === 5 && { bottom: '25%', left: '10%' })
                  }}
                >
                  {rune}
                </div>
              ))}
            </div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                fontFamily: 'Courier New, monospace',
                fontWeight: 500,
                fontSize: '2rem',
                color: '#ddd6fe',
                textAlign: 'center',
                animation: 'mysticalPulse 2s ease-in-out infinite',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              Consulting the Ancient Wisdom
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '1.1rem',
                fontWeight: 300,
                color: '#a78bfa',
                textAlign: 'center',
                fontStyle: 'italic',
                marginTop: '1rem',
                opacity: 0.8,
                letterSpacing: '0.05em'
              }}
            >
              The celestial spirits are aligning your destiny...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Start;