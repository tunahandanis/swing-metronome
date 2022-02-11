import React from "react";

const Guide = () => {
  return (
    <main className="guide">
      <article className="guide__article">
        <h1 className="guide__title">What is Swing Percentage?</h1>

        <p className="guide__para">
          Swing percentage is an expression of the rhythmic relationship between
          two 8th notes in a beat. <br /> <br /> A common example would be 66%,
          the so-called 'triplet swing'. The first 8th note takes up two-thirds
          (66%) of the quarter beat's time, so it's basically a quarter note
          followed by an 8th note. A 75% swing percentage would be a dotted
          quarter note followed by an 8th note. <br /> <br /> We could say that
          the first 8th note takes up as much as the swing percentage's time
          from the quarter beat, and the second 8th note takes the rest. Going
          by this logic, we could create a 'reverse swing' by going below 50%,
          and 50% would be just straight 8th notes, no swing at all so to speak.{" "}
          <br /> <br />
          <a href="https://www.youtube.com/watch?v=ybgSGQpQTB0&ab_channel=GeorgeCollier">
            This video
          </a>{" "}
          by George Collier might be helpful to visualize what swing percentage
          is.
          <br />
          <br /> Some commonly used swing percentages are: <br /> <br />
        </p>
        <ul>
          <li>57% - Septuplet Swing</li>
          <li>60% - Quintuplet Swing</li>
          <li>66% - Triplet Swing</li>
        </ul>
      </article>

      <article className="guide__article">
        <h1 className="guide__title">
          What are these 'First Note' and 'Sub Note'?
        </h1>
        <p className="guide__para">
          You might've noticed that you could set the metronome to play duplet,
          triplet and quadruplet notes instead of just quarter notes. In these
          cases, I called the first note of the beat 'First Note' and the
          remaining ones are 'Sub Notes'. So, if you set the metronome to play
          triplets, the first 8th note will be 'First Note' and the remaining 2
          will be 'Sub Notes'. <br /> <br />I made a distinction to allow user
          to easily customize the sounds of 'First Note' and 'Sub Notes'.
        </p>
      </article>

      <article className="guide__article">
        <h1 className="guide__title">What's this "Stress"?</h1>
        <p className="guide__para">
          The user can use the "Stress" section and its features to play
          specific time signatures. If you want to play in 3/4 time, you could
          turn on the "Stress" and set the bar length to 3, and the metronome
          will play a distinct sound in every 3 beats, which is also
          customizable by adjusting its frequency. <br /> <br /> This can also
          be used with other notations. For example, a triplet would count as 1
          beat and "Stress" sound will play in every 3 triplets.
        </p>
      </article>

      <article className="guide__article">
        <h1 className="guide__title">How does sound customization work?</h1>
        <p className="guide__para">
          In the bottom part of the 'Swing Metronome', the user could easily
          customize the sounds for 'First Note' and 'Sub Note'. <br /> <br />{" "}
          There are 2 options, drum sounds and artificial sound. Drum sounds are
          real recordings. You could pick whichever you want to play together or
          seperately for both 'First Note' and 'Sub Notes'. Artificial sound is
          a 'beep' sound at a specific frequency set by the user.
        </p>
      </article>
    </main>
  );
};

export default Guide;
