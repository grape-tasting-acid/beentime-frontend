import React, { useEffect, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style';
import img from '../../Img/image.png';
import { useNavigate } from 'react-router-dom';

function Sharing(props) {
    const [buttonLabel, setButtonLabel] = useState('링크 복사');
    const navigate = useNavigate();

    useEffect(() => {
        const updateButtonLabel = () => {
            setButtonLabel(window.innerWidth < 501 ? '링크 공유' : '링크 복사');
        };
        window.addEventListener('resize', updateButtonLabel);
        return () => window.removeEventListener('resize', updateButtonLabel);
    }, []);

    const handleCopyLink = () => {
        const input = document.querySelector('input[type="text"]');
        input.select();
        document.execCommand('copy');
        alert("링크복사완료");
    };

    const handleShareLink = async () => {
        try {
            await navigator.share({
                title: '이벤트 페이지 공유하기',
                text: '이벤트 페이지를 확인해보세요!',
                url: `${window.location.origin}/attend?eventId=${encodeURIComponent(sessionStorage.getItem('eventId'))}`,
            });
            console.log('링크 공유 완료');
        } catch (error) {
            alert('링크 공유에 실패했습니다.');
        }
    };

    const handleOnClick = () => {
        window.location.href = `${window.location.origin}/attend?eventId=${encodeURIComponent(sessionStorage.getItem('eventId'))}`;
    };

    const handleClick = buttonLabel === '링크 복사' ? handleCopyLink : handleShareLink;

    return (
        <div css={S.Layout}>
            <div css={S.ImgBox}>
                <img src={img} alt="" />
            </div>
            <h1 css={S.H1}>이벤트 페이지가 완성됐어요!</h1>
            <div css={S.UrlBox}>
                <input 
                    type="text" 
                    value={`${window.location.origin}/attend?eventId=${encodeURIComponent(sessionStorage.getItem('eventId'))}`} 
                    onChange={() => {}}
                    readOnly
                />
                <button onClick={handleClick}>{buttonLabel}</button>
            </div>
            <button css={S.Btn} onClick={handleOnClick}>이벤트 페이지 가기</button>
        </div>
    );
}

export default Sharing;