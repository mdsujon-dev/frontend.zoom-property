"use client";

import { useEffect } from "react";

/** Once this has run, the tab is marked and a reload stays silent. */
const SESSION_KEY = "zoom-property:call-chime";

/** How long after arriving the chime may still be heard. */
const WINDOW_MS = 10_000;

/** When each ring fires inside that window. */
const RINGS_AT = [0, 4000, 8000];

/** The two notes of one ring, in Hz — a soft major third, not a telephone. */
const NOTES = [880, 1174.66];

/**
 * The call button's chime.
 *
 * Rings up to three times over the first ten seconds of a visit, then never
 * again for that tab. `sessionStorage` is what draws the line the way it was
 * asked for: it survives a reload, so refreshing the page stays silent, and it
 * dies with the tab, so opening the site fresh tomorrow rings again.
 *
 * **Browsers do not let a page make noise on its own.** Autoplay policy blocks
 * audio until the visitor has interacted with the document, so the first
 * attempt usually fails. Rather than give up, it arms one listener for the next
 * click, key or scroll and rings then — but only if that happens inside the ten
 * seconds. A chime that arrives a minute later, attached to nothing, is worse
 * than silence.
 *
 * Synthesised rather than loaded: two short sine notes through WebAudio, so
 * there is no audio file to ship, nothing to buffer, and the volume is set here
 * rather than baked into an asset. It is deliberately quiet — a chime at the
 * volume of a notification, not an advert.
 *
 * Nothing renders. It is mounted beside the dock so the sound and the ringing
 * handset belong to the same control.
 */
export function CallChime() {
  useEffect(() => {
    let used = false;
    try {
      used = sessionStorage.getItem(SESSION_KEY) !== null;
    } catch {
      // Private mode with storage disabled: stay silent rather than ring on
      // every single page view.
      return;
    }

    if (used) return;

    const started = Date.now();
    let context: AudioContext | null = null;
    let rang = false;
    let closeTimer: ReturnType<typeof setTimeout> | null = null;

    const mark = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, String(Date.now()));
      } catch {
        // Nothing to do — the worst case is one more ring next reload.
      }
    };

    const ring = (audio: AudioContext, at: number) => {
      NOTES.forEach((frequency, index) => {
        const start = at + index * 0.16;
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;

        // Quick attack, short tail: a ping, not a note held down.
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.06, start + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);

        oscillator.connect(gain).connect(audio.destination);
        oscillator.start(start);
        oscillator.stop(start + 0.4);
      });
    };

    const attempt = async () => {
      if (rang || Date.now() - started >= WINDOW_MS) return;

      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return;

      try {
        context ??= new Ctor();

        if (context.state === "suspended") {
          // `resume()` on a blocked context can stay pending forever rather
          // than rejecting, which would hang everything waiting behind it —
          // so the attempt gives up after a moment instead of awaiting it.
          await Promise.race([
            context.resume(),
            new Promise((resolve) => setTimeout(resolve, 250)),
          ]);
        }

        if (context.state !== "running") return;

        rang = true;
        const audio = context;

        RINGS_AT.forEach((offset) => {
          // Anything that would land outside the window is not scheduled.
          if (Date.now() - started + offset >= WINDOW_MS) return;
          ring(audio, audio.currentTime + offset / 1000);
        });

        mark();
        stopListening();
      } catch {
        // Blocked or unsupported: silence is an acceptable outcome here.
      }
    };

    const events = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    const onGesture = () => void attempt();

    function stopListening() {
      events.forEach((event) => window.removeEventListener(event, onGesture));
    }

    // Listeners first, attempt second: the immediate try is usually blocked,
    // and arming afterwards would depend on that attempt resolving — which,
    // on a suspended context, it may never do.
    events.forEach((event) =>
      window.addEventListener(event, onGesture, { passive: true }),
    );

    void attempt();

    // The window closes whether or not anything was heard: this tab has had its
    // turn, and a chime after ten seconds belongs to nothing on screen.
    closeTimer = setTimeout(() => {
      mark();
      stopListening();
    }, WINDOW_MS);

    return () => {
      stopListening();
      if (closeTimer) clearTimeout(closeTimer);
      void context?.close();
    };
  }, []);

  return null;
}
