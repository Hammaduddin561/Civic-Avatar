import React, { useEffect, useRef, useState } from 'react';
import StreamingAvatar, { AvatarQuality, StreamingEvents } from '@heygen/streaming-avatar';

export default function LiveAvatar({ onClientReady }) {
  const videoRef = useRef(null);
  const avatarClient = useRef(null);
  const [isAvatarConnected, setIsAvatarConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Initializing Sandbox...');
  const [debugLogs, setDebugLogs] = useState([]);

  const addLog = (msg) => {
    console.log(msg);
    setDebugLogs(prev => [...prev, typeof msg === 'string' ? msg : JSON.stringify(msg)].slice(-8));
  };

  useEffect(() => {
    let mounted = true;

    async function setupAvatar() {
      try {
        addLog('Fetching secure token...');
        const tokenResp = await fetch('http://localhost:8000/api/heygen/token', { method: 'POST' });
        const tokenData = await tokenResp.json();
        
        if (!tokenData.data || !tokenData.data.token) {
           addLog("No token in response: " + JSON.stringify(tokenData));
           setConnectionStatus('Token extraction failed. Check API Key.');
           return;
        }
        const token = tokenData.data.token;

        addLog('Connecting to Streaming Engine...');
        avatarClient.current = new StreamingAvatar({ token });
        if (onClientReady) onClientReady(avatarClient.current);

        avatarClient.current.on(StreamingEvents.STREAM_READY, (event) => {
          addLog("STREAM_READY fired: " + (event.detail ? "Has Detail" : "No Detail"));
          if (videoRef.current && event.detail) {
            try {
              videoRef.current.srcObject = event.detail;
              videoRef.current.play().then(() => {
                 addLog("Video playing successfully");
                 setIsAvatarConnected(true);
                 videoRef.current.muted = false;
              }).catch(e => {
                 addLog("Auto-play prevented by browser: " + e.message);
                 setIsAvatarConnected(true); // Still connected, just waiting for interaction
                 setConnectionStatus('Click here to enable audio');
              });
            } catch (err) {
              addLog("Error attaching stream to video: " + err.message);
            }
          }
        });

        avatarClient.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
          addLog("STREAM_DISCONNECTED fired");
          if (mounted) {
             setIsAvatarConnected(false);
             setConnectionStatus('Connection lost. Retrying...');
          }
        });
        
        avatarClient.current.on(StreamingEvents.AVATAR_START_TALKING, () => addLog("AVATAR_START_TALKING"));
        avatarClient.current.on(StreamingEvents.AVATAR_STOP_TALKING, () => addLog("AVATAR_STOP_TALKING"));
        avatarClient.current.on(StreamingEvents.USER_TALKING_MESSAGE, (evt) => addLog("USER_TALKING_MESSAGE: " + JSON.stringify(evt)));

        setConnectionStatus('Waking up synthetic Avatar...');
        
        const avatarData = await avatarClient.current.createStartAvatar({
          quality: AvatarQuality.Low,
          avatarName: "37bfcaa3d63b4ac28da829dc1fb57fb5", // Global fallback ID for free tier WebRTC
          language: 'en'
        });

        addLog("Avatar created successfully: " + (avatarData?.session_id || 'OK'));

      } catch (e) {
        addLog("Error setting up avatar: " + e.message);
        if (mounted) {
           setConnectionStatus(`Connection Error: ${e.message || 'Unknown'}`);
        }
      }
    }

    setupAvatar();

    return () => {
      mounted = false;
      if (avatarClient.current) {
        avatarClient.current.stopAvatar().catch(console.error);
      }
    };
  }, [onClientReady]);

  return (
    <>
      {/* We must include playsInline and muted for autoPlay to bypass browser policy blocks initially */}
      <video 
        ref={videoRef}
        autoPlay 
        playsInline
        muted
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${isAvatarConnected ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {!isAvatarConnected && (
         <div className="absolute inset-0 z-10 flex flex-col p-4 bg-slate-900 opacity-95 backdrop-blur-md">
           <div className="flex-1 flex flex-col items-center justify-center gap-4">
             <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
             <span className="text-white text-sm font-medium animate-pulse">{connectionStatus}</span>
           </div>
           <div className="h-48 overflow-y-auto bg-black/50 p-3 rounded text-xs text-green-400 font-mono text-left">
             <div className="text-slate-500 mb-2">// DEBUG LOGS OVERLAY</div>
             {debugLogs.map((log, i) => <div key={i}>{'>'} {log}</div>)}
           </div>
         </div>
      )}
    </>
  );
}
