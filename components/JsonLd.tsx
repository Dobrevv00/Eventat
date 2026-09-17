/**
 * Структурирани данни за Google (schema.org). „<“ се екранира, за да не може
 * текст от CMS да затвори <script> тага.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
