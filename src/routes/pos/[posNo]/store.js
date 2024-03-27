import { writable } from "svelte/store";

export const category_store = writable([])
export const item_store = writable([])
export const display_item_store = writable([])
export const display_item_opt_store = writable([])
export const display_item_opt_menu_store = writable([])
export const selected_item_store = writable({})
export const selected_item_opt_menu_store = writable([])
export const item_opt_store = writable([])
export const item_opt_open_store = writable(false)
export const item_opt_menu_store = writable([])
export const order_list_store = writable([])