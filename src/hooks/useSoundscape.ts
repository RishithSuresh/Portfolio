"use client";

import { useEffect, useRef } from "react";

interface UseSoundscapeParams {
  activeId?: string;
  introDone: boolean;
}

export const useSoundscape = ({ activeId, introDone }: UseSoundscapeParams) => {
  const contextRef = useRef<AudioContext | null>(null);
  const baseGainRef = useRef<GainNode | null>(null);
  const accentGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (!introDone || contextRef.current) {
      return;
    }

    const context = new AudioContext();
    const baseOsc = context.createOscillator();
    const accentOsc = context.createOscillator();
    const baseGain = context.createGain();
    const accentGain = context.createGain();

    baseOsc.type = "sawtooth";
    accentOsc.type = "triangle";

    baseOsc.frequency.value = 44;
    accentOsc.frequency.value = 120;

    baseGain.gain.value = 0.012;
    accentGain.gain.value = 0.0;

    baseOsc.connect(baseGain);
    accentOsc.connect(accentGain);
    baseGain.connect(context.destination);
    accentGain.connect(context.destination);

    baseOsc.start();
    accentOsc.start();

    contextRef.current = context;
    baseGainRef.current = baseGain;
    accentGainRef.current = accentGain;

    return () => {
      baseOsc.stop();
      accentOsc.stop();
      context.close();
      contextRef.current = null;
      baseGainRef.current = null;
      accentGainRef.current = null;
    };
  }, [introDone]);

  useEffect(() => {
    if (!accentGainRef.current || !contextRef.current) {
      return;
    }

    const now = contextRef.current.currentTime;
    const intensity = activeId ? 0.02 : 0.006;

    accentGainRef.current.gain.cancelScheduledValues(now);
    accentGainRef.current.gain.linearRampToValueAtTime(intensity, now + 0.4);
  }, [activeId]);
};
