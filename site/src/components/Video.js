import * as React from "react";

const Video = () => (
    <div style={{ position: "relative", paddingBottom: "56.25%" /* 16:9 */, height: "0" }}>
        <iframe
            title="youtube"
            src="https://www.youtube.com/embed/_MXtbjwsz3A"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
            }}
        />
    </div>
);
Video.displayName = "Video";
export default Video;
