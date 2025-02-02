import React from 'react';
import styles from './BottomSheet.module.css';
import { useNavigate } from 'react-router-dom';

const BottomSheet = ({ isOpen, onClose, eventCode }) => {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const handleShare = async () => {
    const eventUrl = `${window.location.origin}/attend?eventCode=${eventCode}`;
    const shareData = {
      title: '모임 일정 조율하기',
      text: '모임 일정을 조율해보세요!',
      url: eventUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        onClose();
      } else {
        // 공유 API를 지원하지 않는 브라우저의 경우 기존 복사 기능 사용
        await navigator.clipboard.writeText(eventUrl);
        alert('링크가 복사되었습니다.');
        onClose();
      }
    } catch (err) {
      console.error('공유 실패:', err);
    }
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.bottomSheet}>
        <h2>모임 페이지가 완성되었습니다!<br />채팅방에 모임 링크를 공유해보세요!</h2>
        <button className={styles.shareButton} onClick={handleShare}>
          모임 링크 공유하기
        </button>
        <button 
          className={styles.laterButton} 
          onClick={() => {
            navigate(`/attend?eventCode=${eventCode}`);
            onClose();
          }}
        >
          나중에 공유하기
        </button>
      </div>
    </>
  );
};

export default BottomSheet; 