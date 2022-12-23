import { Answer, Challenge } from '../challenge'
import styles from './challenge_modal.module.css'
import { useState } from "react"
// TODO commonize common css styles

export default function ChallengeModal(data: {
  visible: boolean,
  onChallengePassed: Function,
  activeChallenge: Challenge
}) {

  let [incorrectResponses, setIncorrectResponses] = useState(['']);

  let answerClickedHandler = (answer: Answer) => {
    if (answer.correct) {
      challengePassedHandler()
      setIncorrectResponses([]);
    } else {
      let newIncorrectResponses = [...incorrectResponses, answer.value];
      setIncorrectResponses(newIncorrectResponses);
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
        {/* TODO use <IMAGE> tag  */}
        <img src={`images/challenges/${data.activeChallenge.graphic}`}></img>
      </div>

      <div className={styles.answersHolder}>
        {data.activeChallenge.answers.map(a => {
          return <button
            className={incorrectResponses.includes(a.value) ? styles.answeredIncorrectly: ''}
            key={`${data.activeChallenge.id}_${a.value}`}
            onClick={e => { if (!incorrectResponses.includes(a.value)) {answerClickedHandler(a)} }}
          >
            {a.value}
          </button>
        })}
      </div>
    </div>
  )
}
