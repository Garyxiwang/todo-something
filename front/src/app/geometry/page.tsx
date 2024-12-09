"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Geometry() {
  const containerRef = useRef(null); // 用于引用 DOM 容器

  useEffect(() => {
    if (containerRef.current) {
      const scene = new THREE.Scene();
      // 大小  长宽比 近平面 远平面
      const camera = new THREE.PerspectiveCamera(
        80,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      // 设置相机位置
      camera.position.z = 3;
      // 创建渲染器
      const renderer = new THREE.WebGLRenderer();
      // 窗口大小
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
      // readerer 添加到 DOM上
      containerRef.current.appendChild(renderer.domElement);

      // 创建立方体 width=X height=Y depth=Z
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      // 创建材质
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      // 创建网格
      const cube = new THREE.Mesh(geometry, material);
      // 添加到场景
      scene.add(cube);
      // 渲染
      function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      // 开始渲染
      animate();
    }
  }, []);

  return <div ref={containerRef} />;
}
