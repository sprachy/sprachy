export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(env.sprachy.fetch("/heartbeat"))
  },
}