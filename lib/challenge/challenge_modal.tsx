import { Choice, Challenge } from './challenge'
import styles from './challenge_modal.module.css'
import { useState } from "react"
// TODO commonize common css styles

export default function ChallengeModal(data: {
  visible: boolean,
  onChallengePassed: Function,
  activeChallenge: Challenge
}) {

  let [incorrectResponses, setIncorrectResponses] = useState(['']);

  let answerClickedHandler = (choice: Choice) => {
    if (choice.correct) {
      challengePassedHandler()
      setIncorrectResponses([]);
    } else {
      let newIncorrectResponses = [...incorrectResponses, choice.value];
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

      {data.activeChallenge?.prompt?.graphic &&
        <div className={styles.questionHolder}>
          {/* TODO use <IMAGE> tag  */}
          <img src={`images/challenges/${data.activeChallenge?.prompt?.graphic}`}></img>
        </div>
      }

      {data.activeChallenge.answers.choices &&
        <div className={styles.answersHolder}>
          {data.activeChallenge.answers.choices.map(a => {
            return <button
              className={incorrectResponses.includes(a.value) ? styles.answeredIncorrectly : ''}
              key={`${data.activeChallenge.id}_${a.value}`}
              onClick={e => { if (!incorrectResponses.includes(a.value)) { answerClickedHandler(a) } }}
            >
              {a.value}
            </button>
          })}
        </div>
      }
    </div>

  )
}
