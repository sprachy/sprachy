<script lang="ts">
  import { format } from "timeago.js";

  export let ts: number;

  $: date = new Date(ts);
</script>

<time datetime={date.toISOString()}>{format(date)}</time>
