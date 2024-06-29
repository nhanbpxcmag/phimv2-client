<script lang="ts">
  import FormAddEditPhim from "$lib/components/admin/phim/form/form-add-edit-phim.svelte";
  import { formPhimSchema } from "$lib/components/admin/phim/form/formAddEditPhim.schema";
  import { defaults } from "sveltekit-superforms";
  import { zod } from "sveltekit-superforms/adapters";
</script>

<FormAddEditPhim data={defaults(zod(formPhimSchema))} />
