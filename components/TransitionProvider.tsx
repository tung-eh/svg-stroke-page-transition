import { TransitionRouter } from 'next-transition-router'

const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  return <TransitionRouter>{children}</TransitionRouter>
}

export default TransitionProvider
