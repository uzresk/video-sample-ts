import React, {SyntheticEvent, useEffect, useMemo, useRef, useState} from 'react';
import './App.css';
import Hls from "hls.js"

const App = () => {

  const url = "";

  const isSupportedBrowser = useMemo(() => Hls.isSupported(), [])
  const ref = useRef<HTMLVideoElement>(null)

  const [timeToWatch, setTimeToWatch] = useState(0)

  const play = () => {
    console.log("play start")
  }

  // 5秒毎に記録する
  const timeupdate = (event: SyntheticEvent<HTMLVideoElement>) => {
    const currentTime: number = Math.floor(event.currentTarget.currentTime);
    const i = currentTime % 5
    if (i === 0 && currentTime !== timeToWatch) {
      console.log(currentTime)
      // ここでログ記録
      setTimeToWatch(currentTime)
    }
  }

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
          <>
          <video ref={ref} width="850" controls onPlay={play} onTimeUpdate={timeupdate}/>
          <div>{timeToWatch}</div>
          </>
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
