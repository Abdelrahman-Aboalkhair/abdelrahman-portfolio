"use client";

import { Suspense, useEffect, useState, Component } from "react";
import Spline from "@splinetool/react-spline";

// Error Boundary to catch Spline loading errors
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Spline Error Boundary caught an error:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  render() {
    if (this.state.hasError) {
      return null; // Let parent component handle the error display
    }

    return this.props.children;
  }
}

const SplineScene = ({ sceneUrl, className = "", fallback = null }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Validate scene URL
  const isValidSplineUrl =
    sceneUrl &&
    sceneUrl.includes("spline.design") &&
    sceneUrl.endsWith(".splinecode") &&
    !sceneUrl.includes(
      "https://my.spline.design/interactiveworkspace-6nLCy8Pi5nxZqcXTILlJ5iMs/"
    ) &&
    sceneUrl !==
      "<iframe src='https://my.spline.design/interactiveworkspace-6nLCy8Pi5nxZqcXTILlJ5iMs/' frameborder='0' width='100%' height='100%'></iframe>";

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = (error) => {
    console.warn("Spline scene failed to load:", error);
    setHasError(true);
    setIsLoading(false);
  };

  // Early return if no valid scene URL is provided
  if (!isValidSplineUrl) {
    return (
      fallback || (
        <div className={`flex items-center justify-center ${className}`}>
          <div className="text-center">
            <div className="w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
            <p className="text-sm text-muted-foreground mt-4">
              3D Scene Preview
            </p>
          </div>
        </div>
      )
    );
  }

  if (hasError) {
    return (
      fallback || (
        <div className={`flex items-center justify-center ${className}`}>
          <div className="text-center">
            <div className="w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>
          </div>
        </div>
      )
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-primary text-sm">Loading 3D Scene...</p>
          </div>
        </div>
      )}

      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <ErrorBoundary onError={handleError}>
          <Spline
            scene={sceneUrl}
            onLoad={handleLoad}
            onError={handleError}
            className="w-full h-full"
          />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

export default SplineScene;
