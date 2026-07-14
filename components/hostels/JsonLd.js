export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      // Structured data has to be raw JSON in the DOM for crawlers to read it.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
