<script lang="js">
  import { goto } from "$app/navigation";
  import axios from "axios";
  import { onMount } from "svelte";
  onMount(async () => {
    const [category, item, item_opt, item_opt_menu] =
      await Promise.all([
        axios.get(`http://140.238.21.87:8370/api/rest/category/NC1933`),
        axios.get(`http://140.238.21.87:8370/api/rest/item/NC1933`),
        axios.get(`http://140.238.21.87:8370/api/rest/sub-menu/NC1933`),
        axios.get(`http://140.238.21.87:8370/api/rest/sub-menu/detail/NC1933`),
      ]);
    await Promise.all([
      axios.post(`/api/atpos/save/category`, { category }),
      axios.post(`/api/atpos/save/item`, { item }),
      axios.post(`/api/atpos/save/item-opt`, { item_opt }),
      axios.post(`/api/atpos/save/item-opt-menu`, { item_opt_menu }),
    ]);
    goto("/pos/01");
  });
</script>

<div>마스터 수신중...</div>
