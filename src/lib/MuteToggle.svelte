<script lang="ts">
  import { faVolumeHigh, faVolumeMute } from "@fortawesome/free-solid-svg-icons"
  import sprachy from "./sprachy"
  import Fa from "svelte-fa"

  const { user, backgroundApi } = sprachy.expectSPA()

  function toggleMute() {
    $user!.enableSpeechSynthesis = !$user?.enableSpeechSynthesis

    backgroundApi!.patchSettings({
      enableSpeechSynthesis: $user?.enableSpeechSynthesis,
    })
  }
</script>

<button class="btn toggle-mute" on:click={toggleMute}>
  <div>
    <Fa
      pull="left"
      icon={$user.enableSpeechSynthesis ? faVolumeHigh : faVolumeMute}
      {...$$restProps}
    />
  </div>
</button>

<style>
</style>
