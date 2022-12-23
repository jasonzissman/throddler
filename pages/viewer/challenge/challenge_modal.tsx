import { Answer, Challenge } from '../../../lib/challenge'
import styles from './challenge_modal.module.css'
import { useState } from "react"
// TODO commonize common css styles

export function ChallengeModal(data: {
  visible: boolean,
  onChallengePassed: Function,
  activeChallenge: Challenge
}) {

  let answerClickedHandler = (answer: Answer) => {
    if (answer.correct) {
      challengePassedHandler()
    } else {
      // TODO
    }
  };

  let challengePassedHandler = () => {
    data.onChallengePassed();
  }
  
  return (
    <div
      className={[styles.challengeModal, data.visible ? styles.visibleFadeIn : styles.invisibleFadeOut].join(" ")}
    >

      <div className={styles.questionHolder}>
        <img src={`images/challenges/${data.activeChallenge.graphic}`}></img>
      </div>

      <div className={styles.answersHolder}>
        {data.activeChallenge.answers.map(a => {
          return <button
            key={`${data.activeChallenge.id}_${a.value}`}
            onClick={e => { answerClickedHandler(a) }}
          >
            {a.value}
          </button>
        })}
      </div>
    </div>
  )
}
