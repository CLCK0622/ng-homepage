---
title: "IEM Past Cars From Blender to Browser"
date: 2025-11-10
tags: ["Tech"]
description: "Building an Interactive Model Showcase with R3F"
---

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Spent almost 10 hours to work on a 3D demo for Illini Electric Motorsports&#39;s next gen website, utilizing R3F and GSAP. I would say it&#39;s a super cool effect.<a href="https://twitter.com/hashtag/3D?src=hash&amp;ref_src=twsrc%5Etfw">#3D</a> <a href="https://twitter.com/hashtag/GSAP?src=hash&amp;ref_src=twsrc%5Etfw">#GSAP</a> <a href="https://twitter.com/hashtag/Threejs?src=hash&amp;ref_src=twsrc%5Etfw">#Threejs</a> <a href="https://twitter.com/hashtag/IEM?src=hash&amp;ref_src=twsrc%5Etfw">#IEM</a> <a href="https://twitter.com/hashtag/BuildInPublic?src=hash&amp;ref_src=twsrc%5Etfw">#BuildInPublic</a> <a href="https://t.co/wGoy5WNp2h">pic.twitter.com/wGoy5WNp2h</a></p>&mdash; Kevin Zhong (@CLCKKKKK) <a href="https://twitter.com/CLCKKKKK/status/1987991650350534775?ref_src=twsrc%5Etfw">November 10, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

3D web experiences are becoming the gold standard for high-end product showcases. Recently, I built a cinematic, interactive car showcase for Illini Electric Motorsports, using **React Three Fiber (R3F)**, **GSAP**, and **Tailwind CSS**.

Here is a technical breakdown of how I solved the biggest challenges in Web3D, from model optimization to buttery-smooth performance.

## 🛠️ The Stack

* **React Three Fiber (R3F):** The renderer.
* **Drei:** Essential helpers (Environment, GLTFLoader).
* **React Postprocessing:** For that cool "Outline" glow.
* **GSAP:** For precision camera control.
* **Tailwind CSS:** For the UI overlay.

## 1\. Model Preparation

**The Key:** "Dimension Reduction" in Blender.

1.  **Merge Meshes:** I combined thousands of tiny screws and internal parts into a single `Background_Parts` mesh.
2.  **Draco Compression:** This is non-negotiable. I reduced the model size from **43MB to \~3MB** using Draco.
3.  **Texture Optimization:** Resized textures to 2K/1K max.

## 2\. Setting the Stage (Lighting & Effects)

In R3F, we aren't just coders; we are photographers.

```jsx
<Canvas shadows camera={{ position: [0, -100, 30], fov: 50 }}>
  {/* Studio Lighting */}
  <directionalLight intensity={8} castShadow />
  <Environment preset="studio" />

  {/* Post-Processing: The "Tron" Look */}
  <Selection>
    <EffectComposer autoClear={false}>
      <Outline visibleEdgeColor={0xffffff} edgeStrength={50} />
    </EffectComposer>
    <CarModel />
  </Selection>
</Canvas>
```

I used `<Environment>` for realistic carbon-fiber reflections and `<Outline>` to give selected parts a distinct, technical highlight.

## 3\. "Focus Mode" Material System

When a user selects a part (e.g., the Diffuser), I wanted an "X-Ray" focus effect: **Highlight the target, fade the rest.**

Instead of complex shaders, I used dynamic React props:

```javascript
const getMaterialProps = (partName) => {
  const isHighlighted = activePart === partName;
  const anyActive = activePart !== null;

  return {
    // If something is active, but it's not ME, go transparent
    transparent: anyActive && !isHighlighted,
    opacity: anyActive && !isHighlighted ? 0.15 : 1.0,
    depthWrite: !anyActive || isHighlighted, // Prevents Z-fighting
  };
};
```

## 4\. Cinematic Camera Movement (GSAP)

Default `OrbitControls` feel manual. I wanted the camera to *fly* to the specific part automatically.

**The Challenge:** React state updates vs. Three.js World Matrix updates.

```javascript
// Inside useEffect
setTimeout(() => {
    const worldCenter = new THREE.Vector3();
    partRef.current.getWorldPosition(worldCenter);

    // Animate Camera
    gsap.to(camera.position, {
        x: worldCenter.x + offset.x,
        y: worldCenter.y + offset.y,
        z: worldCenter.z + offset.z,
        duration: 1.5,
        ease: 'power3.inOut'
    });
}, 0);
```

## Conclusion

Building high-performance Web3D is a balancing act between visual fidelity and browser constraints. By optimizing assets in Blender, managing state smartly in React, and using CSS tricks to keep the GPU happy, we created an experience that feels like a native app.