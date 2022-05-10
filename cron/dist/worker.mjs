export default {
  async scheduled(event, env, ctx) {
    ctx.waitUntil(env.sprachy.fetch("https://sprachy.com/heartbeat"))
  }
}