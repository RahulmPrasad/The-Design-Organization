import { llmsFull } from "@/lib/llms";

// Required for the static export (next.config.ts `output: "export"`).
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFull(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
