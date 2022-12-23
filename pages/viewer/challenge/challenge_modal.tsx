import { Answer, Challenge } from '../../../lib/challenge'
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

  let answerClickedHandler = (answer: Answer) => {
    if (answer.correct) {
      challengePassedHandler()
    } else {
      // TODO
    }
  };

  let challengePassedHandler = () => {
    data.onChallengePassed();

    setTimeout(() => {
      // UI fades out slowly so we need the 3 seconds 
      // before switching to the next challenge.
      completedChallenges.push(activeChallenge.id);
      let nextChallenge = data.challenges.find((c) => {
        return !completedChallenges.includes(c.id);
      });
  
      if (!nextChallenge) {
        completedChallenges = [];
      }
  
      setCompletedChallenges(completedChallenges);
      setActiveChallenge(nextChallenge || data.challenges[0]);
    }, 3000)
  }

  return (
    <div
      className={[styles.challengeModal, data.visible ? styles.visibleFadeIn : styles.invisibleFadeOut].join(" ")}
    >

      <div className={styles.questionHolder}>
        <img src={`images/challenges/${activeChallenge.graphic}`}></img>
      </div>

      <div className={styles.answersHolder}>
        {activeChallenge.answers.map(a => {
          return <button
            key={`${activeChallenge.id}_${a.value}`}
            onClick={e => { answerClickedHandler(a) }}
          >
            {a.value}
          </button>
        })}
      </div>
    </div>
  )
}
