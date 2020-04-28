import React from "react";
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body style={{ margin: "0.5rem" }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;