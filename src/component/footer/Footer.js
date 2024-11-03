// Footer.js
import React from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './FooterStyle';
import footerImage from '../../Img/footer/footerImage.svg'; // 푸터 이미지 경로

function Footer() {
    return (
        <footer css={S.Footer}>
            <img src={footerImage} alt="Footer" css={S.FooterImage} />
        </footer>
    );
}

export default Footer;