'use client';

import { useCallback, useEffect, useState } from 'react';

interface WhatAPPProps {
    phone?: string;
    message?: string;
    bubbleText?: string;
}

const DEFAULT_PHONE = '15871484968';
const DEFAULT_MESSAGE = "Hi! I'm interested in customized energy storage solutions.";
const DEFAULT_BUBBLE_TEXT = '即刻咨询';

const MOBILE_USER_AGENT = /Android|iPhone|iPad|iPod|Windows Phone/i;

const WhatAPP = ({
    phone = DEFAULT_PHONE,
    message = DEFAULT_MESSAGE,
    bubbleText = DEFAULT_BUBBLE_TEXT,
}: WhatAPPProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isBubbleVisible, setIsBubbleVisible] = useState(false);

    useEffect(() => {
        const mobile = typeof navigator !== 'undefined' && MOBILE_USER_AGENT.test(navigator.userAgent);
        setIsMobile(mobile);
        setIsBubbleVisible(!mobile);
    }, []);

    const buildWhatsAppURL = useCallback(() => {
        const sanitizedPhone = phone.replace(/\s+/g, '');

        if (typeof window === 'undefined') {
            return '';
        }

        const baseMsg = message || DEFAULT_MESSAGE;
        const msg = `${baseMsg} (from: ${window.location.href})`;
        const encoded = encodeURIComponent(msg);

        const mobile = typeof navigator !== 'undefined' && MOBILE_USER_AGENT.test(navigator.userAgent);
        const host = mobile ? 'api.whatsapp.com' : 'web.whatsapp.com';

        return `https://${host}/send?phone=${sanitizedPhone}&text=${encoded}`;
    }, [message, phone]);

    const handleClick = () => {
        const url = buildWhatsAppURL();

        if (!url || typeof window === 'undefined') {
            return;
        }

        if (window.matchMedia('(max-width: 640px)').matches) {
            setIsBubbleVisible((prev) => !prev);
            window.setTimeout(() => {
                window.open(url, '_blank');
            }, 200);
        } else {
            window.open(url, '_blank');
        }
    };

    return (
        <>
            <div
                className={`wa-wrap${isBubbleVisible ? ' show' : ''}`}
                onMouseEnter={() => {
                    if (!isMobile) {
                        setIsBubbleVisible(true);
                    }
                }}
                onMouseLeave={() => {
                    if (!isMobile) {
                        setIsBubbleVisible(false);
                    }
                }}
            >
                <div className="wa-bubble">{bubbleText}</div>
                <button className="wa-btn" type="button" aria-label="Chat on WhatsApp" onClick={handleClick}>
                    <svg viewBox="0 0 32 32" aria-hidden="true">
                        <path d="M19.1 17.3c-.3-.1-1.8-.9-2-1s-.5-.1-.7.1c-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.1-.4-2.1-1.3c-.8-.7-1.3-1.6-1.5-1.8-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-.9-2.3c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.7 1.2 2.9c.1.2 2 3.1 4.8 4.3.7.3 1.2.6 1.6.7.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4 0-.1-.3-.2-.6-.3zM16 3C9.4 3 4 8.4 4 15c0 2.1.6 4.1 1.7 5.8L4 29l8.4-1.6c1.7.9 3.6 1.4 5.6 1.4 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.6c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-5 .9.9-4.9-.3-.5C5.3 16.9 4.8 15.4 4.8 14 4.8 8.9 9 4.8 14 4.8S23.2 8.9 23.2 14 21.1 24.6 16 24.6z" />
                    </svg>
                </button>
            </div>
            <style jsx>{`
                .wa-wrap {
                    position: fixed;
                    right: 22px;
                    bottom: 22px;
                    z-index: 9999;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Arial;
                }
                .wa-bubble {
                    background: #fff;
                    color: #111;
                    border-radius: 10px;
                    padding: 12px 14px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
                    max-width: 260px;
                    line-height: 1.35;
                    font-size: 14px;
                    border: 1px solid rgba(0, 0, 0, 0.06);
                }
                .wa-btn {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: #25d366;
                    box-shadow: 0 10px 30px rgba(37, 211, 102, 0.45);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    border: none;
                    outline: none;
                    transition: transform 0.15s ease, box-shadow 0.15s ease;
                }
                .wa-btn:active {
                    transform: scale(0.96);
                }
                .wa-btn svg {
                    width: 28px;
                    height: 28px;
                    fill: #fff;
                }
                .wa-wrap.show .wa-bubble {
                    display: block;
                }
                @media (max-width: 640px) {
                    .wa-bubble {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
};

export default WhatAPP;
