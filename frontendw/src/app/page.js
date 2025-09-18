"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");

  const handleShorten = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/url/shorten`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl: url }),
      });
      const result = await res.json();
      console.log("Backend response:", result);  // 🔍 debug

      if (result?.data?.shortUrl) {
        setShortUrl(result.data.shortUrl);   // ✅ use shortUrl
      }
      if (result?.data?.qrcode) {
        setQrCode(result.data.qrcode);       // ✅ store QR code
      }
    } catch (err) {
      console.error("Error shortening URL:", err);
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-6'>
      <div className="absolute top-4 left-6">
        <h1 className="text-3xl font-bold">CLIPLY</h1>
      </div>
      <h1 className='text-3xl font-bold mb-4'>🔗 URL Shortener</h1>
      <div className='flex gap-2 w-full max-w-md'>
        <Input
          type="text"
          placeholder='Enter your long URL here'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        /> 
        <Button onClick={handleShorten}>Shorten</Button>
      </div>

      {(shortUrl || qrCode) && (
        <Card className='mt-6 w-full max-w-md'>
          <CardContent className="flex flex-col items-center gap-4">
            {shortUrl && (
              <>
                <p className="text-sm text-gray-600 mb-1">Your shortened URL:</p>
                <a
                  href={shortUrl}
                  target="_blank"
                  className='text-blue-500 underline'
                  rel='noopener noreferrer'
                >
                  {shortUrl}
                </a>
              </>
            )}
            {qrCode && (
              <>
                <p className="text-sm text-gray-600">Scan QR Code:</p>
                <img src={qrCode} alt="QR Code" className="w-40 h-40" />
              </>
            )}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
