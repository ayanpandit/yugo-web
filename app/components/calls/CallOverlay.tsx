"use client";

import React, { useEffect, useRef, useState } from "react";
import { Phone, PhoneOff, Video, VideoOff, Mic, MicOff, Shield } from "lucide-react";
import { cn } from "@/app/lib/utils";

interface CallOverlayProps {
  activeCall: any;
  incomingCall: any;
  acceptCall: () => void;
  rejectCall: () => void;
  endCall: () => void;
  socket: any;
}

export function CallOverlay({
  activeCall,
  incomingCall,
  acceptCall,
  rejectCall,
  endCall,
  socket
}: CallOverlayProps) {
  const [micMuted, setMicMuted] = useState(false);
  const [videoDisabled, setVideoDisabled] = useState(false);
  const [connectionTime, setConnectionTime] = useState(0);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRenderRef = useRef(true);

  // Synthesized calling audio contexts
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ringtoneIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const isVideo = activeCall?.type === "video" || incomingCall?.type === "video";
  const isCaller = activeCall?.role === "caller";
  const isConnected = activeCall?.status === "connected";

  const stopAllSounds = () => {
    if (ringtoneIntervalRef.current) {
      clearInterval(ringtoneIntervalRef.current);
      ringtoneIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      if (audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
      audioCtxRef.current = null;
    }
  };

  const startIncomingRingtone = () => {
    stopAllSounds();
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const playPulse = () => {
      if (ctx.state === "closed") return;
      
      const now = ctx.currentTime;
      // Synthesize clean electronic dual-frequency ringtone pulses
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = 853;
      osc2.frequency.value = 960;
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
      gain.gain.setValueAtTime(0.12, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.5);
      osc2.stop(now + 1.5);
    };

    playPulse();
    ringtoneIntervalRef.current = setInterval(playPulse, 2000);
  };

  const startOutgoingRingtone = () => {
    stopAllSounds();
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    const playDialtone = () => {
      if (ctx.state === "closed") return;

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      // Standard telephone dial ringback: 440Hz + 480Hz
      osc1.frequency.value = 440;
      osc2.frequency.value = 480;

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.1);
      gain.gain.setValueAtTime(0.06, now + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 2.1);
      osc2.stop(now + 2.1);
    };

    playDialtone();
    ringtoneIntervalRef.current = setInterval(playDialtone, 4000);
  };

  const playJoinBlip = () => {
    stopAllSounds();
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.15);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  };

  const playDisconnectBlip = () => {
    stopAllSounds();
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.25);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  };

  // calling audio synthesizer effect hooks
  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      if (!incomingCall && !activeCall) return;
    }

    if (incomingCall) {
      console.log("[CallingSounds] Playing incoming ringtone pulse...");
      startIncomingRingtone();
    } else if (activeCall) {
      if (activeCall.status === "ringing") {
        console.log("[CallingSounds] Playing outgoing dialtone pulses...");
        startOutgoingRingtone();
      } else if (activeCall.status === "connected") {
        console.log("[CallingSounds] Connection established, triggering blip...");
        playJoinBlip();
      }
    } else {
      console.log("[CallingSounds] Call terminated, playing blip...");
      playDisconnectBlip();
    }

    return () => {
      stopAllSounds();
    };
  }, [incomingCall, activeCall?.status]);

  // connection call timer
  useEffect(() => {
    if (isConnected) {
      setConnectionTime(0);
      timerIntervalRef.current = setInterval(() => {
        setConnectionTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isConnected]);

  // Helper to cap media bitrates in WebRTC SDP sessions
  const setMediaBitrate = (sdp: string, mediaType: "audio" | "video", maxBitrate: number): string => {
    const lines = sdp.split("\r\n");
    let mediaLineIndex = -1;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].indexOf(`m=${mediaType}`) === 0) {
        mediaLineIndex = i;
        break;
      }
    }

    if (mediaLineIndex === -1) {
      return sdp;
    }

    // Find the next line starting with 'a=' or a new media line
    let insertIndex = mediaLineIndex + 1;
    while (insertIndex < lines.length && lines[insertIndex].indexOf("m=") !== 0) {
      if (lines[insertIndex].indexOf("b=AS:") === 0) {
        lines[insertIndex] = `b=AS:${maxBitrate}`;
        return lines.join("\r\n");
      }
      insertIndex++;
    }

    // Insert the b=AS line
    lines.splice(mediaLineIndex + 1, 0, `b=AS:${maxBitrate}`);
    return lines.join("\r\n");
  };

  // Clean WebRTC setup & teardown
  useEffect(() => {
    if (!activeCall || activeCall.status !== "connected") return;

    const setupWebRTC = async () => {
      try {
        console.log("[WebRTC] Setting up peer connection...");
        
        // Grab audio/video media streams with advanced echo suppression and constraints
        const constraints = {
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          },
          video: isVideo ? { 
            facingMode: "user",
            width: { ideal: 640 },
            height: { ideal: 480 },
            frameRate: { ideal: 24 }
          } : false
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        localStreamRef.current = stream;
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        // Establish Peer Connection with free Google STUN servers and optimized configurations
        const pc = new RTCPeerConnection({
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:stun1.l.google.com:19302" }
          ]
        });
        peerConnectionRef.current = pc;

        // Add local tracks to peer connection
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        // Set remote tracks to receiver element
        pc.ontrack = (event) => {
          console.log("[WebRTC] Received remote stream track");
          if (remoteVideoRef.current && event.streams[0]) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        // Relaying local ICE Candidates to signaling socket
        pc.onicecandidate = (event) => {
          if (event.candidate && socket) {
            console.log("[WebRTC] Relaying local ICE candidate to peer");
            socket.emit("call:signal", {
              targetUserId: activeCall.peerId,
              signal: { type: "candidate", candidate: event.candidate }
            });
          }
        };

        // If caller, send SDP Offer
        if (isCaller) {
          let offer = await pc.createOffer();
          let sdp = setMediaBitrate(offer.sdp || "", "audio", 40); // 40 kbps Opus audio
          if (isVideo) {
            sdp = setMediaBitrate(sdp, "video", 500); // 500 kbps VP8/H264 video
          }
          offer = new RTCSessionDescription({ type: "offer", sdp });
          await pc.setLocalDescription(offer);
          console.log("[WebRTC] Dispatching SDP Offer invitation");
          socket.emit("call:signal", {
            targetUserId: activeCall.peerId,
            signal: { type: "offer", offer }
          });
        }

        // Hook signal relay listener
        socket.on("call:signal", async ({ senderUserId, signal }: { senderUserId: string; signal: any }) => {
          if (senderUserId !== activeCall.peerId) return;

          try {
            if (signal.type === "offer") {
              console.log("[WebRTC] Storing SDP Offer and replying with SDP Answer");
              await pc.setRemoteDescription(new RTCSessionDescription(signal.offer));
              let answer = await pc.createAnswer();
              let sdp = setMediaBitrate(answer.sdp || "", "audio", 40);
              if (isVideo) {
                sdp = setMediaBitrate(sdp, "video", 500);
              }
              answer = new RTCSessionDescription({ type: "answer", sdp });
              await pc.setLocalDescription(answer);
              socket.emit("call:signal", {
                targetUserId: activeCall.peerId,
                signal: { type: "answer", answer }
              });
            } else if (signal.type === "answer") {
              console.log("[WebRTC] Storing SDP Answer invitation");
              await pc.setRemoteDescription(new RTCSessionDescription(signal.answer));
            } else if (signal.type === "candidate") {
              console.log("[WebRTC] Appending remote ICE candidate");
              await pc.addIceCandidate(new RTCIceCandidate(signal.candidate));
            }
          } catch (err) {
            console.error("[WebRTC] Error handling peer signal:", err);
          }
        });

      } catch (err) {
        console.error("[WebRTC] Call media access rejected:", err);
        alert("Failed to access camera/mic for this call");
        endCall();
      }
    };

    setupWebRTC();

    return () => {
      console.log("[WebRTC] Tearing down peer connection...");
      if (socket) {
        socket.off("call:signal");
      }
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, [isConnected]);

  // Call Muting controls
  const toggleMic = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setMicMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current && isVideo) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoDisabled(!videoTrack.enabled);
      }
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!incomingCall && !activeCall) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#071414]/95 backdrop-blur-xl animate-[fadeIn_0.2s_ease-out] font-sans text-white">
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/35 via-transparent to-black/50 pointer-events-none" />

      {incomingCall ? (
        // 📞 INCOMING CALL VIEWPORT
        <div className="w-full max-w-sm flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] shadow-2xl relative">
          <div className="h-10 top-6 absolute flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 text-[10px] text-emerald-400 font-extrabold uppercase tracking-widest">
            <Shield size={12} />
            <span>Secure Call</span>
          </div>

          <div className="mt-14 relative flex items-center justify-center">
            {/* Visual Call Ringing Aura */}
            <span className="absolute w-24 h-24 rounded-full bg-green-500/20 animate-ping" />
            <span className="absolute w-28 h-28 rounded-full bg-green-500/10 animate-[ping_2.5s_infinite]" />
            
            {incomingCall.caller?.image ? (
              <img 
                src={incomingCall.caller.image} 
                className="w-20 h-20 rounded-full object-cover shadow-2xl border border-white/20 relative z-10" 
                alt="caller image" 
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-emerald-700/60 flex items-center justify-center text-3xl font-bold shadow-2xl border border-white/20 relative z-10">
                {incomingCall.caller?.username?.[0]?.toUpperCase()}
              </div>
            )}
          </div>

          <h2 className="mt-6 text-xl font-bold text-white tracking-wide">
            {incomingCall.caller?.name || `@${incomingCall.caller?.username}`}
          </h2>
          <p className="text-xs text-gray-400 font-semibold mt-1 animate-pulse uppercase tracking-wider">
            Incoming {incomingCall.type} call...
          </p>

          <div className="mt-10 flex items-center justify-center gap-6 w-full">
            <button 
              onClick={rejectCall}
              className="w-14 h-14 flex items-center justify-center bg-red-500 hover:bg-red-600 active:scale-95 rounded-full transition-all cursor-pointer shadow-xl shadow-red-500/20"
              title="Decline"
            >
              <PhoneOff size={24} />
            </button>
            
            <button 
              onClick={acceptCall}
              className="w-14 h-14 flex items-center justify-center bg-green-500 hover:bg-green-600 active:scale-95 rounded-full transition-all cursor-pointer shadow-xl shadow-green-500/20"
              title="Accept"
            >
              {incomingCall.type === "video" ? <Video size={24} /> : <Phone size={24} />}
            </button>
          </div>
        </div>
      ) : (
        // 🎙️ ACTIVE / OUTGOING CALL VIEWPORT
        <div className="w-full h-full flex flex-col items-center justify-between p-6 sm:p-8 relative">
          
          {/* Header Info */}
          <div className="flex flex-col items-center text-center mt-8 z-10">
            <p className="text-xs font-bold text-emerald-400 tracking-widest uppercase">
              {activeCall.type} call
            </p>
            <h2 className="text-2xl font-bold mt-2">
              Calling User
            </h2>
            <p className="text-sm text-gray-300 font-medium mt-1 font-mono">
              {isConnected ? formatTimer(connectionTime) : "Ringing..."}
            </p>
          </div>

          {/* Video Frames Container */}
          {isVideo && isConnected ? (
            <div className="absolute inset-0 w-full h-full bg-[#030909]">
              {/* Remote Frame */}
              <video 
                ref={remoteVideoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover" 
              />
              
              {/* Local Float Frame */}
              <div className="absolute bottom-28 right-6 w-32 h-44 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-black">
                <video 
                  ref={localVideoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className={cn("w-full h-full object-cover", videoDisabled && "opacity-0")}
                />
                {videoDisabled && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#070b0b]">
                    <VideoOff size={20} className="text-gray-500" />
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Audio Calling profile rendering
            <div className="relative flex flex-col items-center">
              <span className={cn("absolute w-24 h-24 rounded-full bg-emerald-500/10", !isConnected && "animate-pulse")} />
              <div className="w-24 h-24 rounded-full bg-emerald-900/50 flex items-center justify-center text-4xl font-bold shadow-2xl border border-white/10 relative z-10">
                📞
              </div>
              {isVideo && !isConnected && (
                <p className="text-xs text-gray-400 font-medium mt-4">Connecting camera feeds...</p>
              )}
            </div>
          )}

          {/* Dynamic Call Controllers */}
          <div className="flex items-center justify-center gap-4 bg-white/5 border border-white/10 backdrop-blur-xl px-8 py-4 rounded-3xl shadow-2xl mb-8 z-10 shrink-0">
            <button 
              onClick={toggleMic}
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-full transition-all cursor-pointer border border-white/10 active:scale-95",
                micMuted ? "bg-red-500/20 text-red-400" : "bg-white/10 hover:bg-white/20"
              )}
              title={micMuted ? "Unmute Mic" : "Mute Mic"}
            >
              {micMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            {isVideo && (
              <button 
                onClick={toggleVideo}
                className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-full transition-all cursor-pointer border border-white/10 active:scale-95",
                  videoDisabled ? "bg-red-500/20 text-red-400" : "bg-white/10 hover:bg-white/20"
                )}
                title={videoDisabled ? "Enable Camera" : "Disable Camera"}
              >
                {videoDisabled ? <VideoOff size={20} /> : <Video size={20} />}
              </button>
            )}

            <button 
              onClick={endCall}
              className="w-14 h-14 flex items-center justify-center bg-red-500 hover:bg-red-600 rounded-full transition-all cursor-pointer shadow-xl shadow-red-500/20 active:scale-95"
              title="End Call"
            >
              <PhoneOff size={22} />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
