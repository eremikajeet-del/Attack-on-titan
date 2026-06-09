import { ease, defaultDuration } from '../utils/animationConfig'

export const pageTransition = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: defaultDuration + 0.05, ease },
  },
  exit: {
    opacity: 0,
    y: -28,
    transition: { duration: 0.56, ease },
  },
}
