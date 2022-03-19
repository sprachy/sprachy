<script lang="ts">
  // @ts-ignore
  import * as timeago from "timeago-simple?client";
  export let ts: number;

  $: date = new Date(ts);
</script>

<time datetime={date.toISOString()}>{timeago.format(date)}</time>
