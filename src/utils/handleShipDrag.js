export default function handleShipDrag(event) {
  const length = event.target.dataset.length;
  const name = event.target.dataset.name;

  event.dataTransfer.setData("length", length);
  event.dataTransfer.setData("name", name);
}
