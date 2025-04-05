export default function ClearFilterBtn({ fn }: { fn: () => void }) {
  return (
    <div
      className={"cursor-pointer text-right text-sm text-red-600"}
      onClick={fn}
      aria-label="clear-btn"
    >
      Clear All
    </div>
  );
}
