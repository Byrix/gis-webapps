export const openModal = (id: string) => {
  /* @ts-expect-error showModal does exist on that particular element only */
  document.getElementById(id).showModal();
}

