<script lang="ts">
  import { cn } from "$lib/components/utils";

  let className: string = "";

  export { className as class };
  export let size = "24px";
</script>

<span class={cn("pointer-events-none inline-block", className)}>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="shape-rendering: auto;"
    width={size}
    height={size}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    stroke="currentColor"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-width="10"
      stroke-dasharray="205.271142578125 51.317785644531256"
      d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
      stroke-linecap="round"
      style="transform:scale(0.8);transform-origin:50px 50px"
    >
      <animate
        attributeName="stroke-dashoffset"
        repeatCount="indefinite"
        dur="2s"
        keyTimes="0;1"
        values="0;256.58892822265625"
      >
      </animate>
    </path>
  </svg>
</span>
