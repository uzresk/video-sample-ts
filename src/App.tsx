import React, {HTMLAttributes, useEffect, useMemo, useRef, VideoHTMLAttributes} from 'react';
import './App.css';
import Hls from "hls.js"

const App = () => {

  const url = "";

  const isSupportedBrowser = useMemo(() => Hls.isSupported(), [])
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    if (isSupportedBrowser && ref.current != null) {
      const hls = new Hls()
      hls.loadSource(url)
      hls.attachMedia(ref.current)
      return () => {
        hls.removeAllListeners()
        hls.stopLoad()
      }
    }
  }, [])
  return (
    <div className="App">
      <div className="content">
        {isSupportedBrowser ? (
          <video ref={ref} width="850" controls/>
        ) : (
          <div>
            not support browser
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
