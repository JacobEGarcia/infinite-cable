# INFINITE CABLE

TV from every dimension. An infinite, procedurally generated cable box: flip through
9,999 channels of shows that never existed - prestige dramas about wet ledgers, soap
operas where someone is 40% pudding, courtroom verdicts for screaming roosters, nature
docs about creatures with 11 knees, anime tournaments, historical documentaries on the
Great Lint Famine, and game shows where every answer is legally wrong.

Every channel is generated deterministically from its channel number (seeded RNG), so
channel 666 is the same show every time. All visuals are canvas-drawn, all audio is
synthesized live with WebAudio. No assets, no libraries, no build step.

## v2 - the quality pass

- 18 genres (was 13): added prestige drama, court show, fitness bootcamp, historical
  documentary, and anime, plus deeper versions of everything else
- Scripted segments: shows progress through acts - news cuts to field reporters, game
  shows ask real (absurd) questions with answers, soaps end on cliffhangers, talk shows
  do monologues then guest interviews, cooking shows reach a taste test
- Hundreds of hand-written jokes, headlines, monologues, court cases, narration lines,
  trailer cards, and testimonials mixed with the procedural banks
- Richer scenes: upgraded character rendering, cityscapes, rain, film grain, letterbox,
  vignette, camera zooms, replay mode, power-up auras
- New audio beds: noir pads, pump-up workout beat, anime battle arps
- Episode codes (S4 E17) and dimension tags on every channel, shown in the OSD and guide

## Play

Open `index.html` or visit the live deployment. Click anywhere to enable sound.

- **CH + / CH -** or arrow up/down: flip channels
- **0-9**: direct channel entry (1-9999)
- **GUIDE** (G): program guide
- **SURF** (S): auto-flip mode
- **RAND**: random channel, **BACK**: previous channel
- **VOL +/-**, **MUTE** (M), **PWR** (P)

Genres: infomercial, news, cooking, weather, nature documentary, soap opera, music video,
sports, test pattern, movie trailer, cartoon, talk show, game show, prestige drama,
court show, fitness, historical documentary, anime - all original, all generated in
your browser.
