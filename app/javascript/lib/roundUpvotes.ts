function roundUpvotes(number: number): string {
  const magnitude = Math.floor(Math.log10(Math.abs(number)));
  const scale = 10 ** magnitude;

  const result = Math.ceil(number / scale) * scale;

  return (result < 10) ? '10 upvotes' : `${result} upvotes`;
}

export default roundUpvotes;
