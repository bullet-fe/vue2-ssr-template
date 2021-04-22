
/**
 * server entry
 */
import { createApp } from './app'
export default context => {
  const { app } = createApp()
  return app
}