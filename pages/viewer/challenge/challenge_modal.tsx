import styles from './challenge_modal.module.css'

// TODO commonize common css styles

export function ChallengeModal(data: { 
  visible: boolean,
  onChallengePassed: Function
 }) {
  return (
    <div className={[styles.challengeModal, data.visible ? styles.visibleFadeIn : styles.invisibleFadeOut].join(" ")}
      onClick={e => {data.onChallengePassed}}
    >
      CHALLENGE!!!
    </div>
  )
}
