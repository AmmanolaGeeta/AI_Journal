import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiKey = 'YOUR_API_KEY_HERE';  // Replace with your actual OpenAI API key,
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  analyzeContent(content: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model:   'gpt-4.1-nano',   //      'omni-moderation-latest' ,        //'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant for journal analysis.' },
        { role: 'user', content: `Analyze this journal entry: "${content}". Return ONLY JSON like:
        {"sentiment": "positive", "tags": ["tag1","tag2","tag3"]}` }
      ],
      temperature: 0.5
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}

