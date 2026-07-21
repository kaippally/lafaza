import React, { useState } from 'react';
import { API } from './api.js';

// Voices load asynchronously — getVoices() is empty on first call in Chrome, which is the
// usual reason browser speech silently does nothing.
function voices() {
  return new Promise((resolve) => {
    const have = speechSynthesis.getVoices();
    if (have.length) return resolve(have);
    const t = setTimeout(() => resolve(speechSynthesis.getVoices()), 1500);
    speechSynthesis.onvoiceschanged = () => { clearTimeout(t); resolve(speechSynthesis.getVoices()); };
  });
}

async function browserSpeak(text) {
  if (!window.speechSynthesis) throw new Error('no speech support');
  const ar = (await voices()).find((v) => v.lang?.toLowerCase().startsWith('ar'));
  if (!ar) throw new Error('no Arabic voice installed');
  const u = new SpeechSynthesisUtterance(text);
  u.voice = ar;
  u.lang = ar.lang;
  u.rate = 0.85;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

// Server first (Google Cloud TTS with a key, else Google Translate's keyless endpoint).
// Browser speech is only a last resort and needs an Arabic voice installed to be any use.
export async function speak(text) {
  try {
    const res = await fetch(API + '/api/tts?text=' + encodeURIComponent(text));
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || res.status);
    await new Audio(URL.createObjectURL(await res.blob())).play();
    return 'ok';
  } catch (serverErr) {
    try {
      await browserSpeak(text);
      return 'ok';
    } catch (browserErr) {
      console.warn(`TTS failed for "${text}". server: ${serverErr.message} · browser: ${browserErr.message}`);
      return 'err';
    }
  }
}

export default function Speak({ text }) {
  const [state, setState] = useState('idle');

  async function onClick(e) {
    e.stopPropagation();
    if (state === 'busy') return;
    setState('busy');
    const r = await speak(text);
    setState(r === 'ok' ? 'idle' : 'err');
    if (r !== 'ok') setTimeout(() => setState('idle'), 2500);
  }

  return (
    <button
      className={'speak ' + state}
      onClick={onClick}
      title={state === 'err' ? 'no audio available — see console' : 'hear it'}
      aria-label={'pronounce ' + text}
    >
      {state === 'busy' ? '◌' : state === 'err' ? '✕' : '🔊'}
    </button>
  );
}
