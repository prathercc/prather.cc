import React from 'react';
import Container from 'react-bootstrap/Container';
import { StandardCard, getThemeColor } from '../../Utility/Utility';

const VideoTab = ({ style, app }) => {
    const { youtube_link } = app;

    return (
        <Container style={{ maxWidth: '50%' }}>
            {
                youtube_link && <StandardCard className='video-container' style={{ ...style, outline: `1px solid ${getThemeColor(0.1)}` }}>
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${youtube_link}`}
                        frameBorder='0'
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen />
                </StandardCard>
            }
            {
                !youtube_link && <div style={{ ...style }}>No video found</div>
            }
        </Container>
    );
};

export default VideoTab;