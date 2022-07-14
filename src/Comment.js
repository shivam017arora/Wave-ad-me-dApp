import React from "react";

export default function Comment({ address, timestamp, message }) {
  return (
    <div className="comment-container">
      <div className="comment-headline">
        <span className="address-field">@{address}</span>
        <span>
          {timestamp.getDate()}/{timestamp.getMonth()}/{timestamp.getFullYear()}
        </span>
      </div>
      <div className="message-field">{message}</div>
    </div>
  );
}
