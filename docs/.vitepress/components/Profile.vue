<template>
  <div :class="$style.grid">
    <a
      :class="[$style.box, $style['filled--avatar']]"
      style="grid-area: a; --link-text: 'GitHub';"
      href="https://github.com/miksin"
      target="_blank"
      rel="noopener noreferrer"
    />
    <div :class="[$style.box, $style['filled--cyan-3']]" style="grid-area: b" />
    <div :class="[$style.box, $style['filled--cyan-2']]" style="grid-area: c" />
    <div :class="[$style.box, $style['stroke--text-1']]" style="grid-area: d">
      <h1>Miksin</h1>
      <h3>Software Engineer</h3>
    </div>
    <div :class="[$style.box, $style.horizontal, $style['filled--cyan-2']]" style="grid-area: e">
      <img :class="$style.icon" src="https://simpleicons.org/icons/react.svg" alt="react icon">
      <img :class="$style.icon" src="https://simpleicons.org/icons/vuedotjs.svg" alt="vuejs icon">
      <img :class="$style.icon" src="https://simpleicons.org/icons/svelte.svg" alt="svelte icon">
    </div>
    <div :class="[$style.box, $style.horizontal, $style['filled--cyan-2']]" style="grid-area: f">
      <img :class="$style.icon" src="https://simpleicons.org/icons/typescript.svg" alt="typescript icon">
      <img :class="$style.icon" src="https://simpleicons.org/icons/css.svg" alt="css icon">
      <img :class="$style.icon" src="https://simpleicons.org/icons/scala.svg" alt="scala icon">
      <img :class="$style.icon" src="https://simpleicons.org/icons/mysql.svg" alt="mysql icon">
      <img :class="$style.icon" src="https://simpleicons.org/icons/python.svg" alt="python icon">
    </div>
    <div :class="[$style.box, $style['filled--cyan-3']]" style="grid-area: g" />
  </div>
</template>

<style lang="css" module>
.grid {
  --box-size: 3.5rem;
  --box-padding: calc(var(--box-size) * 0.65);
  --grid-gap: 1rem;

  display: grid;
  grid-template-areas:
    "a a a a c c c c c c g g g g"
    "a a a a c c c c c c g g g g"
    "a a a a d d d d d d g g g g"
    "a a a a d d d d d d g g g g"
    "b b b b d d d d d d g g g g"
    "b b b b d d d d d d g g g g"
    "b b b b e e e e f f f f f f"
    "b b b b e e e e f f f f f f";
  grid-auto-rows: var(--box-size);
  grid-auto-columns: var(--box-size);
  gap: var(--grid-gap);
}

@media (max-width: 1024px) {
  .grid {
    --box-size: 3rem;
    grid-template-areas:
      "c c c c c c g g g g"
      "c c c c c c g g g g"
      "d d d d d d g g g g"
      "d d d d d d g g g g"
      "d d d d d d g g g g"
      "d d d d d d g g g g"
      "a a a a a b b b b b"
      "a a a a a b b b b b"
      "a a a a a b b b b b"
      "e e e e f f f f f f"
      "e e e e f f f f f f";
  }
}

@media (max-width: 720px) {
  .grid {
    --box-size: 2.5rem;
    grid-template-areas:
      "c c c c c c"
      "c c c c c c"
      "d d d d d d"
      "d d d d d d"
      "d d d d d d"
      "d d d d d d"
      "a a a a b b"
      "a a a a b b"
      "a a a a b b"
      "e e e f f f"
      "e e e f f f"
      "g g g g g g"
      "g g g g g g"
      "g g g g g g";
  }

  .icon:not(:nth-child(-n + 2)) {
    display: none;
  }
}

@keyframes jumpIn {
  0% {
    opacity: 0.3;
    transform: translateY(calc(-50% - 2rem));
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.box {
  overflow: hidden;
  position: relative;
  border-radius: var(--box-padding);
  padding: var(--box-padding);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--box-bg);
  background-size: cover;
  background-position: center;
  gap: var(--grid-gap);
  font-family: var(--vp-font-family-mono);

  animation: jumpIn 351ms ease-out;
}

.box.horizontal {
  flex-direction: row;
}

a.box:hover::after {
  content: var(--link-text);
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  font-size: 2rem;
}

.box h1,
.box h3 {
  line-height: 1;
}

.box h1 {
  font-size: var(--box-size);
}

.box h3 {
  font-size: calc(var(--box-size) * 0.5);
}

.filled--cyan-1 {
  --box-bg: var(--vp-c-cyan-1);
  color: #fff;
}

.filled--cyan-2 {
  --box-bg: var(--vp-c-cyan-2);
  color: #fff;
}

.filled--cyan-3 {
  --box-bg: var(--vp-c-cyan-3);
  color: #fff;
}

.filled--avatar {
  --box-bg: url("/avatar.webp");
  color: #fff;
}

.stroke--text-1 {
  --box-bg: none;
  border: 2px solid var(--vp-c-text-1);
}

.icon {
  filter: invert(1);
}
</style>
