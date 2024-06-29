<script lang="ts">
  import { TypeTmdb } from "$lib/types/graphql";

  export let value: TypeTmdb = TypeTmdb.Tv;
</script>

<div class="flex gap-6">
  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="pr-2 label-text">TV</span>
      <input type="radio" name="radio-10" class="radio checked:bg-red-500" value={TypeTmdb.Tv} bind:group={value} />
    </label>
  </div>
  <div class="form-control">
    <label class="cursor-pointer label">
      <span class="pr-2 label-text">Movie</span>
      <input type="radio" name="radio-10" class="radio checked:bg-blue-500" value={TypeTmdb.Movie} bind:group={value} />
    </label>
  </div>
</div>
