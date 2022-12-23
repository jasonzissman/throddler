import { Challenge } from '../../../lib/challenge'
import styles from './challenge_modal.module.css'
import { useState } from "react"
// TODO commonize common css styles

export function ChallengeModal(data: {
  visible: boolean,
  onChallengePassed: Function,
  challenges: Challenge[]
}) {

  let [activeChallenge, setActiveChallenge] = useState<Challenge>(data.challenges[0]);
  let [completedChallenges, setCompletedChallenges] = useState<string[]>([]);

  let onChallengePassed = () => {
    completedChallenges.push(activeChallenge.id);
    let nextChallenge = data.challenges.find((c) => {
      return !completedChallenges.includes(c.id);
    });

    if (!nextChallenge) {
      completedChallenges = [];
      nextChallenge = data.challenges[0];
    } 

    setActiveChallenge(nextChallenge);
    setCompletedChallenges(completedChallenges);
    data.onChallengePassed();
  }

  return (
    <div
      className={[styles.challengeModal, data.visible ? styles.visibleFadeIn : styles.invisibleFadeOut].join(" ")}
      onClick={e => { onChallengePassed() }}
    >
      CHALLENGE!!!
      {activeChallenge.name} - {activeChallenge.id}
    </div>
  )
}
