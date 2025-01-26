import React from 'react';
import styles from './BottomSheet.module.css';
import { useNavigate } from 'react-router-dom';

const BottomSheet = ({ isOpen, onClose, eventCode }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const handleCopyLink = () => {
    const eventUrl = `${window.location.origin}/attend?eventCode=${eventCode}`;
    navigator.clipboard.writeText(eventUrl)
      .then(() => {
        alert('링크가 복사되었습니다.');
        onClose();
        navigate(`/attend?eventCode=${eventCode}`);
      })
      .catch(err => {
        console.error('링크 복사 실패:', err);
        alert('링크 복사에 실패했습니다.');
      });
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.bottomSheet}>
        <div className={styles.handle} />
        <h2>모임이 생성되었어요!</h2>
        <p>친구들에게 공유하고 일정을 조율해보세요</p>
        <button className={styles.copyButton} onClick={handleCopyLink}>
          링크 복사하기
        </button>
        <button 
          className={styles.moveButton} 
          onClick={() => navigate(`/attend?eventCode=${eventCode}`)}
        >
          모임 페이지로 이동하기
        </button>
      </div>
    </>
  );
};

export default BottomSheet; 