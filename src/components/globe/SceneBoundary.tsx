import { Component, type ReactNode } from "react";

/** Keep the catalogue usable if WebGL or a texture fails. */
export class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <div role="alert" className="absolute inset-0 flex items-center justify-center bg-bg text-fg md:left-80 max-md:bottom-64"><div className="max-w-sm p-6"><p>地球儀無法載入。你仍可使用地標列表。</p><button className="mt-4 underline" onClick={() => window.location.reload()}>重新載入</button></div></div>;
    return this.props.children;
  }
}
