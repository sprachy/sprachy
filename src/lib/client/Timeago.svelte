<script lang="ts">
  import { simple as format } from "timeago-simple";
  export let ts: number;

  $: date = new Date(ts);
</script>

<time datetime={date.toISOString()}>{format(date)}</time>
