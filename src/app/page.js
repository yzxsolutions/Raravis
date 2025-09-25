"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SplashScreen() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Animate progress bar
    let start = 0;
    const interval = setInterval(() => {
      start += 2; // increase smoothly
      setProgress(start);
      if (start >= 100) {
        clearInterval(interval);
        router.push("/home"); // redirect after completion
      }
    }, 100); // 100ms * 50 = 5s
    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="splash-screen">
      <div className="splash-content flex flex-col items-center justify-around min-h-screen">
        <Image
          src="/images/splash-illustration.png"
          alt="Globe icon"
          width={400}
          height={400}
        />

        <div className="loading-container pb-8 flex items-center flex-col">
          <p className="loading-text text-black">Loading Your Menu</p>

          <div className="progress-bar-container w-64 h-3 bg-gray-300 rounded-full overflow-hidden mt-3">
            <div
              className="progress-bar bg-blue-500 h-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
