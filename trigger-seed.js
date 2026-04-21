async function main() {
  console.log("Starting seed request...");
  try {
    const res = await fetch("http://localhost:3000/api/seed");
    const text = await res.text();
    console.log("Response status:", res.status);
    console.log("Response body:", text);
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}
main();
